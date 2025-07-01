import { TemplateStatement } from '../types/editor';
type StatementHistoryContextType = {
    addEntry: (statementId: TemplateStatement['id'], newEntry: TemplateStatement) => void;
    getLatestEntry: (statementId: TemplateStatement['id']) => TemplateStatement | null;
    deleteLatestEntry: (statementId: TemplateStatement['id']) => void;
};
type StatementHistoryManagerProps = {
    children: React.ReactNode;
};
/**
 * I created this manager to keep a short track of TemplateStatement state updates,
 * because I needed a convenient way to roll-back to a previous state.
 *
 * In the future though, it could be adapted to be more sophisticated than that.
 */
export declare const StatementHistoryManager: React.FC<StatementHistoryManagerProps>;
export declare const useStatementHistoryManager: () => StatementHistoryContextType;
export {};
//# sourceMappingURL=StatementHistoryManager.d.ts.map