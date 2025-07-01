type UseRefState<T> = [() => T, (newValue: T | ((prevValue: T) => T)) => void];
/**
 * Simple hook to simplify `useRef` interface in case you want to store a value, but avoid re-renders.
 * Beware that returning `[value.current, setValue]` will cause bugs - you need a getter
 */
export declare const useRefState: <T>(initialValue: T) => UseRefState<T>;
export {};
//# sourceMappingURL=useRefState.d.ts.map