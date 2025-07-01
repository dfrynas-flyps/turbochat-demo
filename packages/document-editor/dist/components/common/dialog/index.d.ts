import { FC, MouseEvent } from 'react';
export declare enum CloseIconVariant {
    default = "default",
    black = "black"
}
export declare const IconClose: FC<{
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
    top?: string;
    right?: string;
    position?: string;
    size?: number;
    padding?: string;
    variant?: CloseIconVariant;
    buttonSize?: 'small' | 'medium' | 'large';
}>;
export declare const Dialog: {
    PaperWrapper: import("@emotion/styled").StyledComponent<import("@mui/material").DialogProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
        minHeightPx?: string;
        maxWidthPx?: string;
        overflowX?: string;
        overflowY?: string;
        fullHeight?: boolean;
    }, {}, {}>;
    ContentWrapper: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
        width?: string;
    }, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    Content: import("@emotion/styled").StyledComponent<import("@mui/material").DialogContentProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    Title: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}>;
    Description: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    Footer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    StickyFooter: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    CancelButton: import("@emotion/styled").StyledComponent<import("@mui/material").ButtonOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
        ref?: ((instance: HTMLButtonElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLButtonElement> | null | undefined;
    }, "loading" | "style" | "disableElevation" | "disabled" | "fullWidth" | "startIcon" | "endIcon" | "loadingIndicator" | "className" | "classes" | "action" | "centerRipple" | "children" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "sx" | "tabIndex" | "TouchRippleProps" | "touchRippleRef" | "color" | "disableFocusRipple" | "href" | "loadingPosition" | "size" | "variant"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    InputLabel: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, {}>;
    TextInput: import("@emotion/styled").StyledComponent<{
        variant?: import("@mui/material").TextFieldVariants | undefined;
    } & Omit<import("@mui/material").OutlinedTextFieldProps | import("@mui/material").FilledTextFieldProps | import("@mui/material").StandardTextFieldProps, "variant"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    StepIndicator: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
};
//# sourceMappingURL=index.d.ts.map