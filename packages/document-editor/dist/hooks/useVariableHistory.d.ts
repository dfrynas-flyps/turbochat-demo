import { VariableHistoryEntry, VariableHistoryEntryAuthorType } from '../types/editor';
export declare const useVariableHistory: () => {
    createNewEntry: (value: string, authorType: VariableHistoryEntryAuthorType) => VariableHistoryEntry;
    addVariableHistoryEntry: (variableName: string, newValue: string, authorType: VariableHistoryEntryAuthorType) => void;
    resetVariableHistory: (variableName: string, newValue: string, authorType: VariableHistoryEntryAuthorType) => void;
};
//# sourceMappingURL=useVariableHistory.d.ts.map