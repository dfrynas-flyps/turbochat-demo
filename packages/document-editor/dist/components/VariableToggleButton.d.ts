import React from 'react';
import { Editor } from '@tiptap/react';
import { TemplateSection, TemplateStatement } from '../types/editor';
type VariableToggleButtonProps = {
    editor: Editor | null;
    onVariableRemove: () => void;
    sectionId: TemplateSection['id'];
    statementId?: TemplateStatement['id'];
};
declare const VariableToggleButton: React.FC<VariableToggleButtonProps>;
export default VariableToggleButton;
//# sourceMappingURL=VariableToggleButton.d.ts.map