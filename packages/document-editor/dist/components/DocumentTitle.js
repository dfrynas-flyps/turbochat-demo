import { jsx as _jsx } from "react/jsx-runtime";
import { useLayoutEffect, useMemo, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { debounce } from 'lodash';
import { useBoolean } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { setDocumentHeading } from '../redux';
import { selectData } from '../redux/selectors';
export const DocumentTitle = () => {
    const documentTitleRef = useRef(null);
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    const isFocused = useBoolean(false);
    const currentTitle = useMemo(() => {
        if (data?.documentHeading) {
            return data?.documentHeading;
        }
        // NOTE: this should be removed after TP-3297 reaches production (details described in `fixTemplatesNamesAndTitles.ts` file)
        return data?.title || data?.name || '';
    }, [data?.documentHeading, data?.name, data?.title]);
    const debouncedDocumentTitleSave = useMemo(() => debounce((updateEvent) => {
        console.log('document title save');
        dispatch(setDocumentHeading(updateEvent.editor.getHTML()));
    }, 500), [dispatch]);
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [Document, Text, Paragraph],
        content: currentTitle,
        onUpdate: (updateEvent) => {
            debouncedDocumentTitleSave(updateEvent);
        },
    }, []);
    useLayoutEffect(() => {
        if (editor && editor.getHTML() !== currentTitle) {
            editor.commands.setContent(currentTitle);
        }
    }, [editor, currentTitle]);
    useOnClickOutside(documentTitleRef, () => {
        isFocused.setFalse();
    }, {
        isActive: isFocused.value,
    });
    return (_jsx(DocumentTitleContainer, { children: _jsx("div", { onClick: isFocused.setTrue, ref: documentTitleRef, children: _jsx(TitleEditorContainer, { children: _jsx(EditorContent, { editor: editor }) }) }) }));
};
const DocumentTitleContainer = styled('div')({
    position: 'relative',
});
const TitleEditorContainer = styled('div')({
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '32px',
    margin: '48px 0 24px',
    color: '#3d85c6',
    textAlign: 'center',
    '& .tiptap:focus-within': {
        outline: 'none',
    },
});
//# sourceMappingURL=DocumentTitle.js.map