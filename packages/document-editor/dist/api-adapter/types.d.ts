import { VariableAIOptionsResponse } from '../redux/thunks';
import { ProjectVariable, Prompt, PromptTypes, TemplateData } from '../types/editor';
/**
 * Feature definitions with their required methods
 */
export interface FeatureDefinitions {
    imageUpload: {
        uploadFile: (file: File) => Promise<string>;
        getImageUrl: (url: string) => Promise<string>;
    };
    variableAutocomplete: {
        fetchVariableAIOptions: (params: VariableAIOptionsParams) => Promise<VariableAIOptionsResponse>;
        getVariableLatestValues: (params: GetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>;
        setVariableLatestValues: (params: SetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>;
    };
}
/**
 * Type for an API adapter with image upload capabilities
 */
export type ImageUploadAdapter = IApiAdapter & FeatureDefinitions['imageUpload'];
/**
 * Type for an API adapter with variable autocomplete capabilities
 */
export type VariableAutocompleteAdapter = IApiAdapter & FeatureDefinitions['variableAutocomplete'];
/**
 * API adapter interface for document editor
 * This interface defines all the API methods that can be customized by users
 */
export interface IApiAdapter {
    hasImageUpload: () => this is ImageUploadAdapter;
    hasVariableAutocomplete: () => this is VariableAutocompleteAdapter;
    createTemplate: (file: File, options: CreateTemplateOptions) => Promise<TemplateData>;
    fetchAllTemplates: () => Promise<TemplateData[]>;
    deleteTemplate: (id: string) => Promise<void>;
    fetchData: (params: {
        id: string;
    }) => Promise<TemplateData>;
    saveData: (params: {
        id: string;
        data: TemplateData;
    }) => Promise<TemplateData>;
    fetchVariableAIOptions?: (params: VariableAIOptionsParams) => Promise<VariableAIOptionsResponse>;
    getVariableLatestValues?: (params: GetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>;
    setVariableLatestValues?: (params: SetVariableLatestValuesParams) => Promise<VariableLatestValuesResponse>;
    getPrompts: () => Promise<{
        prompts: Record<PromptTypes, Prompt[]>;
    }>;
    setPrompts: (params: {
        prompts: Record<PromptTypes, Prompt[]>;
    }) => Promise<{
        prompts: Record<PromptTypes, Prompt[]>;
    }>;
    uploadFile?: (file: File) => Promise<string>;
    getImageUrl?: (url: string) => Promise<string>;
}
/**
 * Options for document creation
 */
export interface CreateTemplateOptions {
    name: string;
    useCache?: boolean;
}
export interface FetchTemplateParams {
    id: string;
    prompt?: string;
    classifyPrompt?: string;
    classifyImagePrompt?: string;
    actionHintLogicPrompt?: string;
}
export interface VariableAIOptionsParams {
    statementText: string;
    currentVariableName: string;
    currentVariableValue: string;
    projectTitle?: string;
    forestName?: string;
    organizationName?: string;
    projectVariables?: ProjectVariable[];
    stream?: boolean;
}
export interface VariableLatestValuesResponse {
    variables: ProjectVariable[];
}
export interface GetVariableLatestValuesParams {
    projectId: string;
}
export interface SetVariableLatestValuesParams {
    projectId: string;
    projectVariable: ProjectVariable;
}
//# sourceMappingURL=types.d.ts.map