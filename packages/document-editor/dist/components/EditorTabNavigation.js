import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useContext, useEffect } from 'react';
import { useCustomEventEmitter } from '../hooks/useCustomEvent';
import { useRefState } from '../hooks/useRefState';
export const EditorTabNavigationContext = React.createContext({});
export const EditorTabNavigation = ({ children }) => {
    const [getSelectedNode, setSelectedNode] = useRefState(null);
    const emitCustomEvent = useCustomEventEmitter();
    const getAllTabNavigationNodes = useCallback(() => {
        const nodes = document.querySelectorAll(`[data-tab-navigation]`);
        return Array.from(nodes);
    }, []);
    const closeActiveAutocomplete = useCallback(() => {
        const currentNode = getSelectedNode();
        const currentNodeId = currentNode
            .querySelector('[data-variable-display-id]')
            ?.getAttribute('data-variable-display-id');
        if (currentNodeId) {
            emitCustomEvent(`closeAutocomplete-${currentNodeId}`);
        }
    }, [emitCustomEvent, getSelectedNode]);
    const simulateClick = useCallback((element) => {
        closeActiveAutocomplete();
        window.getSelection()?.removeAllRanges();
        const clickMethod = element.getAttribute('data-tab-navigation');
        if (clickMethod === 'focus') {
            element.focus();
        }
        else {
            element.click();
        }
        if (!isElementInViewport(element)) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [closeActiveAutocomplete]);
    const isElementInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    };
    const goToNext = useCallback(() => {
        const selectedNode = getSelectedNode();
        const allTabNavigationNodes = getAllTabNavigationNodes();
        const currentIndex = allTabNavigationNodes.findIndex((tabNavigationNode) => tabNavigationNode === selectedNode);
        if (currentIndex !== -1) {
            if (currentIndex === allTabNavigationNodes.length - 1) {
                simulateClick(allTabNavigationNodes[0]);
            }
            else {
                simulateClick(allTabNavigationNodes[currentIndex + 1]);
            }
        }
    }, [getAllTabNavigationNodes, getSelectedNode, simulateClick]);
    const goToPrevious = useCallback(() => {
        const selectedNode = getSelectedNode();
        const allTabNavigationNodes = getAllTabNavigationNodes();
        const currentIndex = allTabNavigationNodes.findIndex((tabNavigationNode) => tabNavigationNode === selectedNode);
        if (currentIndex !== -1) {
            if (currentIndex === 0) {
                simulateClick(allTabNavigationNodes[allTabNavigationNodes.length - 1]);
            }
            else {
                simulateClick(allTabNavigationNodes[currentIndex - 1]);
            }
        }
    }, [getAllTabNavigationNodes, getSelectedNode, simulateClick]);
    const handleTabNavigation = useCallback((event) => {
        const selectedNode = getSelectedNode();
        if (event.key === 'Tab' && selectedNode) {
            event.preventDefault();
            event.stopPropagation();
            if (event.shiftKey) {
                goToPrevious();
            }
            else {
                goToNext();
            }
        }
    }, [getSelectedNode, goToNext, goToPrevious]);
    useEffect(() => {
        addEventListener('keydown', handleTabNavigation);
        return () => {
            removeEventListener('keydown', handleTabNavigation);
        };
    }, [handleTabNavigation]);
    return (_jsx(EditorTabNavigationContext.Provider, { value: { setTabNavigationNode: setSelectedNode, getTabNavigationNode: getSelectedNode }, children: children }));
};
export const useEditorTabNavigation = () => {
    const context = useContext(EditorTabNavigationContext);
    if (!context) {
        throw new Error('useEditorTabNavigation must be used within EditorTabNavigationContext');
    }
    return context;
};
//# sourceMappingURL=EditorTabNavigation.js.map