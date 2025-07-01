import React from 'react';
import { TemplateStatement } from '../types/editor';
type StatementContextBase = {
    statement: TemplateStatement;
    statementIndex: number;
};
type StatementContextProps = StatementContextBase & {
    isStatementActive: boolean;
};
type StatementContextProviderProps = StatementContextBase & {
    children: React.ReactNode;
};
export declare const StatementContextProvider: React.FC<StatementContextProviderProps>;
export declare const useStatementContext: () => StatementContextProps;
export {};
//# sourceMappingURL=StatementContext.d.ts.map