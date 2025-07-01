import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
const StatementHistoryContext = createContext({});
const STORAGE_KEY = 'StatementHistoryManager';
/**
 * I created this manager to keep a short track of TemplateStatement state updates,
 * because I needed a convenient way to roll-back to a previous state.
 *
 * In the future though, it could be adapted to be more sophisticated than that.
 */
export const StatementHistoryManager = ({ children }) => {
    const [statementHistory, setStatementHistory] = useLocalStorage(STORAGE_KEY, {});
    const addEntry = useCallback((statementId, newEntry) => {
        setStatementHistory((prevHistory) => {
            const previousEntries = prevHistory[statementId] ?? [];
            return {
                ...prevHistory,
                [statementId]: [newEntry, ...previousEntries],
            };
        });
    }, [setStatementHistory]);
    const getLatestEntry = useCallback((statementId) => {
        const allEntries = statementHistory[statementId] ?? [];
        return allEntries[0] ?? null;
    }, [statementHistory]);
    const deleteLatestEntry = useCallback((statementId) => {
        setStatementHistory((prevHistory) => {
            return {
                ...prevHistory,
                [statementId]: prevHistory[statementId].slice(1),
            };
        });
    }, [setStatementHistory]);
    return (_jsx(StatementHistoryContext.Provider, { value: {
            addEntry,
            getLatestEntry,
            deleteLatestEntry,
        }, children: children }));
};
export const useStatementHistoryManager = () => {
    const context = useContext(StatementHistoryContext);
    if (!context) {
        throw new Error('`useStatementHistoryManager` must be used within StatementHistoryContext');
    }
    return context;
};
//# sourceMappingURL=StatementHistoryManager.js.map