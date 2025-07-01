import { useCallback, useRef } from 'react';
/**
 * Simple hook to simplify `useRef` interface in case you want to store a value, but avoid re-renders.
 * Beware that returning `[value.current, setValue]` will cause bugs - you need a getter
 */
export const useRefState = (initialValue) => {
    const value = useRef(initialValue);
    const getValue = useCallback(() => {
        return value.current;
    }, []);
    const setValue = useCallback((newValue) => {
        if (typeof newValue === 'function') {
            value.current = newValue(value.current);
        }
        else {
            value.current = newValue;
        }
    }, []);
    return [getValue, setValue];
};
//# sourceMappingURL=useRefState.js.map