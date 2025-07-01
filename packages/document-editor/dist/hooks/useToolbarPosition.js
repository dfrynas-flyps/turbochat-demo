import { useCallback, useEffect, useState } from 'react';
/** Simple check for equality of DOMRect objects, because isEqual from lodash is too strict */
const isDomRectEqual = (a, b) => {
    return (a?.bottom === b?.bottom &&
        a?.height === b?.height &&
        a?.left === b?.left &&
        a?.right === b?.right &&
        a?.top === b?.top &&
        a?.width === b?.width &&
        a?.x === b?.x &&
        a?.y === b?.y);
};
export const useToolbarPosition = ({ editor, toolbarWrapperRef }) => {
    const [toolbarPosition, setToolbarPosition] = useState(null);
    const resetPosition = useCallback(() => {
        setToolbarPosition(null);
    }, []);
    const updateToolbarPosition = useCallback(() => {
        if (!editor || !editor.view.hasFocus() || !toolbarWrapperRef.current) {
            resetPosition();
            return;
        }
        const { from, to } = editor.state.selection;
        const start = editor.view.coordsAtPos(from);
        const end = editor.view.coordsAtPos(to);
        if (start && end && !isDomRectEqual(start, end)) {
            const originalToolbarRect = toolbarWrapperRef.current.getBoundingClientRect();
            const toolbarWidth = originalToolbarRect.width;
            const verticalOffset = -originalToolbarRect.height * 1.5;
            const top = document.documentElement.scrollTop + start.top + verticalOffset;
            let selectionCenterPosition = start.left + (end.left - start.left) / 2;
            if (end.left < start.left) {
                selectionCenterPosition = end.left + (start.left - end.left) / 2;
            }
            let left = selectionCenterPosition - toolbarWidth / 2;
            if (left + toolbarWidth > window.innerWidth) {
                left = window.innerWidth - toolbarWidth;
            }
            setToolbarPosition({
                top,
                left,
            });
        }
        else {
            resetPosition();
        }
    }, [editor, resetPosition, toolbarWrapperRef]);
    const handleStatementAndToolbarBlur = useCallback(({ event }) => {
        const relatedTarget = event.relatedTarget;
        if (!toolbarWrapperRef.current?.contains(relatedTarget)) {
            resetPosition();
        }
    }, [resetPosition, toolbarWrapperRef]);
    useEffect(() => {
        if (editor) {
            editor.on('focus', updateToolbarPosition);
            editor.on('selectionUpdate', updateToolbarPosition);
            editor.on('blur', handleStatementAndToolbarBlur);
            return () => {
                editor.off('focus', updateToolbarPosition);
                editor.off('selectionUpdate', updateToolbarPosition);
                editor.off('blur', handleStatementAndToolbarBlur);
            };
        }
    }, [editor, updateToolbarPosition, handleStatementAndToolbarBlur]);
    useEffect(() => {
        window.addEventListener('resize', updateToolbarPosition);
        return () => {
            window.removeEventListener('resize', updateToolbarPosition);
        };
    }, [updateToolbarPosition]);
    return { toolbarPosition, updateToolbarPosition };
};
//# sourceMappingURL=useToolbarPosition.js.map