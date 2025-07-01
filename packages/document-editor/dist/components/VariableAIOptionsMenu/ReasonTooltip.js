import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import InfoCircle from '../icons/InfoCircle';
import { StyledTooltip, TooltipContentWrapper, TooltipTitle } from './VariableAiOptionsMenu.styled';
const ReasonTooltip = ({ children }) => {
    return (_jsx(StyledTooltip, { title: _jsx(TooltipContentWrapper, { children: _jsxs("div", { children: [_jsx(TooltipTitle, { children: "Reason" }), _jsx(Typography, { variant: "body2", children: children })] }) }), placement: "left-start", slotProps: { popper: { modifiers: [{ name: 'offset', options: { offset: [20, -5] } }] } }, children: _jsx(Box, { children: _jsx(InfoCircle, { color: "#72767D", size: "18" }) }) }));
};
export default ReasonTooltip;
//# sourceMappingURL=ReasonTooltip.js.map