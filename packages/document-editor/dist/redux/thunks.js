import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiAdapter } from '../api-adapter';
import { normalizeTemplateDataWrite } from '../helpers/templateDataCleanup';
import { applyVariableAIOptions } from '../redux';
import { getCombinedPromptsPayload } from './helpers';
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
export const fetchData = createAsyncThunk('template/fetchData', async ({ id }, { rejectWithValue }) => {
    const apiAdapter = getApiAdapter();
    try {
        return await apiAdapter.fetchData({ id });
    }
    catch (e) {
        console.error(e);
        if (e instanceof Response) {
            const errorBody = await e.json();
            return rejectWithValue({ message: errorBody.error.userMessage, status: e.status });
        }
        return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
    }
});
export const getData = createAsyncThunk('template/getData', async ({ fetcher }, { rejectWithValue }) => {
    try {
        return await fetcher();
    }
    catch (e) {
        console.error(e);
        if (e instanceof Response) {
            const errorBody = await e.json();
            return rejectWithValue({ message: errorBody.error.userMessage, status: e.status });
        }
        return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
    }
});
export const saveData = createAsyncThunk('template/saveData', async ({ id, data }, { rejectWithValue }) => {
    const apiAdapter = getApiAdapter();
    try {
        const normalizedData = normalizeTemplateDataWrite(data);
        return await apiAdapter.saveData({
            id,
            data: normalizedData,
        });
    }
    catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});
export const fetchVariableAIOptions = createAsyncThunk('template/variableOptions', async ({ statementText, currentVariableName, currentVariableValue, projectTitle, forestName, organizationName = 'United States Forest Service', projectVariables = [], stream = false, }, { rejectWithValue, dispatch }) => {
    const apiAdapter = getApiAdapter();
    if (!apiAdapter.hasVariableAutocomplete()) {
        throw new Error('ApiAdapter is missing variable autocomplete methods');
    }
    try {
        dispatch(applyVariableAIOptions({
            variableName: currentVariableName,
            loadingState: 'loading',
        }));
        const result = await apiAdapter.fetchVariableAIOptions({
            statementText,
            currentVariableName,
            currentVariableValue,
            projectTitle,
            forestName,
            organizationName,
            projectVariables,
            stream,
        });
        dispatch(applyVariableAIOptions({
            variableName: currentVariableName,
            variableOptions: result,
            loadingState: 'loaded',
        }));
        return result;
    }
    catch (e) {
        console.error('Error during fetch:', e);
        return rejectWithValue({ error: e, variableName: currentVariableName });
    }
});
export const getVariableLatestValues = createAsyncThunk('template/getVariableLatestValues', async ({ projectId }) => {
    const apiAdapter = getApiAdapter();
    if (!apiAdapter.hasVariableAutocomplete()) {
        throw new Error('ApiAdapter is missing variable autocomplete methods');
    }
    return {
        projectVariables: (await apiAdapter.getVariableLatestValues({ projectId })).variables,
    };
});
export const setVariableLatestValues = createAsyncThunk('template/setVariableLatestValues', async ({ projectId, projectVariable }) => {
    const apiAdapter = getApiAdapter();
    if (!apiAdapter.hasVariableAutocomplete()) {
        throw new Error('ApiAdapter is missing variable autocomplete methods');
    }
    return {
        projectVariables: (await apiAdapter.setVariableLatestValues({ projectId, projectVariable })).variables,
    };
});
export const getPrompts = createAsyncThunk('template/getPrompts', async () => {
    const apiAdapter = getApiAdapter();
    return await apiAdapter.getPrompts();
});
export const setPrompts = createAsyncThunk('template/setPrompts', async ({ promptTypesToUpdate, promptType }, { getState }) => {
    const state = getState();
    const apiAdapter = getApiAdapter();
    const prompts = getCombinedPromptsPayload(state, promptType, promptTypesToUpdate);
    return await apiAdapter.setPrompts({ prompts });
});
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
//# sourceMappingURL=thunks.js.map