import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Box, Divider } from '@mui/material';
import styled from '@mui/material/styles/styled';
import { useBoolean } from 'usehooks-ts';
import { countVariablesInText } from '../helpers/variableRegistry';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useMarkStatementAsTypeover } from '../hooks/useMarkStatementAsTypeover';
import usePrevious from '../hooks/usePrevious';
import { toggleStatementOptional, toggleStatementVariables, typeoverStatement, updateStatement } from '../redux';
import { selectData } from '../redux/selectors';
import { StatementTypes, TemplateDataTypes } from '../types/editor';
import { useStatementHistoryManager } from './StatementHistoryManager';
import { SmallButton } from './common/Button';
import { BoltSlashIcon } from './icons/BoltSlashIcon';
import { CheckMarkIcon } from './icons/CheckMarkIcon';
import { CircleCheckFilledIcon } from './icons/CircleCheckFilledIcon';
import { CircleCheckIcon } from './icons/CircleCheckIcon';
import { ExclamationMarkIcon } from './icons/ExclamationMarkIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import { PenFieldIcon } from './icons/PenFieldIcon';
import { StarIcon } from './icons/StarIcon';
import TrashIcon from './icons/TrashIcon';
const StatementBottomActionsMenu = ({ statement }) => {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    const isTemplatedDocument = data?.type === TemplateDataTypes.TEMPLATE_DOCUMENT;
    const [isWasOptionalBefore, setIsWasOptionalBefore] = useState(statement.optionalStatement);
    const markStatementAsTypeover = useMarkStatementAsTypeover();
    const StatementHistoryManager = useStatementHistoryManager();
    const previousStatementProp = usePrevious(statement);
    const isStatementMarkedAsCompleted = useBoolean(false);
    const handleToggleDelete = () => {
        dispatch(updateStatement({
            id: statement.id,
            updatePayload: {
                isDeleted: !statement.isDeleted,
            },
        }));
        if (isTemplatedDocument && isWasOptionalBefore) {
            dispatch(toggleStatementOptional({
                statementId: statement.id,
                optional: !statement.optionalStatement,
            }));
        }
    };
    const toggleTypeover = () => {
        if (!statement.typeoverMode) {
            StatementHistoryManager.addEntry(statement.id, statement);
            markStatementAsTypeover(statement);
            return;
        }
        const statementBackup = StatementHistoryManager.getLatestEntry(statement.id);
        const typeoverContentChanged = previousStatementProp && statement?.text !== previousStatementProp?.text;
        if (statementBackup && !typeoverContentChanged) {
            // NOTE: This is supposed to cover a case, when user toggles "TypeOver" on and off.
            // We want to have a way to bring back variables.
            dispatch(typeoverStatement({
                id: statement.id,
                typeoverMode: false,
                text: statementBackup.text,
            }));
            StatementHistoryManager.deleteLatestEntry(statement.id);
            return;
        }
        dispatch(typeoverStatement({
            id: statement.id,
            typeoverMode: false,
            text: statement.text,
        }));
    };
    const handleToggleStatementVariables = () => {
        dispatch(toggleStatementVariables({ statementId: statement.id, turnOff: !statement.turnOffVariables }));
    };
    const handleStatementOptional = () => {
        dispatch(toggleStatementOptional({
            statementId: statement.id,
            optional: !statement.optionalStatement,
        }));
    };
    const variablesCount = useMemo(() => {
        return countVariablesInText(statement.text);
    }, [statement.text]);
    if (statement.optionalStatement && isTemplatedDocument) {
        return (_jsxs(ActionsContainer, { children: [_jsxs(OptionalInfo, { children: [_jsx(ExclamationMarkIcon, { width: 17, height: 17 }), _jsx("span", { children: "This statement was marked as optional:" })] }), _jsx(ActionBtn, { startIcon: _jsx(CheckMarkIcon, { height: 12, width: 12 }), onClick: () => {
                        handleStatementOptional();
                        setIsWasOptionalBefore(false);
                    }, children: "Keep in document" }), _jsx(ActionBtn, { isSelected: statement?.isDeleted, startIcon: _jsx(TrashIcon, { width: 12, height: 12, color: "#72767D" }), onClick: handleToggleDelete, children: "Remove" })] }));
    }
    return (_jsxs(Box, { sx: { display: 'flex' }, children: [_jsxs(ActionsContainer, { children: [_jsx("span", { children: "Actions:" }), !isTemplatedDocument && (_jsx(ActionBtn, { isSelected: statement.optionalStatement, startIcon: _jsx(StarIcon, {}), onClick: handleStatementOptional, children: "Optional" })), !statement.typeoverMode && (_jsx(ActionBtn, { isSelected: statement.turnOffVariables, disabled: !variablesCount, startIcon: _jsx(BoltSlashIcon, {}), onClick: handleToggleStatementVariables, children: variablesCount !== 0 ? 'Variables off' : 'No variables found' })), _jsx(ActionBtn, { isSelected: statement.isDeleted, startIcon: _jsx(EyeSlashIcon, {}), onClick: handleToggleDelete, children: "Remove" }), statement.type === StatementTypes.TEXT && (_jsxs(_Fragment, { children: [_jsx(StyledDivider, { orientation: "vertical", variant: "middle", flexItem: true }), _jsx(ActionBtn, { isSelected: statement.typeoverMode, startIcon: _jsx(PenFieldIcon, {}), onClick: toggleTypeover, children: "Typeover" })] }))] }), false && (_jsx(ActionsContainer, { sx: { ml: 'auto', flex: 'initial' }, children: _jsx(ActionBtn, { startIcon: isStatementMarkedAsCompleted.value ? (_jsx(CircleCheckFilledIcon, { color: "#008F3B", width: 14, height: 14 })) : (_jsx(CircleCheckIcon, { color: "#72767D", width: 14, height: 14 })), onClick: isStatementMarkedAsCompleted.toggle, children: isStatementMarkedAsCompleted.value ? 'Marked as completed' : 'Mark as completed' }) }))] }));
};
export default StatementBottomActionsMenu;
const ActionsContainer = styled('div')(({ theme }) => ({
    flex: 1,
    marginTop: '8px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    fontSize: '14px',
    color: theme.palette.grey[600],
}));
const ActionBtn = styled(SmallButton, { shouldForwardProp: (p) => p !== 'isSelected' })(({ theme, isSelected }) => ({
    '&.MuiButton-root': {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1',
        color: theme.palette.grey[600],
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: '4px',
        },
    },
    '&.MuiButton-text': {
        padding: '4px 8px',
        ...(isSelected && {
            backgroundColor: theme.palette.grey[100],
        }),
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
}));
const StyledDivider = styled(Divider)(({ theme }) => ({
    height: '12px',
    margin: '0',
    alignSelf: 'center',
    backgroundColor: theme.palette.grey[200],
}));
const OptionalInfo = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
}));
//# sourceMappingURL=StatementBottomActionsMenu.js.map