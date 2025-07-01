import React, { useCallback, useContext, useEffect } from 'react'

import { useCustomEventEmitter } from '../hooks/useCustomEvent'
import { useRefState } from '../hooks/useRefState'

type EditorTabNavigationProps = {
  children: React.ReactNode
}

type EditorTabNavigationContextProps = {
  setTabNavigationNode: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  getTabNavigationNode: () => HTMLElement | null
}

export const EditorTabNavigationContext = React.createContext<EditorTabNavigationContextProps>(
  {} as EditorTabNavigationContextProps
)

export const EditorTabNavigation: React.FC<EditorTabNavigationProps> = ({ children }) => {
  const [getSelectedNode, setSelectedNode] = useRefState<HTMLElement | null>(null)
  const emitCustomEvent = useCustomEventEmitter()

  const getAllTabNavigationNodes = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>(`[data-tab-navigation]`)
    return Array.from(nodes)
  }, [])

  const closeActiveAutocomplete = useCallback(() => {
    const currentNode = getSelectedNode() as HTMLElement
    const currentNodeId = currentNode
      .querySelector('[data-variable-display-id]')
      ?.getAttribute('data-variable-display-id')
    if (currentNodeId) {
      emitCustomEvent(`closeAutocomplete-${currentNodeId}`)
    }
  }, [emitCustomEvent, getSelectedNode])

  const simulateClick = useCallback(
    (element: HTMLElement) => {
      closeActiveAutocomplete()

      window.getSelection()?.removeAllRanges()

      const clickMethod = element.getAttribute('data-tab-navigation')

      if (clickMethod === 'focus') {
        element.focus()
      } else {
        element.click()
      }

      if (!isElementInViewport(element)) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    [closeActiveAutocomplete]
  )

  const isElementInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const goToNext = useCallback((): void => {
    const selectedNode = getSelectedNode()
    const allTabNavigationNodes = getAllTabNavigationNodes()
    const currentIndex = allTabNavigationNodes.findIndex((tabNavigationNode) => tabNavigationNode === selectedNode)

    if (currentIndex !== -1) {
      if (currentIndex === allTabNavigationNodes.length - 1) {
        simulateClick(allTabNavigationNodes[0])
      } else {
        simulateClick(allTabNavigationNodes[currentIndex + 1])
      }
    }
  }, [getAllTabNavigationNodes, getSelectedNode, simulateClick])

  const goToPrevious = useCallback((): void => {
    const selectedNode = getSelectedNode()
    const allTabNavigationNodes = getAllTabNavigationNodes()

    const currentIndex = allTabNavigationNodes.findIndex((tabNavigationNode) => tabNavigationNode === selectedNode)

    if (currentIndex !== -1) {
      if (currentIndex === 0) {
        simulateClick(allTabNavigationNodes[allTabNavigationNodes.length - 1])
      } else {
        simulateClick(allTabNavigationNodes[currentIndex - 1])
      }
    }
  }, [getAllTabNavigationNodes, getSelectedNode, simulateClick])

  const handleTabNavigation = useCallback(
    (event: KeyboardEvent) => {
      const selectedNode = getSelectedNode()

      if (event.key === 'Tab' && selectedNode) {
        event.preventDefault()
        event.stopPropagation()

        if (event.shiftKey) {
          goToPrevious()
        } else {
          goToNext()
        }
      }
    },
    [getSelectedNode, goToNext, goToPrevious]
  )

  useEffect(() => {
    addEventListener('keydown', handleTabNavigation)
    return () => {
      removeEventListener('keydown', handleTabNavigation)
    }
  }, [handleTabNavigation])

  return (
    <EditorTabNavigationContext.Provider
      value={{ setTabNavigationNode: setSelectedNode, getTabNavigationNode: getSelectedNode }}
    >
      {children}
    </EditorTabNavigationContext.Provider>
  )
}

export const useEditorTabNavigation = () => {
  const context = useContext(EditorTabNavigationContext)

  if (!context) {
    throw new Error('useEditorTabNavigation must be used within EditorTabNavigationContext')
  }
  return context
}
