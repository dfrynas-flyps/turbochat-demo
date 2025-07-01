import { Classification, HeaderClassification, ProjectVariable, Prompt, PromptTypes, TemplateData } from '../types/editor';
import { VariableLatestValuesResponse } from '../types/editor';
export type BaseThunkPayload = {
    id: string;
    prompt?: string;
    classify_prompt?: string;
    action_hint_logic_prompt?: string;
};
export type RegenerateTemplatePayload = BaseThunkPayload;
export type RegenerateTemplateResult = {
    data: TemplateData;
} & Pick<RegenerateTemplatePayload, 'prompt'>;
export type ReclassifyTemplatePayload = Omit<BaseThunkPayload, 'prompt'>;
export type ReclassifyDynamicActionHintsResponse = {
    error: unknown | null;
    header: HeaderClassification;
    statements: Classification[];
    id: string;
};
export type GetRegeneratedSectionPayload = {
    templateId: string;
    sectionId: string;
};
export type ApiError = {
    message: string;
    status: number;
};
export type VariableAIOption = {
    seq: number;
    text: string;
    reason: string;
};
export type VariableAIOptionsResponse = {
    type: string;
    classify: string;
    options: VariableAIOption[];
    recommendation: {
        hint: number;
        reason: string;
    };
};
export type VariableAIOptionsPayload = {
    statementText: string;
    currentVariableName: string;
    currentVariableValue: string;
    projectTitle?: string;
    forestName?: string;
    organizationName?: string;
    projectVariables?: ProjectVariable[];
    stream?: boolean;
};
export type SetVariableLatestValuesPayload = {
    projectId: string;
    projectVariable: ProjectVariable;
};
export type GetVariableLatestValuesPayload = Omit<SetVariableLatestValuesPayload, 'projectVariable'>;
export declare const fetchData: import("@reduxjs/toolkit").AsyncThunk<TemplateData, {
    id: string;
}, {
    rejectValue: ApiError;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const getData: import("@reduxjs/toolkit").AsyncThunk<TemplateData, {
    fetcher: () => Promise<TemplateData>;
}, {
    rejectValue: ApiError;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const saveData: import("@reduxjs/toolkit").AsyncThunk<TemplateData, {
    id: string;
    data: TemplateData;
    createDocument?: boolean;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchVariableAIOptions: import("@reduxjs/toolkit").AsyncThunk<VariableAIOptionsResponse, VariableAIOptionsPayload, {
    rejectValue: {
        error: Error;
        variableName: string;
    };
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const getVariableLatestValues: import("@reduxjs/toolkit").AsyncThunk<VariableLatestValuesResponse, GetVariableLatestValuesPayload, {
    rejectValue: {
        error: Error;
        variableName: string;
    };
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setVariableLatestValues: import("@reduxjs/toolkit").AsyncThunk<VariableLatestValuesResponse, SetVariableLatestValuesPayload, {
    rejectValue: {
        error: Error;
        variableName: string;
    };
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const getPrompts: import("@reduxjs/toolkit").AsyncThunk<{
    prompts: Record<PromptTypes, Prompt[]>;
}, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setPrompts: import("@reduxjs/toolkit").AsyncThunk<{
    prompts: Record<PromptTypes, Prompt[]>;
}, {
    promptTypesToUpdate: Prompt[];
    promptType: PromptTypes;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
//# sourceMappingURL=thunks.d.ts.map