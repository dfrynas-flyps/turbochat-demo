import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStatementProposedAction } from '../../hooks/useStatementProposedAction';
import { SmallButton } from '../common/Button';
import { Dialog, IconClose } from '../common/dialog/index';
import { getClassificationContent } from './ClassificationMapping';
const ClassificationDetails = ({ handleClose, statement, statementText, }) => {
    const { proposedAction } = useStatementProposedAction({ statement });
    if (!statement.classification) {
        return null;
    }
    const { classification: name, hint, patterns, applies } = statement.classification;
    const content = getClassificationContent(name);
    return (_jsxs(Dialog.PaperWrapper, { "data-editor-inner-click-marker": true, onClose: handleClose, open: true, maxWidth: false, children: [_jsx(IconClose, { onClick: handleClose }), _jsxs(Dialog.ContentWrapper, { width: "710px", children: [_jsx(Title, { children: "Statement hint" }), _jsx(Text, { children: "Review the statement hints below and decide on the suggested action." }), statement.turnOffVariables && (_jsx(StyledAlert, { severity: "info", variant: "outlined", children: "Variables have been turned-off." })), _jsx(StatementText, { dangerouslySetInnerHTML: { __html: statementText }, margin: "0 0 24px" }), _jsx(TableContainer, { component: "div", children: _jsxs(StyledTable, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Hint" }), _jsx(TableCell, { children: "Description" })] }) }), _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsxs(HintCell, { children: ["Classification: ", _jsx(ColoredData, { color: "primary", children: name })] }), _jsx(TableCell, { children: content.text('statement', name) })] }), _jsxs(TableRow, { children: [_jsxs(HintCell, { children: ["Applies: ", _jsx(ColoredData, { color: "info", children: applies })] }), _jsxs(TableCell, { children: ["Likely only applies to ", applies, "/10 projects."] })] }), _jsxs(TableRow, { children: [_jsxs(HintCell, { children: ["Patterns: ", _jsx(ColoredData, { color: "error", children: patterns || 'None' })] }), _jsx(TableCell, { children: "\u2014" })] }), _jsxs(TableRow, { children: [_jsxs(HintCell, { children: ["Action hint: ", _jsx(ColoredData, { color: "success", children: hint.join(', ') })] }), _jsx(TableCell, { children: proposedAction.hint })] })] })] }) }), _jsxs(Dialog.Footer, { children: [_jsx(Button, { onClick: handleClose, children: "Close" }), proposedAction?.applyAction && (_jsx(SmallButton, { onClick: () => proposedAction.applyAction(), children: proposedAction.text }))] })] })] }));
};
export default ClassificationDetails;
const Title = styled(Dialog.Title)(() => ({
    fontSize: '20px',
    fontWeight: '600',
}));
const Text = styled('p')(({ theme }) => ({
    color: theme.palette.grey[600],
    fontSize: '14px',
    lineHeight: '20px',
    margin: '8px 0 24px',
}));
export const StatementText = styled('div', { shouldForwardProp: (prop) => prop !== 'margin' })(({ theme, margin }) => ({
    backgroundColor: theme.palette.grey[50],
    borderRadius: '8px',
    padding: '24px',
    margin,
    fontSize: '14px',
    lineHeight: '20px',
    '& span.variable-preview': {
        backgroundColor: 'transparent',
        color: theme.palette.grey[500],
        borderBottom: `1px solid ${theme.palette.grey[500]}`,
    },
}));
const StyledTable = styled(Table)(({ theme }) => ({
    '& th': {
        fontWeight: 500,
        fontSize: '12px',
        color: theme.palette.grey[500],
        textTransform: 'uppercase',
        padding: '12px 0',
    },
    '& td': {
        padding: '14px 0',
    },
}));
const HintCell = styled(TableCell)(() => ({
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: '13px',
    fontWeight: 500,
}));
const StyledAlert = styled(Alert)(() => ({
    fontSize: '12px',
    lineHeight: '20px',
    marginBottom: '24px',
    '&.MuiPaper-root': {
        borderRadius: '6px',
    },
}));
export const ColoredData = styled('span')(({ theme, color }) => ({
    color: theme.palette[color]?.['500'] || theme.palette[color]?.main || 'inherit',
}));
//# sourceMappingURL=ClassificationDetails.js.map