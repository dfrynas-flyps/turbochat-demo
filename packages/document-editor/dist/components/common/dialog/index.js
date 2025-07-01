import { jsx as _jsx } from "react/jsx-runtime";
import { Button, DialogContent, IconButton, Dialog as MuiDialog, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
export var CloseIconVariant;
(function (CloseIconVariant) {
    CloseIconVariant["default"] = "default";
    CloseIconVariant["black"] = "black";
})(CloseIconVariant || (CloseIconVariant = {}));
export const IconClose = ({ onClick, top = '10px', right = '10px', position = 'absolute', size = 24, padding, variant = CloseIconVariant.default, buttonSize = 'medium', }) => (_jsx(IconButton, { "aria-label": "close", sx: {
        position,
        right,
        top,
        cursor: 'pointer',
        zIndex: 10,
        ...(padding ? { padding: padding } : {}),
        ...(variant === CloseIconVariant.black && { backgroundColor: 'black' }),
    }, onClick: (e) => {
        e.stopPropagation();
        onClick(e);
    }, size: buttonSize, children: _jsx("img", { height: size, width: size, src: `/static/icons/${variant === CloseIconVariant.black ? 'Cross-White.svg' : 'Cross.svg'}`, alt: "Cross icon to close popup", style: { display: 'block' } }) }));
export const Dialog = {
    PaperWrapper: styled(MuiDialog, {
        shouldForwardProp: (p) => !['minHeightPx', 'maxWidthPx', 'overflowX', 'overflowY', 'fullHeight'].includes(p),
    })(({ minHeightPx, maxWidthPx, overflowX, overflowY, fullHeight }) => ({
        '& .MuiPaper-root': {
            borderRadius: '16px',
            boxShadow: 'none',
            ...(maxWidthPx && { maxWidth: maxWidthPx }),
            ...(minHeightPx && { minHeight: minHeightPx }),
            ...(overflowX && { overflowX }),
            ...(overflowY && { overflowY }),
            ...(fullHeight && { height: '100%' }),
        },
    })),
    ContentWrapper: styled('div', { shouldForwardProp: (prop) => prop !== 'width' })(({ theme, width }) => {
        return {
            width: '95%',
            padding: '15px 24px',
            [theme.breakpoints.up('md')]: {
                width: width || '588px',
            },
        };
    }),
    Content: styled(DialogContent)(() => {
        return {
            padding: '15px 24px',
        };
    }),
    Title: styled('h1') `
    color: ${({ theme }) => theme.palette.grey[900]};
    font-size: 20px;
    margin: 5px 0 0;
  `,
    Description: styled('div')(({ theme }) => ({
        color: theme.palette.grey[600],
        lineHeight: '20px',
        fontWeight: '400',
        fontSize: '14px',
        marginTop: '8px',
        marginBottom: '24px',
    })),
    Footer: styled('div')(() => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '30px',
    })),
    StickyFooter: styled('div')(() => ({
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '30px',
        padding: '15px 24px',
        zIndex: 1000,
        backgroundColor: '#fff',
    })),
    CancelButton: styled(Button)(() => ({
        marginRight: 'auto',
    })),
    InputLabel: styled('label')(() => ({
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        marginTop: '24px',
        span: {
            marginBottom: '0.3rem',
        },
        '.MuiFormControl-root': {
            backgroundColor: 'transparent',
        },
    })),
    TextInput: styled(TextField)(() => ({
        'input, textarea': {
            fontSize: '14px',
        },
    })),
    StepIndicator: styled('span')(({ theme }) => ({
        fontSize: '14px',
        color: theme.palette.grey[600],
    })),
};
//# sourceMappingURL=index.js.map