import { jsx as _jsx } from "react/jsx-runtime";
import { Box, ListItem, ListItemButton, ListItemText, Popover, Tooltip, Typography, } from '@mui/material';
import { styled } from '@mui/material/styles';
export const StyledPopover = styled(Popover)(() => ({
    // long selector to make sure we override global defaults
    '&.MuiPopover-root > .MuiPopover-paper': {
        boxShadow: `0px 20px 40px 0px #00071A14`,
        width: '309px',
    },
}));
export const PopoverContent = styled('div')(() => ({
    padding: 8,
}));
export const StyledTooltip = styled(({ className, ...props }) => (_jsx(Tooltip, { ...props, classes: { popper: className } })))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: `0px 32px 64px 0px #00000014`,
        fontSize: 14,
        padding: 32,
        maxWidth: 400,
        borderRadius: 8,
        border: `1px solid ${theme.palette.grey[200]}`,
    },
    '& .MuiTooltip-arrow': {
        color: theme.palette.common.white,
    },
}));
export const IconBackground = styled('div')(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: 4,
    background: theme.palette.grey[75],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
export const StyledListItemText = styled(ListItemText)(() => ({
    '& .MuiListItemText-primary': {
        fontSize: 14,
    },
    '& .MuiListItemText-secondary': {
        fontSize: 12,
    },
}));
export const StyledListItemButton = styled(ListItemButton)(() => ({
    height: 64,
    gap: 12,
    padding: 12,
}));
export const StyledListItem = styled(ListItem)(() => ({
    height: 64,
    gap: 12,
    padding: 12,
}));
export const TypographyWrapper = styled('div')(({ theme }) => ({
    paddingTop: `7px`,
    paddingLeft: '15px',
    height: `40px`,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: `10px`,
    fontSize: `12px`,
    color: theme.palette.grey[600],
}));
export const TooltipContentWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
}));
export const TooltipTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 14,
    marginBottom: theme.spacing(1),
    color: `#0C0D0E`,
}));
export const AutocompleteOption = styled(Box, {
    shouldForwardProp: (prop) => !['isRecommended'].includes(prop),
})(({ isRecommended }) => ({
    cursor: 'pointer',
    margin: '0 8px',
    display: 'flex',
    padding: '7px 6px 7px 8px',
    borderRadius: '6px',
    background: isRecommended ? `linear-gradient(92.06deg, #FFEFEE -13.42%, #E5EEFF 47%, #FFF7EC 107.42%)` : 'none',
    fontSize: '14px',
    '& .info': {
        transition: 'opacity .1s',
        opacity: 0,
        marginTop: 'auto',
        svg: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: '1px',
        },
    },
    '&:hover .info': {
        opacity: 1,
    },
}));
export const OriginalTextButton = styled(StyledListItemButton)(() => ({
    marginTop: '8px',
    padding: '8px 16px',
    display: 'block',
    height: 'auto',
}));
export const OriginalTextButtonCaption = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[600],
    fontSize: '12px',
}));
export const OriginalTextButtonContent = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[900],
    fontSize: '14px',
}));
//# sourceMappingURL=VariableAiOptionsMenu.styled.js.map