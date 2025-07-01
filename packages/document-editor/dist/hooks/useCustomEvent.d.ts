export declare const useCustomEventEmitter: <T>() => (eventName: string, detail?: T) => void;
export declare const useCustomEventListener: <T = unknown>(eventName: string | null, callback: (event: CustomEvent<T>) => void) => void;
//# sourceMappingURL=useCustomEvent.d.ts.map