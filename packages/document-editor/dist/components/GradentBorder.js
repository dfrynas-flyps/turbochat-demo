import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
export const GradientBorder = ({ children, borderSize = '1px', borderRadius = '0px', gradient = 'linear-gradient(107.77deg, #FA958E 14.09%, #87ACFB 49.41%, #FFD599 83.46%)', backgroundColor = '#FFF', ...props }) => {
    return (_jsx(Box, { sx: { borderRadius: borderRadius, background: gradient, padding: borderSize }, children: _jsx(Box, { sx: { borderRadius: `calc(${borderRadius} - 1px)`, background: backgroundColor }, children: _jsx(Box, { ...props, children: children }) }) }));
};
//# sourceMappingURL=GradentBorder.js.map