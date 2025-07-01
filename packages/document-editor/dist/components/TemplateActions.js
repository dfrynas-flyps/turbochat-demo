import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useContext, useEffect } from 'react';
import { useBoolean, useInterval } from 'usehooks-ts';
import { selectFirstVariableNode } from '../helpers/editor';
import { useAppDispatch } from '../hooks/redux';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { setActiveSection, setActiveStatement, setActiveVar } from '../redux';
import { VARIABLE_WRAPPER_SELECTOR } from '../types/templates';
import { useEditorContext } from './EditorContainer';
export const TemplateActionsContext = React.createContext({});
export const TemplateActions = (props) => {
    const isAnySectionNameFocused = useBoolean(false);
    const dispatch = useAppDispatch();
    const { isPreviewMode } = useEditorContext();
    const atLeastOneVariableLoaded = useBoolean(false);
    const checkIfVariableIsLoaded = useCallback(() => {
        if (document.querySelectorAll(VARIABLE_WRAPPER_SELECTOR).length >= 1) {
            atLeastOneVariableLoaded.setTrue();
        }
    }, [atLeastOneVariableLoaded]);
    useInterval(checkIfVariableIsLoaded, atLeastOneVariableLoaded.value ? null : 500);
    useOnClickOutside('[data-editor-inner-click-marker]', (event) => {
        if (!event.target?.closest('[data-prevent-variable-deactivation]')) {
            dispatch(setActiveVar(null));
        }
        if (!event.target?.closest('[data-prevent-statement-deactivation]')) {
            dispatch(setActiveStatement(null));
        }
        if (!event.target?.closest('[data-prevent-section-deactivation]')) {
            dispatch(setActiveSection(null));
        }
        isAnySectionNameFocused.setFalse();
    });
    useEffect(() => {
        if (atLeastOneVariableLoaded.value && !isPreviewMode) {
            selectFirstVariableNode();
        }
    }, [atLeastOneVariableLoaded.value, isPreviewMode]);
    return (_jsx(TemplateActionsContext.Provider, { value: {
            isAnySectionNameFocused,
        }, children: props.children }));
};
export const useTemplateActionsContext = () => {
    const context = useContext(TemplateActionsContext);
    if (!context) {
        throw new Error('useTemplateActionsContext must be used within TemplateActionsContext');
    }
    return context;
};
//# sourceMappingURL=TemplateActions.js.map