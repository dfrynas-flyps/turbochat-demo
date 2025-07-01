import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NestedMenuItem } from 'mui-nested-menu';
import { excludeProps } from '../../styles/utils';
import { StyledMoreVertIcon } from '../icons/MoreVertIcon';
const CommonExpandableMenu = (props) => {
    const { renderContent, 
    // transformPosition,
    anchorRight, transformRight = true, renderTrigger, 
    // btnClass,
    // iconSize,
    iconBackground, disableRipple, icon, handleCloseEffects, disableScrollLock, forceOpen, MenuProps = {}, extraButtonProps, } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl !== null;
    const defaultTriggerRef = useRef(null);
    useEffect(() => {
        if (forceOpen) {
            setAnchorEl(defaultTriggerRef?.current || null);
        }
    }, [forceOpen]);
    const onClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
        if (handleCloseEffects) {
            handleCloseEffects();
        }
    };
    // todo
    const onClose = (event) => {
        event?.stopPropagation();
        event?.preventDefault();
        closeMenu();
    };
    return (_jsxs(_Fragment, { children: [renderTrigger ? (renderTrigger(onClick, anchorEl !== null)) : (_jsx(IconButton, { onClick: onClick, 
                // todo
                /* className={clsx(classes.openButton, {
                  [classes[btnClass]]: btnClass,
                  [classes.isOpen]: open,
                  [classes[iconSize]]: iconSize,
                })} */
                sx: { background: iconBackground || 'transparent' }, disableFocusRipple: disableRipple, disableRipple: disableRipple, ref: defaultTriggerRef, "data-menu-open": open, ...(extraButtonProps ?? {}), children: icon || _jsx(StyledMoreVertIcon, {}) })), _jsx(Menu, { open: open, anchorEl: anchorEl, onClose: () => onClose(), disableScrollLock: disableScrollLock, 
                // todo
                // classes={{
                //   root: clsx(classes.menuPaper, transformPosition ? classes.transformPosition : null),
                //   paper: classes.menuPaper,
                // }}
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: anchorRight ? 'right' : 'left',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: transformRight ? 'right' : 'left',
                }, ...MenuProps, children: renderContent(onClose, closeMenu) })] }));
};
export const CommonMenu = {
    Item: styled(MenuItem, {
        shouldForwardProp: excludeProps(['danger', 'greyed', 'withBigSpacing']),
    })(({ theme, danger, withBigSpacing, grayed, customItemStyles }) => ({
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '400',
        justifyContent: 'flex-start',
        gap: '1rem',
        ...customItemStyles,
        ...(danger && {
            color: theme.palette.error[600],
        }),
        ...(grayed && {
            color: theme.palette.grey[600],
        }),
        ...(withBigSpacing && {
            padding: '10px 12px',
            '&:not(:last-of-type)': {
                marginBottom: '8px',
            },
        }),
        '&.Mui-selected': {
            backgroundColor: theme.palette.grey[75],
            display: 'flex',
            justifyContent: 'space-between',
        },
    })),
    NestedItem: styled(NestedMenuItem)(({ theme }) => ({
        margin: '4px 8px',
        borderRadius: '6px',
        p: {
            fontSize: '14px',
            color: theme.palette.grey[900],
        },
    })),
    ItemText: styled('span', { shouldForwardProp: excludeProps(['greyed', 'small']) })(({ theme, greyed, small }) => ({
        fontSize: '14px',
        ...(greyed && {
            color: theme.palette.grey[600],
        }),
        ...(small && {
            fontSize: '12px',
        }),
    })),
    Divider: styled('hr')(({ theme }) => ({
        margin: '8px 0',
        border: 0,
        borderBottom: '1px solid ' + theme.palette.grey[100],
    })),
};
export default CommonExpandableMenu;
//# sourceMappingURL=ExpandableMenu.js.map