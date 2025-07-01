import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { replaceEditorNodes } from '../helpers/editor';
import { createVariableName } from '../helpers/variableRegistry';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useVariableHistory } from '../hooks/useVariableHistory';
import { createHTMLTag } from '../helpers/parseTemplateStatements';
import { addNewVariable, setActiveVar } from '../redux';
import { selectActiveVar } from '../redux/selectors';
import { VariableHistoryEntryAuthorType, } from '../types/editor';
import { DEFAULT_NEW_VARIABLE_VALUE, VARIABLE_NODE_SELECTOR, VAR_INPUT_EXTENSION_NAME, VAR_INPUT_TAG_NAME, } from '../types/templates';
import { Button as ToolbarButton } from './DynamicToolbar';
import { Tooltip } from './common/Tooltip';
import BoltIcon from './icons/BoltIcon';
const getVariableIdsFromSelection = (range, startVariableElement, endVariableElement) => {
    const variableIds = [];
    const selectionContainsVariable = !!range.cloneContents().querySelector(VARIABLE_NODE_SELECTOR);
    if (selectionContainsVariable) {
        // Collect all variable IDs in the selection
        const selectedVariables = range.cloneContents().querySelectorAll(VARIABLE_NODE_SELECTOR);
        variableIds.push(...Array.from(selectedVariables).map((el) => el.getAttribute('data-variable-display-id')));
        // Add start and end variables if they're not fully contained in the selection
        if (startVariableElement && !variableIds.includes(startVariableElement.getAttribute('data-variable-display-id'))) {
            variableIds.unshift(startVariableElement.getAttribute('data-variable-display-id'));
        }
        if (endVariableElement && !variableIds.includes(endVariableElement.getAttribute('data-variable-display-id'))) {
            variableIds.push(endVariableElement.getAttribute('data-variable-display-id'));
        }
    }
    // In case selection is within a variable
    if (startVariableElement && startVariableElement === endVariableElement) {
        variableIds.push(startVariableElement.getAttribute('data-variable-display-id'));
    }
    return variableIds.filter((id) => id !== null);
};
const findClosestVariableElement = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
        return findClosestVariableElement(node.parentElement);
    }
    if (node instanceof Element) {
        return node.closest(VARIABLE_NODE_SELECTOR);
    }
    return null;
};
var ACTION_MODES;
(function (ACTION_MODES) {
    ACTION_MODES["INSERT"] = "insert";
    ACTION_MODES["REMOVE"] = "remove";
    ACTION_MODES["TURN_INTO"] = "turn-into";
})(ACTION_MODES || (ACTION_MODES = {}));
const VariableToggleButton = ({ editor, onVariableRemove, statementId, sectionId, }) => {
    const activeVar = useAppSelector(selectActiveVar);
    const dispatch = useAppDispatch();
    const { createNewEntry: createVariableHistoryEntry } = useVariableHistory();
    const [mode, setMode] = useState(ACTION_MODES.INSERT);
    const [selectedVariables, setSelectedVariables] = useState([]);
    const resetButtonMode = useCallback(() => {
        setMode(ACTION_MODES.INSERT);
        setSelectedVariables([]);
    }, [setMode, setSelectedVariables]);
    const onSelection = useCallback(() => {
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0)
            return;
        const range = selection.getRangeAt(0);
        const isCaret = selection.isCollapsed;
        const isSelection = !isCaret;
        const startVariableElement = findClosestVariableElement(range.startContainer);
        const endVariableElement = findClosestVariableElement(range.endContainer);
        if (activeVar?.variableDisplayId) {
            setSelectedVariables([activeVar.variableDisplayId]);
            setMode(ACTION_MODES.REMOVE);
            return;
        }
        if (isCaret) {
            if (startVariableElement) {
                const startVariableDisplayId = startVariableElement.getAttribute('data-variable-display-id');
                if (startVariableDisplayId) {
                    setSelectedVariables([startVariableDisplayId]);
                    setMode(ACTION_MODES.REMOVE);
                }
            }
            else {
                setMode(ACTION_MODES.INSERT);
            }
        }
        if (isSelection) {
            let variableIds = [];
            variableIds = getVariableIdsFromSelection(range, startVariableElement, endVariableElement);
            if (variableIds.length > 0) {
                setSelectedVariables(variableIds);
                setMode(ACTION_MODES.REMOVE);
            }
            else {
                setMode(ACTION_MODES.TURN_INTO);
            }
        }
    }, [activeVar]);
    const focusVariableByDisplayId = useCallback((variableDisplayId) => {
        const variableNode = document.querySelector(`[data-variable-display-id="${variableDisplayId}"]`);
        if (variableNode) {
            variableNode.focus();
        }
    }, []);
    const createVariable = useCallback(() => {
        if (!editor)
            return;
        const { view: { state, state: { selection }, }, } = editor;
        const { from, to } = selection;
        const selectedText = state.doc.textBetween(from, to, ' ');
        const variableName = selectedText ? createVariableName(selectedText) : `custom-${uuid()}`;
        const variableValue = selectedText ? selectedText : DEFAULT_NEW_VARIABLE_VALUE;
        const newDisplayId = uuid();
        const newVariable = {
            initialValue: '',
            name: variableName,
            value: variableValue,
            variableHistory: [createVariableHistoryEntry(variableValue, VariableHistoryEntryAuthorType.USER)],
        };
        dispatch(addNewVariable(newVariable));
        editor
            .chain()
            .insertContent(createHTMLTag({
            tagName: VAR_INPUT_TAG_NAME,
            innerText: newVariable.value,
            attrs: {
                name: newVariable.name,
                value: newVariable.value,
                sectionId,
                statementId: statementId ?? '',
                displayId: newDisplayId,
            },
        }))
            .run();
        focusVariableByDisplayId(newDisplayId);
        resetButtonMode();
    }, [createVariableHistoryEntry, dispatch, editor, resetButtonMode, sectionId, statementId]);
    const removeVariable = useCallback(() => {
        if (!editor)
            return;
        // Get the current selection before removing variables
        const selection = document.getSelection();
        let range = null;
        if (selection?.rangeCount && selection.rangeCount > 0) {
            range = selection.getRangeAt(0).cloneRange();
        }
        const newContent = replaceEditorNodes(editor.getJSON(), (node) => {
            if (node.type === VAR_INPUT_EXTENSION_NAME &&
                node.attrs?.displayId &&
                selectedVariables.includes(node.attrs.displayId)) {
                const nodeText = node.attrs.value || node.attrs.name;
                return {
                    type: 'text',
                    text: nodeText.toString(),
                };
            }
            return node;
        });
        editor.commands.setContent(newContent);
        dispatch(setActiveVar(null));
        onVariableRemove();
        // Restore the text selection after removing variables
        if (range) {
            const newRange = document.createRange();
            newRange.setStart(range.startContainer, range.startOffset);
            newRange.setEnd(range.endContainer, range.endOffset);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
            // Update editor's internal selection state
            editor.commands.setTextSelection({
                from: editor.view.posAtDOM(range.startContainer, range.startOffset),
                to: editor.view.posAtDOM(range.endContainer, range.endOffset),
            });
        }
        resetButtonMode();
        onSelection();
    }, [dispatch, editor, onSelection, onVariableRemove, resetButtonMode, selectedVariables]);
    const onClick = useCallback(() => {
        if (mode === ACTION_MODES.REMOVE) {
            removeVariable();
        }
        else {
            createVariable();
        }
    }, [mode, removeVariable, createVariable]);
    useEffect(() => {
        document.addEventListener('selectionchange', onSelection);
        return () => {
            document.removeEventListener('selectionchange', onSelection);
        };
    }, [onSelection]);
    const buttonLabel = useMemo(() => {
        if (mode === ACTION_MODES.INSERT) {
            return 'Insert variable';
        }
        if (mode === ACTION_MODES.REMOVE) {
            return 'Remove variable';
        }
        return 'Turn into variable';
    }, [mode]);
    return (_jsx(_Fragment, { children: _jsx(Tooltip, { placement: "top", title: _jsx("span", { children: buttonLabel }), children: _jsxs(ToolbarButton, { "aria-label": buttonLabel, onClick: onClick, children: [_jsx(BoltIcon, { color: "#fff" }), _jsx(ButtonLabel, { children: buttonLabel })] }) }) }));
};
const ButtonLabel = styled('span')(() => ({
    marginLeft: '4px',
    display: 'inline-block',
    fontSize: '14px',
}));
export default VariableToggleButton;
//# sourceMappingURL=VariableToggleButton.js.map