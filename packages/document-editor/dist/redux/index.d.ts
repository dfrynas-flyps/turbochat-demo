import { AlertColor } from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';
import { type DeleteModalTypes, HeaderFieldState, type PromptTypes, StatementTypes, TemplateData, type TemplateSection, type TemplateVariable, VariableHistoryEntry, VariableRegistryEntry } from '../types/editor';
import { ActionNames } from '../types/editor';
import { VariableAIOptionsResponse } from './thunks';
import { LoadingState, TemplateState } from './types';
export declare const templateSlice: import("@reduxjs/toolkit").Slice<TemplateState, {
    updateTemplate: (state: TemplateState, action: PayloadAction<Partial<TemplateState>>) => {
        activeSection: null | {
            id: string;
        };
        activeVar: import("./types").ActiveVariable | null;
        activeStatement: null | {
            id: string;
            navInitiated: boolean;
            classificationOpen: boolean;
        };
        variableAIOptions: import("./types").NormalizedVariableAIOptionsState;
        projectVariableValues: import("../types/editor").ProjectVariable[];
        isTemplateLoading: boolean;
        poolingPrompts: import("./types").RegeneratePrompts | null;
        initialData: TemplateData | null;
        data: TemplateData | null;
        createState: {
            loading: boolean;
            error: boolean;
            message?: string;
        };
        savingState: {
            initialSaveSuccess: boolean;
            error: boolean;
            state: import("../types/editor").SavingState;
        };
        newStatement: (Partial<import("../types/editor").TemplateStatement> & {
            id: import("../types/editor").TemplateStatement["id"];
            type: StatementTypes;
            imageUrl?: string;
            mode?: "prepend" | "append";
        }) | null;
        alert: {
            type?: AlertColor;
            text: string;
        };
        projectData: import("../types/editor").ProjectData;
        triggerDataSave: null | number;
        trackLoadedTemplateAfterCreation: boolean;
        deleteModal?: {
            id: string;
            type: DeleteModalTypes;
        } | null;
        promptToDelete?: string;
        prompts: import("../types/editor").TemplatePrompts;
    };
    setActiveVar: (state: TemplateState, action: PayloadAction<TemplateState["activeVar"]>) => void;
    setActiveStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<null | {
        id: string;
        navInitiated?: boolean;
        classificationOpen?: boolean;
    }>) => void;
    setActiveSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    } | null>) => void;
    setDocumentHeading: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<string>) => void;
    clearPoolingPrompts: (state: import("immer").WritableDraft<TemplateState>) => void;
    setData: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<TemplateData>) => void;
    setFetchError: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<boolean>) => void;
    addNewVariable: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<VariableRegistryEntry>) => void;
    updateVariable: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        variableName: VariableRegistryEntry["name"];
        newValue: VariableRegistryEntry["value"];
    }>) => void;
    clearVariableAIOptions: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        variableName: string;
    }>) => void;
    applyVariableAIOptions: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        variableName: string;
        variableOptions?: VariableAIOptionsResponse;
        loadingState: LoadingState;
    }>) => void;
    setVariableHistory: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        variableName: string;
        newHistory: VariableHistoryEntry[];
    }>) => void;
    updateStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        updatePayload: Record<string, unknown>;
        shouldSave?: boolean;
    }>) => void;
    toggleLastStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        lastStatement: boolean;
    }>) => void;
    typeoverStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        text: string;
        newVariables?: TemplateVariable[];
        typeoverMode: boolean;
    }>) => void;
    setActionAutoApplied: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        actionAutoApplied: ActionNames;
    }>) => void;
    addNewStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<TemplateState["newStatement"]>) => void;
    addNewSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        name: string;
    }>) => void;
    setAlert: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        text: string;
        type?: AlertColor;
    }>) => void;
    setTrackLoadedTemplateAfterCreation: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<boolean>) => void;
    setProjectData: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<TemplateState["projectData"]>) => void;
    setNewStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<TemplateState["newStatement"]>) => void;
    setImageAsConfirmed: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    setRegeneratedSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<TemplateSection>) => void;
    deleteStatement: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    applyDeleteHint: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    toggleSectionSoftDelete: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        isDeleted: boolean;
    }>) => void;
    deleteSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    renameSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        newName: string;
    }>) => void;
    changeSectionHeadingSize: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        newName: string;
    }>) => void;
    setCreateState: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        loading: boolean;
        error: boolean;
        message?: string;
    }>) => void;
    applyVariablesOffHint: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    toggleStatementVariables: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        statementId: string;
        turnOff: boolean;
    }>) => void;
    applyOptionalHint: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    toggleStatementOptional: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        statementId: string;
        optional: boolean;
    }>) => void;
    toggleDeleteModal: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        type: DeleteModalTypes;
    } | null>) => void;
    setPromptToDelete: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
    }>) => void;
    setPromptId: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        type: PromptTypes;
    } | null>) => void;
    updateAndSaveSection: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        id: string;
        newValues: Partial<TemplateSection>;
    }>) => void;
    resetState: () => TemplateState;
    updateDocumentHeader: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<Array<HeaderFieldState>>) => void;
    setIndentLevel: (state: import("immer").WritableDraft<TemplateState>, action: PayloadAction<{
        statementId: string;
        indentLevel: number;
    }>) => void;
}, "template", "template", import("@reduxjs/toolkit").SliceSelectors<TemplateState>>;
export declare const updateTemplate: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<TemplateState>, "template/updateTemplate">, setActiveVar: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("./types").ActiveVariable | null, "template/setActiveVar">, setActiveSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
} | null, "template/setActiveSection">, setActiveStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    navInitiated?: boolean;
    classificationOpen?: boolean;
} | null, "template/setActiveStatement">, setDocumentHeading: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "template/setDocumentHeading">, clearPoolingPrompts: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"template/clearPoolingPrompts">, setFetchError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "template/setFetchError">, setAlert: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    text: string;
    type?: AlertColor;
}, "template/setAlert">, setTrackLoadedTemplateAfterCreation: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "template/setTrackLoadedTemplateAfterCreation">, setData: import("@reduxjs/toolkit").ActionCreatorWithPayload<TemplateData, "template/setData">, setNewStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<(Partial<import("../types/editor").TemplateStatement> & {
    id: import("../types/editor").TemplateStatement["id"];
    type: StatementTypes;
    imageUrl?: string;
    mode?: "prepend" | "append";
}) | null, "template/setNewStatement">, addNewStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<(Partial<import("../types/editor").TemplateStatement> & {
    id: import("../types/editor").TemplateStatement["id"];
    type: StatementTypes;
    imageUrl?: string;
    mode?: "prepend" | "append";
}) | null, "template/addNewStatement">, addNewSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    name: string;
}, "template/addNewSection">, setProjectData: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../types/editor").ProjectData, "template/setProjectData">, updateStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    updatePayload: Record<string, unknown>;
    shouldSave?: boolean;
}, "template/updateStatement">, updateVariable: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    variableName: VariableRegistryEntry["name"];
    newValue: VariableRegistryEntry["value"];
}, "template/updateVariable">, applyVariableAIOptions: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    variableName: string;
    variableOptions?: VariableAIOptionsResponse;
    loadingState: LoadingState;
}, "template/applyVariableAIOptions">, clearVariableAIOptions: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    variableName: string;
}, "template/clearVariableAIOptions">, setVariableHistory: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    variableName: string;
    newHistory: VariableHistoryEntry[];
}, "template/setVariableHistory">, addNewVariable: import("@reduxjs/toolkit").ActionCreatorWithPayload<VariableRegistryEntry, "template/addNewVariable">, deleteStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/deleteStatement">, deleteSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/deleteSection">, renameSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    newName: string;
}, "template/renameSection">, setImageAsConfirmed: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/setImageAsConfirmed">, setRegeneratedSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<TemplateSection, "template/setRegeneratedSection">, resetState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"template/resetState">, setCreateState: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    loading: boolean;
    error: boolean;
    message?: string;
}, "template/setCreateState">, applyVariablesOffHint: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/applyVariablesOffHint">, toggleStatementVariables: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    statementId: string;
    turnOff: boolean;
}, "template/toggleStatementVariables">, applyOptionalHint: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/applyOptionalHint">, toggleStatementOptional: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    statementId: string;
    optional: boolean;
}, "template/toggleStatementOptional">, toggleDeleteModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    type: DeleteModalTypes;
} | null, "template/toggleDeleteModal">, toggleLastStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    lastStatement: boolean;
}, "template/toggleLastStatement">, typeoverStatement: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    text: string;
    newVariables?: TemplateVariable[];
    typeoverMode: boolean;
}, "template/typeoverStatement">, setActionAutoApplied: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    actionAutoApplied: ActionNames;
}, "template/setActionAutoApplied">, applyDeleteHint: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/applyDeleteHint">, toggleSectionSoftDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    isDeleted: boolean;
}, "template/toggleSectionSoftDelete">, setPromptToDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
}, "template/setPromptToDelete">, setPromptId: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    type: PromptTypes;
} | null, "template/setPromptId">, updateAndSaveSection: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    newValues: Partial<TemplateSection>;
}, "template/updateAndSaveSection">, changeSectionHeadingSize: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    newName: string;
}, "template/changeSectionHeadingSize">, updateDocumentHeader: import("@reduxjs/toolkit").ActionCreatorWithPayload<HeaderFieldState[], "template/updateDocumentHeader">, setIndentLevel: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    statementId: string;
    indentLevel: number;
}, "template/setIndentLevel">;
export * from './thunks';
declare const _default: import("redux").Reducer<TemplateState>;
export default _default;
//# sourceMappingURL=index.d.ts.map