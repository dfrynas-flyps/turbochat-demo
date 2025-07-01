import { useCallback, useRef } from 'react'

type UseRefState<T> = [() => T, (newValue: T | ((prevValue: T) => T)) => void]

/**
 * Simple hook to simplify `useRef` interface in case you want to store a value, but avoid re-renders.
 * Beware that returning `[value.current, setValue]` will cause bugs - you need a getter
 */
export const useRefState = <T>(initialValue: T): UseRefState<T> => {
  const value = useRef<T>(initialValue)

  const getValue = useCallback((): T => {
    return value.current
  }, [])

  const setValue = useCallback((newValue: T | ((prevValue: T) => T)) => {
    if (typeof newValue === 'function') {
      value.current = (newValue as (prevValue: T) => T)(value.current)
    } else {
      value.current = newValue
    }
  }, [])

  return [getValue, setValue]
}
