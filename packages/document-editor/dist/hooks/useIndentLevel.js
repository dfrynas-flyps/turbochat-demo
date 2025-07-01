import { useCallback, useMemo } from 'react';
import { getParagraphStatementIds } from '../helpers/getParagraphStatementIds';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setIndentLevel as setIndentLevelAction } from '../redux';
import { selectData } from '../redux/selectors';
import { StatementTypes, isListStatement } from '../types/editor';
export const INDENT_LEVEL_PX = 20;
export const MAX_INDENT_LEVEL = 4;
// this is necessary because list statements coming from AI BE have a minimum indent level of 1
export const getMinimumIndentLevel = (statement) => {
    switch (statement?.type) {
        case StatementTypes.TEXT:
            return 0;
        case StatementTypes.ORDERED_LIST:
        case StatementTypes.UNORDERED_LIST:
            return 1;
        default:
            return 0;
    }
};
export const useIndentLevel = (statement) => {
    const dispatch = useAppDispatch();
    const templateData = useAppSelector(selectData);
    const minimumIndentLevel = useMemo(() => {
        return getMinimumIndentLevel(statement);
    }, [statement]);
    const currentIndentLevel = useMemo(() => {
        return Math.max(statement?.indent_level ?? 0, minimumIndentLevel);
    }, [minimumIndentLevel, statement?.indent_level]);
    const isIndentable = useMemo(() => {
        return isListStatement(statement) || statement?.type === StatementTypes.TEXT;
    }, [statement]);
    const canIncreaseIndent = useMemo(() => {
        if (!isIndentable) {
            return false;
        }
        return currentIndentLevel < MAX_INDENT_LEVEL;
    }, [currentIndentLevel, isIndentable]);
    const canDecreaseIndent = useMemo(() => {
        if (!isIndentable) {
            return false;
        }
        return currentIndentLevel > minimumIndentLevel;
    }, [currentIndentLevel, isIndentable, minimumIndentLevel]);
    const indentLevelInPx = useMemo(() => {
        if (!isIndentable) {
            return 0;
        }
        return currentIndentLevel * INDENT_LEVEL_PX;
    }, [currentIndentLevel, isIndentable]);
    const setIndentLevel = useCallback((indentLevel) => {
        const relevantStatementIds = getParagraphStatementIds(statement.id, templateData);
        for (const statementId of relevantStatementIds) {
            dispatch(setIndentLevelAction({
                statementId,
                indentLevel,
            }));
        }
    }, [dispatch, statement?.id, templateData]);
    const increaseIndent = useCallback(() => {
        if (!canIncreaseIndent) {
            return;
        }
        setIndentLevel(currentIndentLevel + 1);
    }, [canIncreaseIndent, currentIndentLevel, setIndentLevel]);
    const decreaseIndent = useCallback(() => {
        if (!canDecreaseIndent) {
            return;
        }
        setIndentLevel(currentIndentLevel - 1);
    }, [canDecreaseIndent, currentIndentLevel, setIndentLevel]);
    return {
        isIndentable,
        canIncreaseIndent,
        canDecreaseIndent,
        indentLevelInPx,
        increaseIndent,
        decreaseIndent,
        setIndentLevel,
    };
};
//# sourceMappingURL=useIndentLevel.js.map