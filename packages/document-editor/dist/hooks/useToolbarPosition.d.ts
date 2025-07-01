import { Editor } from '@tiptap/core';
import { RefObject } from 'react';
type ToolbarPositionProps = {
    editor: Editor | null;
    toolbarWrapperRef: RefObject<HTMLDivElement>;
};
export type ToolbarPosition = {
    top: number;
    left: number;
};
type UseToolbarPositionReturn = {
    toolbarPosition: ToolbarPosition | null;
    updateToolbarPosition: () => void;
};
export declare const useToolbarPosition: ({ editor, toolbarWrapperRef }: ToolbarPositionProps) => UseToolbarPositionReturn;
export {};
//# sourceMappingURL=useToolbarPosition.d.ts.map