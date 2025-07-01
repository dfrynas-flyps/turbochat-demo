import { createAsyncThunk } from '@reduxjs/toolkit'

import { getApiAdapter } from '../api-adapter'
import { cleanupAIServiceResponse, normalizeTemplateDataWrite } from '../helpers/templateDataCleanup'
import { applyVariableAIOptions } from '../redux'
import { selectPromptsByType } from '../redux/selectors'
import { RootState } from '../redux/store'
import {
  Classification,
  HeaderClassification,
  ProjectVariable,
  Prompt,
  PromptTypes,
  TemplateData,
} from '../types/editor'
import { VariableLatestValuesResponse } from '../types/editor'
import { getCombinedPromptsPayload, getDefaultPrompt } from './helpers'

export type BaseThunkPayload = {
  id: string
  prompt?: string
  classify_prompt?: string
  action_hint_logic_prompt?: string
}

export type RegenerateTemplatePayload = BaseThunkPayload
export type RegenerateTemplateResult = {
  data: TemplateData
} & Pick<RegenerateTemplatePayload, 'prompt'>
export type ReclassifyTemplatePayload = Omit<BaseThunkPayload, 'prompt'>
export type ReclassifyDynamicActionHintsResponse = {
  error: unknown | null
  header: HeaderClassification
  statements: Classification[]
  id: string
}

// export type FetchAITemplatePayload = {
//   id: string
//   prompt?: string
//   retrying?: boolean
// }
//
// export type FetchAITemplateResult = {
//   data: TemplateData
// } & Pick<FetchAITemplatePayload, 'prompt'>

export type GetRegeneratedSectionPayload = {
  templateId: string
  sectionId: string
}

export type ApiError = {
  message: string
  status: number
}

export type VariableAIOption = {
  seq: number
  text: string
  reason: string
}

export type VariableAIOptionsResponse = {
  type: string
  classify: string
  options: VariableAIOption[]
  recommendation: {
    hint: number
    reason: string
  }
}
export type VariableAIOptionsPayload = {
  statementText: string
  currentVariableName: string
  currentVariableValue: string
  projectTitle?: string
  forestName?: string
  organizationName?: string
  projectVariables?: ProjectVariable[]
  stream?: boolean
}

export type SetVariableLatestValuesPayload = {
  projectId: string
  projectVariable: ProjectVariable
}
export type GetVariableLatestValuesPayload = Omit<SetVariableLatestValuesPayload, 'projectVariable'>

// export const fetchAITemplate = createAsyncThunk<
//   FetchAITemplateResult,
//   FetchAITemplatePayload,
//   { rejectValue: Omit<FetchAITemplatePayload, 'retrying'> }
// >('template/fetchAITemplate', async (payload: FetchAITemplatePayload, { getState, rejectWithValue }) => {
//   const state = getState() as RootState
//   const apiAdapter = getApiAdapter()
//
//   const { id, prompt } = payload
//
//   const classifyPrompts = selectPromptsByType(state, 'classify')
//   const classifyImagePrompts = selectPromptsByType(state, 'classifyImage')
//   const templatizePrompts = selectPromptsByType(state, 'templatize')
//   const actionHintLogicPrompts = selectPromptsByType(state, 'actionHintLogic')
//
//   const defaultClassifyPrompt = getDefaultPrompt(classifyPrompts)
//   const defaultClassifyImagePrompt = getDefaultPrompt(classifyImagePrompts)
//   const defaultRegeneratePrompt = getDefaultPrompt(templatizePrompts)
//   const defaultHintPrompt = getDefaultPrompt(actionHintLogicPrompts)
//
//   try {
//     const data = await apiAdapter.fetchTemplate({
//       id,
//       prompt: prompt || defaultRegeneratePrompt?.prompt || '',
//       classifyPrompt: defaultClassifyPrompt?.prompt,
//       classifyImagePrompt: defaultClassifyImagePrompt?.prompt,
//       actionHintLogicPrompt: defaultHintPrompt?.prompt,
//     })
//
//     return {
//       data: cleanupAIServiceResponse(data),
//       prompt,
//     }
//   } catch (e) {
//     console.error(e)
//     return rejectWithValue({ id, prompt })
//   }
// })

