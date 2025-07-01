import { useCallback, useEffect } from 'react'

export const useCustomEventEmitter = <T>() => {
  const emit = useCallback((eventName: string, detail: T = {} as T) => {
    const event = new CustomEvent(eventName, { detail })
    document.dispatchEvent(event)
  }, [])

  return emit
}

export const useCustomEventListener = <T = unknown>(
  eventName: string | null,
  callback: (event: CustomEvent<T>) => void
) => {
  useEffect(() => {
    if (!eventName) return

    const handler: EventListener = (event: Event) => {
      callback(event as CustomEvent<T>)
    }

    document.addEventListener(eventName, handler)

    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [eventName, callback])
}
