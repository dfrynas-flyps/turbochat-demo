import { isDataReady } from '../redux/templateListener'
import { VariableAIOptionsResponse } from '../redux/thunks'
import { Prompt, PromptTypes, TemplateData } from '../types/editor'

import { extractFileIdFromUrl, getFileUrlFromIndexedDB, saveFileToIndexedDB } from './demo-adapter/indexedDB/fileDB'
import { deleteTemplate, fetchAllTemplates, fetchTemplateById, saveTemplate } from './demo-adapter/indexedDB/templateDB'
import { variableAutocompleteMock } from './demo-adapter/mock/variableAutocomplete'
import {
  CreateTemplateOptions,
  FetchTemplateParams,
  GetVariableLatestValuesParams,
  IApiAdapter,
  ImageUploadAdapter,
  SetVariableLatestValuesParams,
  VariableAIOptionsParams,
  VariableAutocompleteAdapter,
  VariableLatestValuesResponse,
} from './types'

/**
 * Abstract API adapter that implements feature flag methods
 * Custom adapters can extend this class to avoid implementing feature detection methods
 */
export abstract class ApiAdapter implements IApiAdapter {
  hasImageUpload = (): this is ImageUploadAdapter => {
    return typeof this.uploadFile === 'function' && typeof this.getImageUrl === 'function'
  }

  hasVariableAutocomplete = (): this is VariableAutocompleteAdapter => {
    return (
      typeof this.fetchVariableAIOptions === 'function' &&
      typeof this.getVariableLatestValues === 'function' &&
      typeof this.setVariableLatestValues === 'function'
    )
  }

  // The following methods must be implemented by concrete adapter classes
  abstract createTemplate(file: File, options: CreateTemplateOptions): Promise<TemplateData>
  abstract pollTemplate(id: string, interval?: number): Promise<TemplateData>
  abstract fetchData(params: { id: string }): Promise<TemplateData>
  abstract saveData(params: { id: string; data: TemplateData }): Promise<TemplateData>
  abstract fetchAllTemplates(): Promise<TemplateData[]>
  abstract deleteTemplate(id: string): Promise<void>
  abstract getPrompts(): Promise<{ prompts: Record<PromptTypes, Prompt[]> }>
  abstract setPrompts(params: { prompts: Record<PromptTypes, Prompt[]> }): Promise<{
    prompts: Record<PromptTypes, Prompt[]>
  }>

  // Optional methods for features
  uploadFile?(file: File): Promise<string>
  getImageUrl?(url: string): Promise<string>
  fetchVariableAIOptions?(params: VariableAIOptionsParams): Promise<VariableAIOptionsResponse>
  getVariableLatestValues?(params: GetVariableLatestValuesParams): Promise<VariableLatestValuesResponse>
  setVariableLatestValues?(params: SetVariableLatestValuesParams): Promise<VariableLatestValuesResponse>
}

// Default adapter implementation that uses the current API endpoints
export class InMemoryApiAdapter extends ApiAdapter {
  createTemplate = async (file: File, options: CreateTemplateOptions): Promise<TemplateData> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      // Build URL with query parameters
      const params = new URLSearchParams({
        name: options.name,
        ce: 'fuel_break',
        process: 'ce',
      })
      if (options?.useCache !== undefined) {
        params.append('use_cache', options.useCache.toString())
      }

      const url = `/api/proxy/templates${params.toString() ? `?${params.toString()}` : ''}`

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Template creation failed: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.id) {
        throw new Error('Template ID not found in response')
      }

      const readyDoc = await this.pollTemplate(data.id)

      return readyDoc
    } catch (error) {
      console.error('Error creating template:', error)
      throw error
    }
  }

  pollTemplate = async (id: string, interval = 5000): Promise<TemplateData> => {
    while (true) {
      try {
        // Use the correct API endpoint structure based on the Next.js app router configuration
        // The route is defined at src/app/api/proxy/[id]/route.ts
        const response = await fetch(`/api/proxy/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`)
        }

        const data: TemplateData = await response.json()

        if (isDataReady(data)) {
          return data
        }

        // Wait before the next attempt
        await new Promise((resolve) => setTimeout(resolve, interval))
      } catch (error) {
        console.error('Error polling template:', error)
        throw error
      }
    }
  }

  fetchData = async ({ id }: { id: string }): Promise<TemplateData> => {
    const tmpl = await fetchTemplateById(id)
    if (!tmpl) {
      throw new Error('Template not found')
    }
    return tmpl
  }

  saveData = async ({ data }: { id: string; data: TemplateData }): Promise<TemplateData> => {
    await saveTemplate(data)
    return data
  }

  fetchVariableAIOptions = async (): Promise<VariableAIOptionsResponse> => {
    return variableAutocompleteMock
  }

  getVariableLatestValues = async (): Promise<VariableLatestValuesResponse> => {
    return { variables: [] }
  }

  setVariableLatestValues = async (): Promise<VariableLatestValuesResponse> => {
    return { variables: [] }
  }

  getPrompts = async (): Promise<{ prompts: Record<PromptTypes, Prompt[]> }> => {
    console.warn('getPrompts not implemented')
    return {
      prompts: {
        classify: [],
        templatize: [],
        classifyImage: [],
        actionHintLogic: [],
      },
    }
  }

  setPrompts = async ({
    prompts,
  }: { prompts: Record<string, Prompt[]> }): Promise<{ prompts: Record<string, Prompt[]> }> => {
    console.warn('setPrompts not implemented')
    return { prompts }
  }

  uploadFile = async (file: File): Promise<string> => {
    try {
      // Use IndexedDB to store the file
      return await saveFileToIndexedDB(file)
    } catch (error) {
      console.error('Error in adapter uploadFile:', error)
      throw error
    }
  }

  getImageUrl = async (imageSrc: string): Promise<string> => {
    try {
      if (!imageSrc) return ''

      const fileId = extractFileIdFromUrl(imageSrc)
      if (fileId) {
        return await getFileUrlFromIndexedDB(fileId)
      }

      // Return the original URL for external images
      return imageSrc
    } catch (error) {
      console.error('Error in adapter getImageUrl:', error)
      // Return the original URL if there's an error
      return imageSrc
    }
  }

  fetchAllTemplates = async (): Promise<TemplateData[]> => {
    try {
      return await fetchAllTemplates()
    } catch (error) {
      console.error('Error fetching all templates:', error)
      return []
    }
  }

  deleteTemplate = async (id: string): Promise<void> => {
    try {
      await deleteTemplate(id)
    } catch (error) {
      console.error('Error deleting template:', error)
      throw error
    }
  }
}

// Singleton instance of the API adapter
let apiAdapter: IApiAdapter | null = null

// Function to set a custom API adapter
export const setApiAdapter = (adapter: IApiAdapter): void => {
  apiAdapter = adapter
}

// Export the current API adapter
export const getApiAdapter = (): IApiAdapter => {
  if (!apiAdapter) {
    apiAdapter = new InMemoryApiAdapter()
  }

  return apiAdapter
}
