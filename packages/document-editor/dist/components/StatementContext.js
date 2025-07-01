import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useMemo } from 'react';
import { useAppSelector } from '../hooks/redux';
import { selectActiveStatement } from '../redux/selectors';
const StatementContext = React.createContext({});
export const StatementContextProvider = ({ statement, statementIndex, children, }) => {
    const activeStatement = useAppSelector(selectActiveStatement);
    const isStatementActive = useMemo(() => {
        return activeStatement?.id === statement.id;
    }, [activeStatement, statement]);
    return (_jsx(StatementContext.Provider, { value: { statement, statementIndex, isStatementActive }, children: children }));
};
export const useStatementContext = () => {
    const context = useContext(StatementContext);
    if (!context) {
        throw new Error('useStatementContext must be used within StatementContext');
    }
    return context;
};
//# sourceMappingURL=StatementContext.js.map