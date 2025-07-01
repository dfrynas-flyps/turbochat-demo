import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
export const TopNotification = styled(Box, {
    shouldForwardProp: (p) => !['sticky', 'variant'].includes(p),
})(({ theme, sticky, variant }) => ({
    position: sticky ? 'sticky' : 'initial',
    top: 0,
    display: 'flex',
    background: theme.palette[variant][100],
    color: theme.palette[variant][600],
    padding: '11px 25px',
    fontSize: '14px',
    zIndex: 9999,
    a: {
        textDecoration: 'underline',
    },
}));
export const InlineNotificationButton = styled('button')(() => ({
    padding: 0,
    margin: 0,
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
}));
//# sourceMappingURL=TopNotification.js.map