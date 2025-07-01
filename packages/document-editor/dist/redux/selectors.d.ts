import { RootState } from '../redux/store';
import { PromptTypes, TemplateData, TemplateSection, TemplateStatement, VariableRegistry } from '../types/editor';
export declare const selectIsTemplateLoading: (state: RootState) => boolean;
export declare const selectActiveVar: (state: RootState) => import("./types").ActiveVariable | null;
export declare const selectVariableAIOptions: (state: RootState) => import("./types").NormalizedVariableAIOptionsState;
export declare const selectProjectVariableValues: (state: RootState) => import("../types/editor").ProjectVariable[];
export declare const selectActiveSectionId: (state: RootState) => string | null;
export declare const selectActiveStatement: (state: RootState) => {
    id: string;
    navInitiated: boolean;
    classificationOpen: boolean;
} | null;
export declare const selectData: (state: RootState) => TemplateData | null;
export declare const selectNewStatement: (state: RootState) => (Partial<TemplateStatement> & {
    id: TemplateStatement["id"];
    type: import("../types/editor").StatementTypes;
    imageUrl?: string;
    mode?: "prepend" | "append";
}) | null;
export declare const selectProjectData: (state: RootState) => import("../types/editor").ProjectData;
export declare const selectTriggerDataSave: (state: RootState) => number | null;
export declare const selectPrompts: (state: RootState) => import("../types/editor").TemplatePrompts;
export declare const selectStatementById: ((state: {
    template: import("./types").TemplateState;
}, statementId: string) => (import("../types/editor").TemplateStatementActionHintParams & {
    id: string;
    name: string;
    description: string;
    text: string;
    variables: import("../types/editor").TemplateVariable[];
    type?: import("../types/editor").StatementTypes;
    isImageReady?: boolean;
    imageUrl?: string;
    isRegenerating?: boolean;
    nameStatus?: import("../types/editor").LoadState;
    classification?: import("../types/editor").Classification | null;
    actionAutoApplied?: string | null;
    last_statement?: boolean;
    indent_level?: number;
} & {
    _triggerUpdate?: boolean;
    _focusPositionFromContentEnd?: number;
}) | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null;
    memoizedResultFunc: ((resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null;
    dependencies: [(state: RootState) => TemplateData | null, (_: RootState, statementId: TemplateStatement["id"]) => string];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectSectionById: ((state: {
    template: import("./types").TemplateState;
}, sectionId: string) => import("../types/editor").TemplateSectionDTO | undefined) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => import("../types/editor").TemplateSectionDTO | undefined;
    memoizedResultFunc: ((resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => import("../types/editor").TemplateSectionDTO | undefined) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../types/editor").TemplateSectionDTO | undefined;
    dependencies: [(state: RootState) => TemplateData | null, (_: RootState, sectionId: TemplateSection["id"]) => string];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectPreviousStatement: ((state: {
    template: import("./types").TemplateState;
}, statementId: string) => (import("../types/editor").TemplateStatementActionHintParams & {
    id: string;
    name: string;
    description: string;
    text: string;
    variables: import("../types/editor").TemplateVariable[];
    type?: import("../types/editor").StatementTypes;
    isImageReady?: boolean;
    imageUrl?: string;
    isRegenerating?: boolean;
    nameStatus?: import("../types/editor").LoadState;
    classification?: import("../types/editor").Classification | null;
    actionAutoApplied?: string | null;
    last_statement?: boolean;
    indent_level?: number;
} & {
    _triggerUpdate?: boolean;
    _focusPositionFromContentEnd?: number;
}) | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null;
    memoizedResultFunc: ((resultFuncArgs_0: TemplateData | null, resultFuncArgs_1: string) => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => (import("../types/editor").TemplateStatementActionHintParams & {
        id: string;
        name: string;
        description: string;
        text: string;
        variables: import("../types/editor").TemplateVariable[];
        type?: import("../types/editor").StatementTypes;
        isImageReady?: boolean;
        imageUrl?: string;
        isRegenerating?: boolean;
        nameStatus?: import("../types/editor").LoadState;
        classification?: import("../types/editor").Classification | null;
        actionAutoApplied?: string | null;
        last_statement?: boolean;
        indent_level?: number;
    } & {
        _triggerUpdate?: boolean;
        _focusPositionFromContentEnd?: number;
    }) | null;
    dependencies: [(state: RootState) => TemplateData | null, (_: RootState, statementId: TemplateStatement["id"]) => string];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectPromptsByType: ((state: {
    template: import("./types").TemplateState;
}, promptType: PromptTypes) => import("../types/editor").Prompt[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/editor").TemplatePrompts, resultFuncArgs_1: PromptTypes) => import("../types/editor").Prompt[];
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/editor").TemplatePrompts, resultFuncArgs_1: PromptTypes) => import("../types/editor").Prompt[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../types/editor").Prompt[];
    dependencies: [(state: RootState) => import("../types/editor").TemplatePrompts, (_: RootState, promptType: PromptTypes) => PromptTypes];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectVariableRegistry: ((state: {
    template: import("./types").TemplateState;
}) => VariableRegistry) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TemplateData | null) => VariableRegistry;
    memoizedResultFunc: ((resultFuncArgs_0: TemplateData | null) => VariableRegistry) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => VariableRegistry;
    dependencies: [(state: RootState) => TemplateData | null];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
//# sourceMappingURL=selectors.d.ts.map