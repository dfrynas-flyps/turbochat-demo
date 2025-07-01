import { RootState } from '../redux/store';
import type { Prompt, PromptTypes, SavableTemplatePrompts, StatementTypes, TemplateSection, TemplateStatement } from '../types/editor';
import type { TemplateState } from './types';
export declare const DEFAULT_STATEMENT_TITLE = "New statement";
export declare enum LoadState {
    Pending = "pending",
    Placeholder = "placeholder",
    Ready = "ready"
}
export declare const getDefaultPrompt: (prompts: Prompt[] | null) => Prompt | null | undefined;
export declare const getCombinedPromptsPayload: (state: RootState, promptType: PromptTypes, promptsToUpdate: Prompt[]) => Record<PromptTypes, Prompt[]>;
export declare const createNewStatement: (data: Partial<TemplateStatement> & {
    id: TemplateStatement["id"];
    type: StatementTypes;
}) => TemplateStatement;
export declare const updateSectionField: ({ state, id, newValues, }: {
    state: TemplateState;
    id: string;
    newValues: Partial<TemplateSection>;
}) => void;
export declare const updateStatementField: ({ state, id, newValues, updateAll, }: {
    state: TemplateState;
    id: string;
    newValues: Record<string, unknown>;
    updateAll?: boolean;
}) => void;
export declare const updatePromptFields: ({ state, prompts }: {
    state: TemplateState;
    prompts: SavableTemplatePrompts;
}) => void;
//# sourceMappingURL=helpers.d.ts.map