import { Editor as CoreEditor, JSONContent } from '@tiptap/core';
import { Node as ProseMirrorNode, Slice } from '@tiptap/pm/model';
import { Editor as ReactEditor } from '@tiptap/react';
export declare const wait: (ms: number) => Promise<unknown>;
type Editor = CoreEditor | ReactEditor;
/**
 * This function travels through TipTap editor content and recursively extracts desired nodes.
 */
export declare const getEditorNodes: (content: JSONContent, desiredNodeType: string) => JSONContent[];
/**
 * This function travels through TipTap editor nodes and recursively calls a `nodeReplacer` for each node.
 */
export declare const replaceEditorNodes: (content: JSONContent, nodeReplacer: (node: JSONContent) => JSONContent) => JSONContent;
export declare const getDocumentSlice: (editor: Editor, slice: Slice) => ProseMirrorNode;
export declare const generateSliceHTML: (editor: Editor, slice: Slice) => string;
export declare const getEditorDetailsBasedOnCursorPosition: (editor: Editor) => {
    isCursorAtTheBeginning: boolean;
    isCursorAtTheEnd: boolean;
    isCursorInTheMiddle: boolean;
    beforeCursorHtml: string;
    afterCursorHtml: string;
    beforeCursorDoc: ProseMirrorNode;
    afterCursorDoc: ProseMirrorNode;
    beforeCursorJSON: any;
    afterCursorJSON: any;
    $from: import("@tiptap/pm/model").ResolvedPos;
    $to: import("@tiptap/pm/model").ResolvedPos;
};
export declare const selectFirstVariableNode: () => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map