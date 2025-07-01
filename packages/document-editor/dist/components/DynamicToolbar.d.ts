import { Editor as CoreEditor } from '@tiptap/core';
import { Editor as ReactEditor } from '@tiptap/react';
import { SxProps } from '@mui/material';
import { IndentLevelFeature } from '../hooks/useIndentLevel';
type Editor = CoreEditor | ReactEditor;
type ButtonTypes = 'bold' | 'italic' | 'underline' | 'orderedList' | 'unorderedList' | 'justify' | 'table' | 'undo' | 'redo' | 'link';
type ToolbarProps = {
    children?: React.ReactNode;
    editor: Editor | null;
    background?: string;
    handleAddTable?: () => void;
    handleUnorderedListToggle?: () => void;
    handleOrderedListToggle?: () => void;
    handleAddImage?: (url: string) => void;
    handleTrackToolbarEvent?: (eventDef: {
        action: string;
        action_details: string;
    }) => void;
    sx?: SxProps;
    disabledActions?: ButtonTypes[];
    isUnorderedListActive?: boolean;
    isOrderedListActive?: boolean;
    isOpen: boolean;
    indentFeature?: IndentLevelFeature;
};
declare const DynamicToolbar: import("react").ForwardRefExoticComponent<ToolbarProps & import("react").RefAttributes<HTMLDivElement | null>>;
export default DynamicToolbar;
export declare const Divider: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const Button: import("@emotion/styled").StyledComponent<import("@mui/material").IconButtonOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLButtonElement> | null | undefined;
}, "loading" | "style" | "disabled" | "loadingIndicator" | "className" | "classes" | "action" | "centerRipple" | "children" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "sx" | "tabIndex" | "TouchRippleProps" | "touchRippleRef" | "color" | "disableFocusRipple" | "size" | "edge"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    isActive?: boolean;
    disabled?: boolean;
}, {}, {}>;
//# sourceMappingURL=DynamicToolbar.d.ts.map