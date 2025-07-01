import { TemplateStatement } from '../types/editor';
import { ActionNames } from '../types/editor';
type ActionType = {
    key: ActionNames;
    text: string;
    priority: number;
    isVisible: (statement?: TemplateStatement) => boolean;
    hint: string;
    danger?: boolean;
    divider?: boolean;
    applyAction: () => void;
};
type UseStatementProposedActionArgs = {
    statement: TemplateStatement;
};
export declare const useStatementProposedAction: ({ statement }: UseStatementProposedActionArgs) => {
    proposedAction: ActionType;
    actions: ActionType[];
};
export {};
//# sourceMappingURL=useStatementProposedAction.d.ts.map