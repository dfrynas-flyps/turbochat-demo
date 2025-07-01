import { VariableAIOptionsResponse } from '../redux/thunks';
import { Prompt, PromptTypes, TemplateData } from '../types/editor';
import { CreateTemplateOptions, GetVariableLatestValuesParams, IApiAdapter, ImageUploadAdapter, SetVariableLatestValuesParams, VariableAIOptionsParams, VariableAutocompleteAdapter, VariableLatestValuesResponse } from './types';
/**
 * Abstract API adapter that implements feature flag methods
 * Custom adapters can extend this class to avoid implementing feature detection methods
 */
export declare abstract class ApiAdapter implements IApiAdapter {
    hasImageUpload: () => this is ImageUploadAdapter;
    hasVariableAutocomplete: () => this is VariableAutocompleteAdapter;
    abstract createTemplate(file: File, options: CreateTemplateOptions): Promise<TemplateData>;
    abstract pollTemplate(id: string, interval?: number): Promise<TemplateData>;
    abstract fetchData(params: {
        id: string;
    }): Promise<TemplateData>;
    abstract saveData(params: {
        id: string;
        data: TemplateData;
    }): Promise<TemplateData>;
    abstract fetchAllTemplates(): Promise<TemplateData[]>;
    abstract deleteTemplate(id: string): Promise<void>;
    abstract getPrompts(): Promise<{
        prompts: Record<PromptTypes, Prompt[]>;
    }>;
    abstract setPrompts(params: {
        prompts: Record<PromptTypes, Prompt[]>;
    }): Promise<{
        prompts: Record<PromptTypes, Prompt[]>;
    }>;
    uploadFile?(file: File): Promise<string>;
    getImageUrl?(url: string): Promise<string>;
    fetchVariableAIOptions?(params: VariableAIOptionsParams): Promise<VariableAIOptionsResponse>;
    getVariableLatestValues?(params: GetVariableLatestValuesParams): Promise<VariableLatestValuesResponse>;
    setVariableLatestValues?(params: SetVariableLatestValuesParams): Promise<VariableLatestValuesResponse>;
}
export declare class InMemoryApiAdapter extends ApiAdapter {
    createTemplate: (file: File, options: CreateTemplateOptions) => Promise<TemplateData>;
    pollTemplate: (id: string, interval?: number) => Promise<TemplateData>;
    fetchData: ({ id }: {
        id: string;
    }) => Promise<TemplateData>;
    saveData: ({ data }: {
        id: string;
        data: TemplateData;
    }) => Promise<TemplateData>;
    fetchVariableAIOptions: () => Promise<VariableAIOptionsResponse>;
    getVariableLatestValues: () => Promise<VariableLatestValuesResponse>;
    setVariableLatestValues: () => Promise<VariableLatestValuesResponse>;
    getPrompts: () => Promise<{
        prompts: Record<PromptTypes, Prompt[]>;
    }>;
    setPrompts: ({ prompts, }: {
        prompts: Record<string, Prompt[]>;
    }) => Promise<{
        prompts: Record<string, Prompt[]>;
    }>;
    uploadFile: (file: File) => Promise<string>;
    getImageUrl: (imageSrc: string) => Promise<string>;
    fetchAllTemplates: () => Promise<TemplateData[]>;
    deleteTemplate: (id: string) => Promise<void>;
}
export declare const setApiAdapter: (adapter: IApiAdapter) => void;
export declare const getApiAdapter: () => IApiAdapter;
//# sourceMappingURL=index.d.ts.map