import { jsx as _jsx } from "react/jsx-runtime";
import { Box, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const ProcessingOverlay = () => {
    return (_jsx(Overlay, { children: _jsx(CircularProgress, {}) }));
};
const Overlay = styled(Box)(() => ({
    zIndex: 10000,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.25)',
}));
export default ProcessingOverlay;
//# sourceMappingURL=ProcessingOverlay.js.map