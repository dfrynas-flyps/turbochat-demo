import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { NodeViewWrapper } from '@tiptap/react';
import { noop } from 'lodash';
import { useBoolean, useDebounceCallback } from 'usehooks-ts';
import { getApiAdapter } from '../api-adapter';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useCustomEventListener } from '../hooks/useCustomEvent';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useVariableHistory } from '../hooks/useVariableHistory';
import { useVariableLatestValues } from '../hooks/useVariableValues';
import { clearVariableAIOptions, fetchVariableAIOptions, setActiveSection, setActiveStatement, setActiveVar, updateVariable, } from '../redux';
import { selectActiveVar, selectData, selectProjectData, selectProjectVariableValues, selectVariableAIOptions, selectVariableRegistry, } from '../redux/selectors';
import { TemplateDataTypes, VariableHistoryEntryAuthorType } from '../types/editor';
import { AUTOFILLED_VARIABLES, VARIABLE_NODE_SELECTOR, VAR_INPUT_EXTENSION_NAME } from '../types/templates';
import { useEditorTabNavigation } from './EditorTabNavigation';
import { useSectionContext } from './SectionContext';
import { useStatementContext } from './StatementContext';
import VariableAIOptionsMenu from './VariableAIOptionsMenu/VariableAIOptionsMenu';
import { Tooltip } from './common/Tooltip';
import { ExclamationMarkIcon } from './icons/ExclamationMarkIcon';
import SparklesIcon from './icons/SparklesIcon';
// Shared utility function for selecting variable content
const selectVariableContent = (extensionElement) => {
    const selection = window.getSelection();
    const selectAllRange = document.createRange();
    const variableElement = extensionElement.querySelector(VARIABLE_NODE_SELECTOR);
    const nodeToSelect = variableElement?.childNodes[0] || variableElement;
    if (nodeToSelect) {
        selectAllRange.selectNodeContents(nodeToSelect);
    }
    if (selection) {
        selection.removeAllRanges();
        selection.addRange(selectAllRange);
    }
};
const commonIconStyles = {
    margin: '0 4px -8px 0',
    width: '20px',
    minWidth: '20px',
    height: '28px',
    verticalAlign: 'initial',
    display: 'inline',
};
const apiAdapter = getApiAdapter();
const VarInput = (props) => {
    const templateData = useAppSelector(selectData);
    const variableRegistry = useAppSelector(selectVariableRegistry);
    const activeVariable = useAppSelector(selectActiveVar);
    const variableAIOptions = useAppSelector(selectVariableAIOptions);
    const projectVariables = useAppSelector(selectProjectVariableValues);
    const projectData = useAppSelector(selectProjectData);
    const { addVariableHistoryEntry, resetVariableHistory } = useVariableHistory();
    const menuRef = useRef(null);
    const dispatch = useAppDispatch();
    const { node: { attrs: { name: currentVariableName, value: currentValue, statementId, sectionId, displayId: variableDisplayId }, }, } = props;
    const { statement } = useStatementContext();
    const { section } = useSectionContext();
    const isWithinSectionName = useMemo(() => Boolean(sectionId && !statementId), [sectionId, statementId]);
    const isWithinStatement = useMemo(() => Boolean(sectionId && statementId), [sectionId, statementId]);
    const currentVariable = useMemo(() => variableRegistry[currentVariableName], [variableRegistry, currentVariableName]);
    const variableElementRef = useRef(null);
    const variableValueOnFocus = useRef(null);
    const { setTabNavigationNode } = useEditorTabNavigation();
    // const [animationRenderer, setAnimationRenderer] = useState<((currentValue: string) => React.ReactNode) | null>(null)
    const { updateVariableLatestValues } = useVariableLatestValues();
    const isAutocompleteOpen = useBoolean(false);
    const isVariableActive = useMemo(() => {
        return activeVariable?.variableDisplayId === variableDisplayId;
    }, [activeVariable, variableDisplayId]);
    const autocompleteOptions = useMemo(() => variableAIOptions[currentVariableName], [variableAIOptions, currentVariableName]);
    const isNotAutofilledAndEmpty = useMemo(() => {
        return !AUTOFILLED_VARIABLES.includes(currentVariableName) && !currentVariable?.value;
    }, [currentVariableName, currentVariable?.value]);
    const isAutocompleteEnabled = useMemo(() => {
        return isNotAutofilledAndEmpty;
    }, [isNotAutofilledAndEmpty]);
    const fetchAiProposals = useCallback(async () => {
        dispatch(clearVariableAIOptions({ variableName: currentVariableName }));
        dispatch(fetchVariableAIOptions({
            statementText: statement?.text || section?.name,
            currentVariableValue: currentValue,
            currentVariableName: currentVariableName,
            // todo: turboplan scope
            // projectTitle: projectData.project_name,
            // forestName: projectData.forest_name,
            // projectVariables,
        }));
    }, [dispatch, currentVariableName, currentValue, statement?.text, section?.name, projectData, projectVariables]);
    const setFocusOnVariable = useCallback(() => {
        if (isVariableActive) {
            const extensionElement = variableElementRef.current?.closest(`.node-${VAR_INPUT_EXTENSION_NAME}`);
            const variableElement = extensionElement?.querySelector(VARIABLE_NODE_SELECTOR);
            if (extensionElement && variableElement) {
                variableElement.focus();
                // NOTE: setTimeout is a fix for the bug where variable was selected only partially
                setTimeout(() => {
                    selectVariableContent(extensionElement);
                }, 0);
            }
        }
    }, [isVariableActive]);
    const handleCloseVariableAIOptionsMenu = useCallback((wasClosedFromMenuButton = false) => {
        isAutocompleteOpen.setFalse();
        if (wasClosedFromMenuButton) {
            setFocusOnVariable();
        }
    }, [isAutocompleteOpen, setFocusOnVariable]);
    const onVariableClick = useCallback(() => {
        variableValueOnFocus.current = currentVariable?.value ?? null;
        const extensionElement = variableElementRef.current?.closest(`.node-${VAR_INPUT_EXTENSION_NAME}`);
        if (extensionElement && !isVariableActive) {
            // NOTE: setTimeout is a fix for the bug where variable was selected only partially
            setTimeout(() => {
                selectVariableContent(extensionElement);
            }, 0);
            dispatch(setActiveVar({ ...currentVariable, variableDisplayId }));
            const tabNavigationNode = variableElementRef.current?.querySelector(`[data-tab-navigation]`);
            if (tabNavigationNode) {
                setTabNavigationNode(tabNavigationNode);
            }
            if (isWithinSectionName) {
                dispatch(setActiveSection({ id: sectionId }));
            }
            if (isWithinStatement) {
                dispatch(setActiveSection({ id: sectionId }));
                dispatch(setActiveStatement({ id: statementId }));
            }
            if (isAutocompleteEnabled && autocompleteOptions?.loadingState !== 'loading') {
                fetchAiProposals();
            }
        }
    }, [
        currentVariable,
        isVariableActive,
        dispatch,
        variableDisplayId,
        setTabNavigationNode,
        isWithinSectionName,
        isWithinStatement,
        isAutocompleteEnabled,
        autocompleteOptions,
        sectionId,
        statementId,
        fetchAiProposals,
    ]);
    useCustomEventListener(variableDisplayId, () => {
        if (!autocompleteOptions) {
            fetchAiProposals();
        }
        isAutocompleteOpen.setTrue();
    });
    useOnClickOutside([menuRef, `.var-${variableDisplayId}`], (event) => {
        if (!event.target?.closest('[data-prevent-variable-deactivation]')) {
            dispatch(setActiveVar(null));
        }
    }, {
        eventType: 'click',
        isActive: isVariableActive,
    });
    useEffect(() => {
        // initialize variable history if it's empty
        if (currentVariable && !currentVariable.variableHistory?.length) {
            addVariableHistoryEntry(currentVariableName, currentValue, VariableHistoryEntryAuthorType.SYSTEM);
        }
    }, [addVariableHistoryEntry, currentValue, currentVariable, currentVariableName]);
    useEffect(() => {
        // initialize first historical value for new template document
        if (templateData?.type === TemplateDataTypes.TEMPLATE_DOCUMENT) {
            if (currentVariable &&
                currentVariable.variableHistory?.length === 1 &&
                currentVariable.variableHistory[0].sourceType === TemplateDataTypes.TEMPLATE) {
                addVariableHistoryEntry(currentVariableName, currentValue, VariableHistoryEntryAuthorType.SYSTEM);
            }
        }
    }, [addVariableHistoryEntry, currentValue, currentVariable, currentVariableName, templateData?.type]);
    const debouncedSave = useDebounceCallback((value) => {
        dispatch(updateVariable({
            variableName: currentVariableName,
            newValue: value,
        }));
        updateVariableLatestValues(currentVariableName, value);
    }, 500);
    const handleChangeValue = useCallback((e) => {
        e.stopPropagation();
        debouncedSave(e.target.innerText);
    }, [debouncedSave]);
    const handlePaste = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount)
            return;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        selection.collapseToEnd();
        debouncedSave(selection.anchorNode.innerHTML);
    }, [debouncedSave]);
    useCustomEventListener(`closeAutocomplete-${variableDisplayId}`, () => {
        isAutocompleteOpen.setFalse();
    });
    const handleOnBlurEditorVariable = useCallback((event) => {
        const spanContent = event.target.textContent ?? '';
        const blurringToMenu = menuRef.current?.contains(event.relatedTarget);
        if (isAutocompleteOpen.value && !blurringToMenu) {
            handleCloseVariableAIOptionsMenu();
        }
        if (spanContent != variableValueOnFocus.current) {
            if (templateData?.type === TemplateDataTypes.TEMPLATE_DOCUMENT) {
                addVariableHistoryEntry(currentVariableName, spanContent, VariableHistoryEntryAuthorType.USER);
            }
            if (templateData?.type === TemplateDataTypes.TEMPLATE) {
                resetVariableHistory(currentVariableName, spanContent, VariableHistoryEntryAuthorType.USER);
            }
        }
    }, [
        addVariableHistoryEntry,
        currentVariableName,
        resetVariableHistory,
        statementId,
        templateData?.type,
        handleCloseVariableAIOptionsMenu,
        isAutocompleteOpen,
    ]);
    // useEventListener(
    //   VAR_ANIMATION_TRIGGER as any,
    //   (event: CustomEvent) => {
    //     setAnimationRenderer(event.detail?.animationRenderer || null)
    //   },
    //   variableElementRef
    // )
    const renderIcon = () => {
        if (apiAdapter.hasVariableAutocomplete() && isVariableActive && autocompleteOptions && isNotAutofilledAndEmpty) {
            return (_jsx(StyledSparklesIcon, { onClick: Boolean(currentVariable) ? isAutocompleteOpen.setTrue : noop, isBeating: !currentVariable || autocompleteOptions.loadingState === 'loading' }));
        }
        if (isNotAutofilledAndEmpty) {
            return (_jsx(Tooltip, { placement: "top", title: "Uploaded document information. Input your project's details as we couldn't retrieve them.", children: _jsx(StyledExclamationMarkIcon, {}) }));
        }
        return null;
    };
    return (_jsxs(NodeViewWrapper, { style: { display: 'inline' }, "data-prevent-variable-deactivation": true, className: `var-${variableDisplayId}`, children: [_jsxs(StyledVar, { children: [renderIcon(), _jsx(Wrapper, { hasValue: !!currentValue, isActive: isVariableActive, ref: variableElementRef, "data-variable-wrapper": true, children: _jsx(EditableVar, { "data-variable-display-id": variableDisplayId, "data-name": currentVariableName, contentEditable: true, suppressContentEditableWarning: true, onInput: handleChangeValue, onPaste: handlePaste, onBlur: handleOnBlurEditorVariable, onFocus: onVariableClick, "data-variable-node": true, "data-tab-navigation": "focus", children: currentValue }) })] }), apiAdapter.hasVariableAutocomplete() && (_jsx(VariableAIOptionsMenu, { isOpen: isAutocompleteOpen.value, anchorEl: variableElementRef.current, currentVariable: currentVariable, currentValue: currentValue, handleClose: handleCloseVariableAIOptionsMenu, menuRef: menuRef }))] }));
};
export default VarInput;
const StyledVar = styled('div')(() => ({
    paddingInline: '0',
    position: 'relative',
    lineHeight: 'inherit',
    borderRadius: '0',
    display: 'inline',
    alignItems: 'flex-start',
    '&:hover': {
        background: 'transparent',
    },
}));
const shouldForwardProp = (prop) => !['hasValue', 'isActive'].includes(prop);
const StyledSparklesIcon = styled(SparklesIcon)(() => ({
    ...commonIconStyles,
    cursor: 'pointer',
    path: {
        fill: '#88AFF7',
    },
}));
const Wrapper = styled('div', { shouldForwardProp })(({ theme, hasValue, isActive }) => ({
    padding: '0px 5px',
    display: 'inline',
    position: 'relative',
    maxWidth: '100%',
    color: theme.palette.info[700],
    textDecorationLine: 'underline',
    textDecorationThickness: '1px',
    textDecorationStyle: 'solid',
    textDecorationColor: theme.palette.grey[200],
    textUnderlineOffset: '8px',
    ...(isActive && {
        textDecorationColor: theme.palette.info[700],
        textDecorationThickness: '2px',
        // we can't change background color here, as that would cause a repaint, which would break the selection
    }),
    '&:hover': {
        textDecorationColor: theme.palette.info[700],
        ...(!hasValue && {
            color: theme.palette.info[800],
        }),
    },
}));
const EditableVar = styled('span')(() => ({
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    background: 'none',
    lineHeight: 1.5,
    cursor: 'text',
    minHeight: '20px',
    maxWidth: '100%',
    '&:focus': {
        outline: 'none',
    },
}));
const StyledExclamationMarkIcon = styled(ExclamationMarkIcon)(({ theme }) => ({
    ...commonIconStyles,
    '& path': {
        fill: theme.palette.warning[500],
    },
}));
//# sourceMappingURL=VarInput.js.map