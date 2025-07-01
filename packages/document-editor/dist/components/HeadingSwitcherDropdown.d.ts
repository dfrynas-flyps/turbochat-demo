import React from 'react';
import { Level } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';
type HeadingSwitcherDropdownProps = {
    editor?: Editor;
    onHeadingLevelChange: (headingLevel: Level) => void;
    icon?: React.ReactNode;
    currentHeadingLevel?: number;
};
declare const HeadingSwitcherDropdown: React.FC<HeadingSwitcherDropdownProps>;
export default HeadingSwitcherDropdown;
//# sourceMappingURL=HeadingSwitcherDropdown.d.ts.map