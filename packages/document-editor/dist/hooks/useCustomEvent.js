import { useCallback, useEffect } from 'react';
export const useCustomEventEmitter = () => {
    const emit = useCallback((eventName, detail = {}) => {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }, []);
    return emit;
};
export const useCustomEventListener = (eventName, callback) => {
    useEffect(() => {
        if (!eventName)
            return;
        const handler = (event) => {
            callback(event);
        };
        document.addEventListener(eventName, handler);
        return () => {
            document.removeEventListener(eventName, handler);
        };
    }, [eventName, callback]);
};
//# sourceMappingURL=useCustomEvent.js.map