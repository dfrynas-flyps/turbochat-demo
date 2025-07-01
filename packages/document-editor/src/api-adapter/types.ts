import { VariableAIOptionsResponse } from '../redux/thunks'
import { ProjectVariable, Prompt, PromptTypes, TemplateData } from '../types/editor'

/**
 * Feature definitions with their required methods
 */
export interface FeatureDefinitions {
  imageUpload: {
    uploadFile: (file: File) => Promise<string>
    getImageUrl: (url: string) => Promise<string>
  }
  variableAutocomplete: {
    fetchVariableAIOptions: (params: VariableAIOptionsParams) => Promise<VariableAIOptionsResponse>
    getVariableLatestValues: (params: GetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>
    setVariableLatestValues: (params: SetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>
  }
}

/**
 * Type for an API adapter with image upload capabilities
 */
export type ImageUploadAdapter = IApiAdapter & FeatureDefinitions['imageUpload']

/**
 * Type for an API adapter with variable autocomplete capabilities
 */
export type VariableAutocompleteAdapter = IApiAdapter & FeatureDefinitions['variableAutocomplete']

/**
 * API adapter interface for document editor
 * This interface defines all the API methods that can be customized by users
 */
export interface IApiAdapter {
  // Feature detection - these return typed adapters when the feature is available
  hasImageUpload: () => this is ImageUploadAdapter
  hasVariableAutocomplete: () => this is VariableAutocompleteAdapter

  // Document operations
  createTemplate: (file: File, options: CreateTemplateOptions) => Promise<TemplateData>

  // Template operations
  fetchAllTemplates: () => Promise<TemplateData[]>
  deleteTemplate: (id: string) => Promise<void>

  // Data operations
  fetchData: (params: { id: string }) => Promise<TemplateData>
  saveData: (params: { id: string; data: TemplateData }) => Promise<TemplateData>

  // Variable operations
  fetchVariableAIOptions?: (params: VariableAIOptionsParams) => Promise<VariableAIOptionsResponse>
  getVariableLatestValues?: (params: GetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>
  setVariableLatestValues?: (params: SetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>

  // Prompt operations
  getPrompts: () => Promise<{ prompts: Record<PromptTypes, Prompt[]> }>
  setPrompts: (params: { prompts: Record<PromptTypes, Prompt[]> }) => Promise<{
    prompts: Record<PromptTypes, Prompt[]>
  }>

  // Optional file operations (part of imageUpload feature)
  uploadFile?: (file: File) => Promise<string>
  getImageUrl?: (url: string) => Promise<string>

  // Regenerate & reclassify - temporarily not implemented
  // regenerateTemplate: (params: RegenerateTemplateParams) => Promise<TemplateData>
  // reclassifyTemplate: (params: ReclassifyTemplateParams) => Promise<unknown>
  // reclassifyDynamicActionHints: (params: ReclassifyTemplateParams) => Promise<unknown>
  // regenerateSection: (params: RegenerateSectionParams) => Promise<RegenerateSectionResult>
  // getRegeneratedSection: (params: GetRegeneratedSectionParams) => Promise<unknown>
}

/**
 * Options for document creation
 */
export interface CreateTemplateOptions {
  name: string
  useCache?: boolean
}

// Parameter types for API methods
export interface FetchTemplateParams {
  id: string
  prompt?: string
  classifyPrompt?: string
  classifyImagePrompt?: string
  actionHintLogicPrompt?: string
}

// export interface RegenerateTemplateParams {
//   id: string
//   prompt?: string
//   classifyPrompt?: string
//   classifyImagePrompt?: string
//   actionHintLogicPrompt?: string
// }
//
// export interface ReclassifyTemplateParams {
//   id: string
//   classifyPrompt?: string
//   actionHintLogicPrompt?: string
// }
//
// export interface RegenerateSectionParams {
//   templateId: string
//   sectionId: string
//   prompt?: string
//   classifyPrompt?: string
//   classifyImagePrompt?: string
//   actionHintLogicPrompt?: string
// }
//
// export interface GetRegeneratedSectionParams {
//   templateId: string
//   sectionId: string
//   classifyPrompt?: string
//   classifyImagePrompt?: string
//   actionHintLogicPrompt?: string
// }
//
// export interface RegenerateSectionResult {
//   templateId: string
//   sectionId: string
//   classifyPromptId?: string
//   classifyImagePromptId?: string
// }

export interface VariableAIOptionsParams {
  statementText: string
  currentVariableName: string
  currentVariableValue: string
  projectTitle?: string
  forestName?: string
  organizationName?: string
  projectVariables?: ProjectVariable[]
  stream?: boolean
}

export interface VariableLatestValuesResponse {
  variables: ProjectVariable[]
}

export interface GetVariableLatestValuesParams {
  projectId: string
}

export interface SetVariableLatestValuesParams {
  projectId: string
  projectVariable: ProjectVariable
}
