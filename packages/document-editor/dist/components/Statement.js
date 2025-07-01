import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useStatementProposedAction } from '../hooks/useStatementProposedAction';
import { formatStatementText } from '../helpers/parseTemplateStatements';
import { setActiveStatement } from '../redux';
import { selectActiveStatement, selectData, selectProjectData, selectVariableRegistry } from '../redux/selectors';
import { StatementTypes, TemplateDataTypes } from '../types/editor';
import Counter from './Counter';
import { LastStatementToggle } from './LastStatementToggle';
import MarkerIcon from './MarkerIcon';
import RichTextEditor from './RichTextEditor';
import { useSectionContext } from './SectionContext';
import Skeleton from './Skeleton';
import { useStatementContext } from './StatementContext';
import { StatementSideActionsMenu } from './StatementSideActionsMenu';
import { Tooltip } from './common/Tooltip';
import { ExclamationMarkIcon } from './icons/ExclamationMarkIcon';
import { getClassificationContent } from './regeneration/ClassificationMapping';
import StatementBottomActionsMenu from './StatementBottomActionsMenu';
const StatementContent = ({ projectData }) => {
    const { statement } = useStatementContext();
    const { isSectionSoftDeleted } = useSectionContext();
    const { section } = useSectionContext();
    const variableRegistry = useAppSelector(selectVariableRegistry);
    if (statement.isRegenerating) {
        return _jsx(Skeleton, { itemsCount: 1 });
    }
    if (statement.isDeleted) {
        const statementContent = formatStatementText({
            statement,
            sectionId: section.id,
            variableRegistry,
            projectData,
            variableOutput: 'decorated',
        });
        return (_jsx(HighlightedStatement, { sectionSoftDeleted: isSectionSoftDeleted, isDeleted: statement.isDeleted, children: parse(statementContent, {
                replace(domNode) {
                    if (domNode.type === 'text') {
                        return _jsx("span", { children: domNode.data });
                    }
                },
            }) }));
    }
    return _jsx(RichTextEditor, {});
};
const Statement = () => {
    const { statement, statementIndex, isStatementActive: isStatementActiveBase } = useStatementContext();
    const activeStatement = useAppSelector(selectActiveStatement);
    const data = useAppSelector(selectData);
    const projectData = useAppSelector(selectProjectData);
    const { isSectionSoftDeleted } = useSectionContext();
    const activeRef = useRef(null);
    const dispatch = useAppDispatch();
    const { classification } = statement;
    const color = classification && getClassificationContent(classification?.classification)?.color;
    const { proposedAction } = useStatementProposedAction({ statement });
    // FIXME: this is a hack for a problem described in TP-3259. The true problem is yet to be solved.
    const [isStatementActive] = useDebounceValue(isStatementActiveBase, 50);
    useEffect(() => {
        if (activeStatement?.navInitiated) {
            activeRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeStatement]);
    useEffect(() => {
        if (data?.type === TemplateDataTypes.TEMPLATE_DOCUMENT) {
            return;
        }
        if (!statement.actionAutoApplied) {
            proposedAction.applyAction();
        }
    }, [data?.type, proposedAction, statement.actionAutoApplied]);
    return (_jsx(StatementOuterWrapper, { children: _jsx(StatementInnerWrapper, { isActiveStatement: isStatementActive, isDeleted: statement.isDeleted, sectionSoftDeleted: isSectionSoftDeleted, onClick: () => {
                if (!isStatementActive) {
                    dispatch(setActiveStatement({ id: statement.id }));
                }
            }, ...(isStatementActive ? { 'data-editor-inner-click-marker': true } : {}), "data-prevent-statement-deactivation": true, children: _jsxs(StyledStatement, { ref: isStatementActive ? activeRef : null, children: [!isStatementActive && statement?.optionalStatement && (_jsx(Tooltip, { placement: "top", title: _jsx("span", { children: "This statement was marked as optional" }), children: _jsx(StyledExclamationMarkIcon, {}) })), _jsxs(EditorWrapper, { isBlock: statement.type !== StatementTypes.TEXT, children: [_jsx(Counter, { main: color?.main || '', light: color?.light || '', isDeleted: Boolean(statement.isDeleted), idx: statementIndex }), _jsx(StatementContent, { projectData: projectData }), _jsx(LastStatementToggle, { statement: statement })] }), isStatementActive && (_jsxs(_Fragment, { children: [_jsx(StatementBottomActionsMenu, { statement: statement }), _jsx(MarkerIcon, { color: color?.main }), _jsx(StatementSideActionsMenu, { statement: statement })] }))] }) }) }));
};
export default Statement;
const StatementOuterWrapper = styled(Box)({
    position: 'relative',
});
const StatementInnerWrapper = styled(Box, {
    shouldForwardProp: (prop) => !['isActiveStatement', 'isDeleted', 'sectionSoftDeleted'].includes(prop),
})(({ theme, background, isActiveStatement, isDeleted, sectionSoftDeleted }) => ({
    borderRadius: '12px',
    padding: '8px 12px',
    margin: '4px 0',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in',
    ...(isActiveStatement && { marginBottom: isDeleted || sectionSoftDeleted ? 0 : '40px' }),
    '&:hover': {
        backgroundColor: background || theme.palette.grey[50],
    },
}));
const StyledStatement = styled(Box)(() => ({
    paddingRight: '32px',
    lineHeight: '40px',
    position: 'relative',
    scrollMarginTop: '40px',
}));
const EditorWrapper = styled('div', {
    shouldForwardProp: (prop) => !['isBlock'].includes(prop),
})(({ isBlock }) => ({
    position: 'relative',
    maxWidth: '100%',
    overflow: 'visible',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'baseline',
    ...(isBlock && {
        alignItems: 'flex-start',
        '& ul': {
            margin: 0,
        },
    }),
}));
const HighlightedStatement = styled('p', {
    shouldForwardProp: (prop) => !['isDeleted', 'sectionSoftDeleted'].includes(prop),
})(({ theme, isDeleted, sectionSoftDeleted }) => ({
    display: 'inline',
    '& span': {
        display: 'inline',
        lineHeight: '24px',
        ...(isDeleted && {
            textDecoration: 'line-through',
        }),
        ...(sectionSoftDeleted && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[600],
        }),
    },
    '& span.variable-preview': {
        display: 'inline-block',
        color: theme.palette.grey[600],
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${theme.palette.grey[600]}`,
        margin: '0 12px',
        ...(sectionSoftDeleted && { borderColor: theme.palette.grey[200] }),
    },
}));
const StyledExclamationMarkIcon = styled(ExclamationMarkIcon)(({ theme }) => ({
    position: 'absolute',
    left: '-26px',
    top: '4px',
    margin: '4px 4px 0 0',
    width: '20px',
    minWidth: '20px',
    height: '28px',
    '& path': {
        fill: theme.palette.warning[500],
    },
}));
//# sourceMappingURL=Statement.js.map