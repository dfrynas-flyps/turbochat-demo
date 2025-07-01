import { TemplateStatement } from '../types/editor';
export type IndentLevelFeature = {
    isIndentable: boolean;
    canIncreaseIndent: boolean;
    canDecreaseIndent: boolean;
    indentLevelInPx: number;
    increaseIndent: () => void;
    decreaseIndent: () => void;
    setIndentLevel: (indentLevel: number) => void;
};
export declare const INDENT_LEVEL_PX = 20;
export declare const MAX_INDENT_LEVEL = 4;
export declare const getMinimumIndentLevel: (statement: TemplateStatement) => number;
export declare const useIndentLevel: (statement: TemplateStatement) => IndentLevelFeature;
//# sourceMappingURL=useIndentLevel.d.ts.map