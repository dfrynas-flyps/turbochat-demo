import { HeaderFieldState } from '../types/editor';
type HeaderFieldProps = {
    field: HeaderFieldState;
    isHeaderActive: boolean;
    isLast: boolean;
    onResize: (event: React.MouseEvent<HTMLDivElement>, fieldId: string) => void;
    onRemoveField: (fieldId: string) => void;
    onInput: (event: React.ChangeEvent<HTMLTextAreaElement>, fieldId: string) => void;
    isFieldActive: boolean;
    onActivate: (fieldId: string) => void;
};
export declare const HeaderField: ({ field, isHeaderActive, isLast, onResize, onRemoveField, onInput, isFieldActive, onActivate, }: HeaderFieldProps) => import("react/jsx-runtime").JSX.Element;
export declare const StyledField: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    isHeaderActive?: boolean;
    isFieldActive?: boolean;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export {};
//# sourceMappingURL=HeaderField.d.ts.map