// export const regenerateTemplate = createAsyncThunk<
//   RegenerateTemplateResult,
//   RegenerateTemplatePayload,
//   { rejectValue: RegenerateTemplatePayload }
// >('template/regenerateTemplate', async (payload: RegenerateTemplatePayload, { getState, rejectWithValue }) => {
//   const state = getState() as RootState
//   const apiAdapter = getApiAdapter()
//
//   const { id, prompt, classify_prompt, action_hint_logic_prompt } = payload
//
//   const classifyPrompts = selectPromptsByType(state, 'classify')
//   const classifyImagePrompts = selectPromptsByType(state, 'classifyImage')
//   const templatizePrompts = selectPromptsByType(state, 'templatize')
//   const actionHintLogicPrompts = selectPromptsByType(state, 'actionHintLogic')
//
//   const defaultClassifyPrompt = getDefaultPrompt(classifyPrompts)
//   const defaultClassifyImagePrompt = getDefaultPrompt(classifyImagePrompts)
//   const defaultRegeneratePrompt = getDefaultPrompt(templatizePrompts)
//   const defaultHintPrompt = getDefaultPrompt(actionHintLogicPrompts)
//
//   try {
//     const data = await apiAdapter.regenerateTemplate({
//       id,
//       prompt: prompt || defaultRegeneratePrompt?.prompt || '',
//       classifyPrompt: classify_prompt || defaultClassifyPrompt?.prompt,
//       classifyImagePrompt: defaultClassifyImagePrompt?.prompt,
//       actionHintLogicPrompt: action_hint_logic_prompt || defaultHintPrompt?.prompt,
//     })
//
//     return {
//       data: cleanupAIServiceResponse(data),
//       prompt,
//     }
//   } catch (e) {
//     console.error(e)
//     return rejectWithValue(payload)
//   }
// })

// export const reclassifyTemplate = createAsyncThunk(
//   'template/reclassifyTemplate',
//   async ({ id, classify_prompt, action_hint_logic_prompt }: ReclassifyTemplatePayload, { rejectWithValue }) => {
//     const apiAdapter = getApiAdapter()
//
//     try {
//       const data = await apiAdapter.reclassifyTemplate({
//         id,
//         classifyPrompt: classify_prompt,
//         actionHintLogicPrompt: action_hint_logic_prompt,
//       })
//
//       return data
//     } catch (e) {
//       console.error(e)
//       return rejectWithValue(e)
//     }
//   }
// )

// export const reclassifyDynamicActionHints = createAsyncThunk(
//   'template/reclassifyDynamicActionHints',
//   async ({ id, action_hint_logic_prompt, classify_prompt }: ReclassifyTemplatePayload, { rejectWithValue }) => {
//     const apiAdapter = getApiAdapter()
//
//     try {
//       const data = await apiAdapter.reclassifyDynamicActionHints({
//         id,
//         classifyPrompt: classify_prompt,
//         actionHintLogicPrompt: action_hint_logic_prompt,
//       })
//
//       return data
//     } catch (e) {
//       console.error(e)
//       return rejectWithValue(e as Error)
//     }
//   }
// )

// export const regenerateSection = createAsyncThunk(
//   'template/regenerateSection',
//   async ({ templateId, sectionId }: { templateId: string; sectionId: string }, { getState, rejectWithValue }) => {
//     const state = getState() as RootState
//     const apiAdapter = getApiAdapter()
//
//     const classifyPrompts = selectPromptsByType(state, 'classify')
//     const classifyImagePrompts = selectPromptsByType(state, 'classifyImage')
//     const templatizePrompts = selectPromptsByType(state, 'templatize')
//     const actionHintLogicPrompts = selectPromptsByType(state, 'actionHintLogic')
//
//     const defaultClassifyPrompt = getDefaultPrompt(classifyPrompts)
//     const defaultClassifyImagePrompt = getDefaultPrompt(classifyImagePrompts)
//     const defaultRegeneratePrompt = getDefaultPrompt(templatizePrompts)
//     const defaultHintPrompt = getDefaultPrompt(actionHintLogicPrompts)
//
//     try {
//       return await apiAdapter.regenerateSection({
//         templateId,
//         sectionId,
//         classifyPrompt: defaultClassifyPrompt?.prompt,
//         classifyImagePrompt: defaultClassifyImagePrompt?.prompt,
//         prompt: defaultRegeneratePrompt?.prompt,
//         actionHintLogicPrompt: defaultHintPrompt?.prompt,
//       })
//     } catch (e) {
//       console.error(e)
//       return rejectWithValue(e)
//     }
//   }
// )

// export const getRegeneratedSection = createAsyncThunk(
//   'template/getRegeneratedSection',
//   async (payload: GetRegeneratedSectionPayload, { rejectWithValue, getState }) => {
//     const { sectionId, templateId } = payload
//     const state = getState() as RootState
//     const apiAdapter = getApiAdapter()
//
//     const actionHintLogicPrompts = selectPromptsByType(state, 'actionHintLogic')
//     const classifyPrompts = selectPromptsByType(state, 'classify')
//     const classifyImagePrompts = selectPromptsByType(state, 'classifyImage')
//
//     const defaultClassifyPrompt = getDefaultPrompt(classifyPrompts)
//     const defaultClassifyImagePrompt = getDefaultPrompt(classifyImagePrompts)
//     const defaultHintPrompt = getDefaultPrompt(actionHintLogicPrompts)
//
//     try {
//       return await apiAdapter.getRegeneratedSection({
//         templateId,
//         sectionId,
//         classifyPrompt: defaultClassifyPrompt?.prompt,
//         classifyImagePrompt: defaultClassifyImagePrompt?.prompt,
//         actionHintLogicPrompt: defaultHintPrompt?.prompt,
//       })
//     } catch (e) {
//       console.error(e)
//       return rejectWithValue(e)
//     }
//   }
// )

