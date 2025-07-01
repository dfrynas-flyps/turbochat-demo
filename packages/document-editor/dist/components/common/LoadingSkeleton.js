import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentLoader from 'react-content-loader';
import { Dialog } from './dialog';
export const BoxLoading = styled(({ 
// delay,
// itemsCount = 5,
// animationDuration = '1s',
// height,
// padding,
// border,
...rest }) => _jsx(Box, { ...rest })) `
  width: 100%;
  padding: ${({ padding }) => padding || '15px 30px'};
  border-radius: 8px;
  border: ${({ theme, border }) => border || `1px solid ${theme.palette.grey[100]};`};
  animation-duration: ${({ animationDuration = '1s' }) => animationDuration};
  animation-name: changewidth;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: ${({ delay, itemsCount = 5 }) => `${delay / itemsCount}s`};
  @keyframes changewidth {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.1;
    }
  }
  > .fill {
    width: 100%;
    height: ${({ height }) => height || '40px'};
    background: #f1f2f3;
  }
`;
export const LoadingBar = styled(Box)(() => ({
    backgroundColor: '#F1F2F3',
}));
export const TableLoader = (props) => {
    const { gap = 3, amount = 4, header = 17, height = 28 } = props;
    return (_jsx(Box, { ...props, children: _jsxs(ContentLoader, { uniqueKey: "table-loader", title: "table-loader", viewBox: `0 0 380 ${header + height * amount + gap * amount}`, style: { padding: '0' }, children: [_jsx("rect", { x: "0", y: 0, rx: "6", ry: "6", width: "100%", height: header }), _jsx("rect", { x: "0", y: header + gap, rx: "6", ry: "6", width: "100%", height: height }), _jsx("rect", { x: "0", y: header + height + gap * 2, rx: "6", ry: "6", width: "100%", height: height }), _jsx("rect", { x: "0", y: header + height * 2 + gap * 3, rx: "6", ry: "6", width: "100%", height: height }), _jsx("rect", { x: "0", y: header + height * 3 + gap * 4, rx: "6", ry: "6", width: "100%", height: height })] }) }));
};
export const DocumentsGridLoader = (props) => {
    const { gap = 20, amount = 16, height = 272, gridSx } = props;
    const array = Array(amount)
        .fill(1)
        .map((_, i) => i);
    return (_jsx(Box, { sx: {
            display: 'grid',
            gap: `${gap}px`,
            ...(gridSx
                ? gridSx
                : {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    '@media (min-width: 1200px)': {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                    },
                    '@media (min-width: 1600px)': {
                        gridTemplateColumns: 'repeat(5, 1fr)',
                    },
                    '@media (min-width: 1920px)': {
                        gridTemplateColumns: 'repeat(6, 1fr)',
                    },
                }),
        }, children: array.map((x) => {
            return (_jsx(Box, { sx: { width: '100%', height: `${height}px` }, children: _jsx(LoadingBar, { width: '100%', height: '100%', borderRadius: "6px" }) }, x));
        }) }));
};
export const ButtonLoader = () => (_jsx(BoxLoading, { border: 'none', maxWidth: "max-content", delay: 0, padding: '0', children: _jsx(LoadingBar, { width: "140px", height: "32px", borderRadius: "6px" }) }));
export const SelectApplicableUnitsMapLoader = () => {
    return (_jsx(Box, { sx: { height: '70vh', borderRadius: '10px' }, children: _jsx(ContentLoader, { uniqueKey: "selectApplicableUnitsMapLoader", "data-testid": "selectApplicableUnitsMapLoader", style: { width: '100%', height: '100%' }, children: _jsx("rect", { x: "0", y: "0", height: "100vw", width: "100%" }) }) }));
};
export const DialogFooterLoader = () => {
    return (_jsxs(Dialog.Footer, { children: [_jsx(ButtonLoader, {}), _jsx(ButtonLoader, {})] }));
};
//# sourceMappingURL=LoadingSkeleton.js.map