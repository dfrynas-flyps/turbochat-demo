import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@mui/material/styles/styled';
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
const PlusIcon = () => (_jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5 0.5C5.27614 0.5 5.5 0.723858 5.5 1V4.5H9C9.27614 4.5 9.5 4.72386 9.5 5C9.5 5.27614 9.27614 5.5 9 5.5H5.5V9C5.5 9.27614 5.27614 9.5 5 9.5C4.72386 9.5 4.5 9.27614 4.5 9V5.5H1C0.723858 5.5 0.5 5.27614 0.5 5C0.5 4.72386 0.723858 4.5 1 4.5H4.5V1C4.5 0.723858 4.72386 0.5 5 0.5Z", fill: "#72767D" }) }));
const TableWrapperNode = (props) => {
    const { editor } = props;
    return (_jsx(NodeViewWrapper, { children: _jsxs(Container, { children: [_jsx(NodeViewContent, {}), _jsx(AddButton, { addRow: true, onClick: () => editor.commands.addRowAfter(), "aria-label": "Add row", children: _jsx(PlusIcon, {}) }), _jsx(AddButton, { onClick: () => editor.commands.addColumnAfter(), "aria-label": "Add column", children: _jsx(PlusIcon, {}) })] }) }));
};
const Container = styled('div')(() => ({
    position: 'relative',
    width: 'fit-content',
    padding: '0 16px 16px 0',
    '& .tableWrapper': {
        width: 'fit-content',
    },
}));
const AddButton = styled('button', { shouldForwardProp: (prop) => prop !== 'addRow' })(({ theme, addRow }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: theme.palette.grey[100],
    cursor: 'pointer',
    opacity: 0,
    position: 'absolute',
    height: 'calc(100% - 16px)',
    width: '16px',
    right: 0,
    top: 0,
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
        opacity: 1,
        pointerEvents: 'auto',
    },
    ...(addRow && {
        height: '16px',
        width: 'calc(100% - 16px)',
        bottom: 0,
        left: 0,
        top: 'auto',
        right: 'auto',
    }),
}));
const TableWrapperExtension = Node.create({
    name: 'table-wrapper',
    group: 'block',
    content: 'table',
    parseHTML() {
        return [{ tag: 'table-wrapper' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['table-wrapper', mergeAttributes(HTMLAttributes), 0];
    },
    addNodeView() {
        return ReactNodeViewRenderer(TableWrapperNode);
    },
});
export default TableWrapperExtension;
//# sourceMappingURL=TableWrapperExtension.js.map