export const fetchData = createAsyncThunk<TemplateData, { id: string }, { rejectValue: ApiError }>(
  'template/fetchData',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    const apiAdapter = getApiAdapter()

    try {
      return await apiAdapter.fetchData({ id })
    } catch (e) {
      console.error(e)
      if (e instanceof Response) {
        const errorBody = await e.json()
        return rejectWithValue({ message: errorBody.error.userMessage, status: e.status })
      }
      return rejectWithValue({ message: 'An unknown error occurred', status: 500 })
    }
  }
)

export const getData = createAsyncThunk<
  TemplateData,
  { fetcher: () => Promise<TemplateData> },
  { rejectValue: ApiError }
>('template/getData', async ({ fetcher }, { rejectWithValue }) => {
  try {
    return await fetcher()
  } catch (e) {
    console.error(e)
    if (e instanceof Response) {
      const errorBody = await e.json()
      return rejectWithValue({ message: errorBody.error.userMessage, status: e.status })
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 })
  }
})

export const saveData = createAsyncThunk(
  'template/saveData',
  async ({ id, data }: { id: string; data: TemplateData; createDocument?: boolean }, { rejectWithValue }) => {
    const apiAdapter = getApiAdapter()

    try {
      const normalizedData = normalizeTemplateDataWrite(data)
      return await apiAdapter.saveData({
        id,
        data: normalizedData,
      })
    } catch (e) {
      console.error(e)
      return rejectWithValue(e)
    }
  }
)

export const fetchVariableAIOptions = createAsyncThunk<
  VariableAIOptionsResponse,
  VariableAIOptionsPayload,
  { rejectValue: { error: Error; variableName: string } }
>(
  'template/variableOptions',
  async (
    {
      statementText,
      currentVariableName,
      currentVariableValue,
      projectTitle,
      forestName,
      organizationName = 'United States Forest Service',
      projectVariables = [],
      stream = false,
    },
    { rejectWithValue, dispatch }
  ) => {
    const apiAdapter = getApiAdapter()

    if (!apiAdapter.hasVariableAutocomplete()) {
      throw new Error('ApiAdapter is missing variable autocomplete methods')
    }

    try {
      dispatch(
        applyVariableAIOptions({
          variableName: currentVariableName,
          loadingState: 'loading',
        })
      )

      const result = await apiAdapter.fetchVariableAIOptions({
        statementText,
        currentVariableName,
        currentVariableValue,
        projectTitle,
        forestName,
        organizationName,
        projectVariables,
        stream,
      })

      dispatch(
        applyVariableAIOptions({
          variableName: currentVariableName,
          variableOptions: result,
          loadingState: 'loaded',
        })
      )

      return result
    } catch (e) {
      console.error('Error during fetch:', e)
      return rejectWithValue({ error: e as Error, variableName: currentVariableName })
    }
  }
)

export const getVariableLatestValues = createAsyncThunk<
  VariableLatestValuesResponse,
  GetVariableLatestValuesPayload,
  { rejectValue: { error: Error; variableName: string } }
>('template/getVariableLatestValues', async ({ projectId }) => {
  const apiAdapter = getApiAdapter()

  if (!apiAdapter.hasVariableAutocomplete()) {
    throw new Error('ApiAdapter is missing variable autocomplete methods')
  }

  return {
    projectVariables: (await apiAdapter.getVariableLatestValues({ projectId })).variables,
  }
})

export const setVariableLatestValues = createAsyncThunk<
  VariableLatestValuesResponse,
  SetVariableLatestValuesPayload,
  { rejectValue: { error: Error; variableName: string } }
>('template/setVariableLatestValues', async ({ projectId, projectVariable }) => {
  const apiAdapter = getApiAdapter()
  if (!apiAdapter.hasVariableAutocomplete()) {
    throw new Error('ApiAdapter is missing variable autocomplete methods')
  }

  return {
    projectVariables: (await apiAdapter.setVariableLatestValues({ projectId, projectVariable })).variables,
  }
})

export const getPrompts = createAsyncThunk('template/getPrompts', async () => {
  const apiAdapter = getApiAdapter()
  return await apiAdapter.getPrompts()
})

export const setPrompts = createAsyncThunk(
  'template/setPrompts',
  async (
    { promptTypesToUpdate, promptType }: { promptTypesToUpdate: Prompt[]; promptType: PromptTypes },
    { getState }
  ) => {
    const state = getState() as RootState
    const apiAdapter = getApiAdapter()

    const prompts = getCombinedPromptsPayload(state, promptType, promptTypesToUpdate)
    return await apiAdapter.setPrompts({ prompts })
  }
)

// export const getTitle = createAsyncThunk(
//   'template/getTitle',
//   async ({ text, statementId }: { text: string; statementId: string }, { rejectWithValue }) => {
//     const apiAdapter = getApiAdapter()
//
//     try {
//       return await apiAdapter.getTitle({ text, statementId })
//     } catch (e) {
//       console.error(e)
//       return rejectWithValue(e)
//     }
//   }
// )
