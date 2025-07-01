import { useCallback, useEffect, useRef } from 'react'

type BoundsChangeHandler = (args: {
  changedRect: DOMRect
  changedElement: HTMLElement
  allObservedElements: HTMLElement[]
}) => void

interface UseBoundsObserverReturn {
  observe: (elements: HTMLElement[]) => void
  disconnect: () => void
}

type ObserverArgs = {
  onRectChange: BoundsChangeHandler
  compareFunction?: (rect1: DOMRect, rect2: DOMRect) => boolean
}

const TARGET_FPS = 60

/**
 * This hook observes the bounding client rect of the provided elements and triggers a callback when the rect changes.
 * It observes the absolute position of the elements, so it doesn't trigger during scrolling.
 */
export const useBoundingClientRectObserver = ({
  onRectChange,
  compareFunction = defaultRectCompare,
}: ObserverArgs): UseBoundsObserverReturn => {
  const rafId = useRef<number | null>(null)
  const previousRects = useRef<Map<HTMLElement, DOMRect>>(new Map())
  const observedElements = useRef<Set<HTMLElement>>(new Set())
  const lastFrameTime = useRef<number>(performance.now())

  const checkBounds = useCallback(
    (currentTime: number = performance.now()) => {
      const deltaTime = currentTime - lastFrameTime.current

      if (deltaTime > 1000 / TARGET_FPS) {
        observedElements.current.forEach((element) => {
          const previousRect = previousRects.current.get(element)
          const currentRect = getAbsoluteRect(element)

          if (!previousRect || compareFunction(previousRect, currentRect)) {
            previousRects.current.set(element, currentRect)
            onRectChange({
              changedRect: currentRect,
              changedElement: element,
              allObservedElements: Array.from(observedElements.current),
            })
          }
        })

        lastFrameTime.current = currentTime
      }

      rafId.current = requestAnimationFrame(checkBounds)
    },
    [compareFunction, onRectChange]
  )

  const forceTriggerRectChange = useCallback(
    (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        const currentRect = getAbsoluteRect(element)

        previousRects.current.set(element, currentRect)
        onRectChange({
          changedRect: currentRect,
          changedElement: element,
          allObservedElements: elements,
        })
      })
    },
    [onRectChange]
  )

  const observe = useCallback(
    (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        if (element && !observedElements.current.has(element)) {
          observedElements.current.add(element)
          previousRects.current.set(element, getAbsoluteRect(element))
        }
      })

      if (observedElements.current.size > 0 && !rafId.current) {
        rafId.current = requestAnimationFrame(checkBounds)
      }

      forceTriggerRectChange(elements)
    },
    [checkBounds, forceTriggerRectChange]
  )

  const disconnect = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    observedElements.current.clear()
    previousRects.current.clear()
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return { observe, disconnect }
}

const defaultRectCompare = (rect1: DOMRect, rect2: DOMRect): boolean => {
  return (
    rect1.x !== rect2.x ||
    rect1.y !== rect2.y ||
    rect1.width !== rect2.width ||
    rect1.height !== rect2.height ||
    rect1.top !== rect2.top ||
    rect1.right !== rect2.right ||
    rect1.bottom !== rect2.bottom ||
    rect1.left !== rect2.left
  )
}

const getAbsoluteRect = (element: HTMLElement): DOMRect => {
  const rect = element.getBoundingClientRect()
  return new DOMRect(rect.x + window.scrollX, rect.y + window.scrollY, rect.width, rect.height)
}
