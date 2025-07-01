import { selectPrompts } from '../redux/selectors';
const statementsNames = {
    image: 'New image',
};
export const DEFAULT_STATEMENT_TITLE = 'New statement';
export var LoadState;
(function (LoadState) {
    LoadState["Pending"] = "pending";
    LoadState["Placeholder"] = "placeholder";
    LoadState["Ready"] = "ready";
})(LoadState || (LoadState = {}));
export const getDefaultPrompt = (prompts) => {
    if (!Array.isArray(prompts))
        return null;
    const defaultPrompt = prompts.find((p) => p.default);
    if (defaultPrompt)
        return defaultPrompt;
    return prompts.find((p) => p.initial);
};
export const getCombinedPromptsPayload = (state, promptType, promptsToUpdate) => {
    const prompts = selectPrompts(state);
    const combinedPrompts = {
        templatize: [...prompts.templatize],
        classify: [...prompts.classify],
        actionHintLogic: [...prompts.actionHintLogic],
        classifyImage: [...prompts.classifyImage],
        [promptType]: promptsToUpdate,
    };
    return combinedPrompts;
};
export const createNewStatement = (data) => {
    const newStatementDefaults = {
        description: '',
        name: statementsNames[data.type] || DEFAULT_STATEMENT_TITLE,
        variables: [],
        text: '',
        nameStatus: LoadState.Placeholder,
        last_statement: true,
        isImageReady: undefined,
    };
    if (data.type === 'image') {
        newStatementDefaults.isImageReady = true;
    }
    return {
        ...newStatementDefaults,
        ...data,
    };
};
export const updateSectionField = ({ state, id, newValues, }) => {
    if (!state.data) {
        console.warn('Unable to update section field before establishing template data');
        return;
    }
    state.data.sections = state.data.sections.map((section) => {
        if (section.id === id) {
            return {
                ...section,
                ...newValues,
            };
        }
        return section;
    });
};
export const updateStatementField = ({ state, id, newValues, updateAll, }) => {
    if (!state.data) {
        console.error('Unable to update statement field before establishing template data');
        return;
    }
    state.data.sections = state.data.sections.map((section) => ({
        ...section,
        statements: section.statements.map((statement) => ({
            ...statement,
            ...((updateAll || statement.id === id) && newValues),
        })),
    }));
};
export const updatePromptFields = ({ state, prompts }) => {
    state.prompts = {
        ...state.prompts,
        ...prompts,
    };
};
//# sourceMappingURL=helpers.js.map