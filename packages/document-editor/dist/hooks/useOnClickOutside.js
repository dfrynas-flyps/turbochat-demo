import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useMemo, useRef } from 'react';
const defaultOptions = {
    isActive: true,
    debug: false,
    eventType: 'click',
};
/** Custom hook that handles clicks outside a specified element. */
export const useOnClickOutside = (ref, handler, optionsArg = {}) => {
    const savedHandler = useRef(handler);
    const options = useMemo(() => {
        return { ...defaultOptions, ...optionsArg };
    }, [optionsArg]);
    const refsAndSelectors = useMemo(() => {
        return Array.isArray(ref) ? ref : [ref];
    }, [ref]);
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        if (!options.isActive)
            return;
        const listener = (event) => {
            const target = event.target;
            if (!target || !target.isConnected) {
                return;
            }
            const debugReport = {
                target,
                refsAndSelectors: [],
            };
            const refs = [];
            const selectors = [];
            refsAndSelectors.forEach((refOrSelector) => {
                if (typeof refOrSelector === 'string') {
                    selectors.push(refOrSelector);
                }
                else {
                    refs.push(refOrSelector);
                }
            });
            if (!refs.length && !selectors.length) {
                return;
            }
            const isClickInsideSomeRef = refs.some((ref) => {
                if (ref.current) {
                    const isClickedInside = ref.current.contains(target);
                    if (options.debug) {
                        debugReport.refsAndSelectors.push(cloneDeep({ refOrSelector: ref, nodes: ref.current, isClickedInside }));
                    }
                    return isClickedInside;
                }
                return false;
            });
            const isClickInsideSomeSelector = selectors.some((selector) => {
                const selectorElements = Array.from(document.querySelectorAll(selector));
                const isClickedInside = selectorElements.some((element) => element.contains(target));
                if (options.debug) {
                    debugReport.refsAndSelectors.push(cloneDeep({ refOrSelector: selector, nodes: selectorElements, isClickedInside }));
                }
                return isClickedInside;
            });
            const isClickedInside = isClickInsideSomeRef || isClickInsideSomeSelector;
            if (!isClickedInside) {
                savedHandler.current(event, debugReport);
            }
        };
        window.addEventListener(options.eventType, listener);
        return () => {
            window.removeEventListener(options.eventType, listener);
        };
    }, [refsAndSelectors, options.isActive, options.eventType, options.debug]);
};
//# sourceMappingURL=useOnClickOutside.js.map