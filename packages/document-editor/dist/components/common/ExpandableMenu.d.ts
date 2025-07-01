import React, { ReactNode, CSSProperties } from 'react';
import { MenuProps } from '@mui/material';
export interface CommonExpandableMenuProps {
    renderContent: (onClose: (event?: Event) => void, closeMenu: () => void) => React.ReactNode;
    transformPosition?: boolean;
    anchorRight?: boolean;
    transformRight?: boolean;
    renderTrigger?: (onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, isOpen: boolean) => ReactNode;
    buttonTrigger?: ReactNode;
    btnClass?: string;
    iconSize?: 'small' | 'medium' | 'tiny';
    iconBackground?: string;
    disableRipple?: boolean;
    icon?: ReactNode;
    handleCloseEffects?: () => void;
    disableScrollLock?: boolean;
    forceOpen?: boolean;
    MenuProps?: Partial<MenuProps>;
    extraButtonProps?: Record<string, string | boolean>;
}
declare const CommonExpandableMenu: React.FC<CommonExpandableMenuProps>;
export declare const CommonMenu: {
    Item: import("@emotion/styled").StyledComponent<import("@mui/material").MenuItemOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & {
        ref?: ((instance: HTMLLIElement | null) => void | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | React.RefObject<HTMLLIElement> | null | undefined;
    }, "style" | "disabled" | "className" | "classes" | "action" | "centerRipple" | "children" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "sx" | "tabIndex" | "TouchRippleProps" | "touchRippleRef" | "autoFocus" | "selected" | "dense" | "disableGutters" | "divider"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
        danger?: boolean;
        withBigSpacing?: boolean;
        grayed?: boolean;
        customItemStyles?: CSSProperties;
    }, {}, {}>;
    NestedItem: import("@emotion/styled").StyledComponent<Omit<import("mui-nested-menu").NestedMenuItemProps, "ref"> & React.RefAttributes<HTMLLIElement | null> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    ItemText: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
        greyed?: boolean;
        small?: boolean;
    }, React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
    Divider: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>, {}>;
};
export default CommonExpandableMenu;
//# sourceMappingURL=ExpandableMenu.d.ts.map