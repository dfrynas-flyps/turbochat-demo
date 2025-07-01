import React from 'react';
import { SxProps } from '@mui/material/styles';
export declare const BoxLoading: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & {
    component?: React.ElementType;
} & {
    delay: number;
    itemsCount?: number;
    animationDuration?: string;
    height?: string;
    padding?: string;
    border?: string;
} & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const LoadingBar: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const TableLoader: (props: {
    sx?: SxProps;
    gap?: number;
    height?: number;
    header?: number;
    amount?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DocumentsGridLoader: (props: {
    gap?: number;
    height?: number;
    amount?: number;
    gridSx?: SxProps;
}) => import("react/jsx-runtime").JSX.Element;
export declare const ButtonLoader: () => import("react/jsx-runtime").JSX.Element;
export declare const SelectApplicableUnitsMapLoader: () => import("react/jsx-runtime").JSX.Element;
export declare const DialogFooterLoader: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoadingSkeleton.d.ts.map