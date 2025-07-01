import { ThemeProvider } from '@mui/material'
import React, { useContext } from 'react'
import { Provider } from 'react-redux'

import reduxStore from '../redux/store'
import theme from '../styles/theme'
import { EditorWrapper } from './EditorWrapper'

interface EditorContainerProps {
  id: string
  // Preview mode means the editor is displayed as a preview/thumbnail, without any editable features (read-only)
  isPreviewMode?: boolean
}

const EditorContext = React.createContext({ isPreviewMode: false })

export const EditorContainer: React.FC<EditorContainerProps> = ({ id, isPreviewMode = false }) => {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <EditorContext.Provider value={{ isPreviewMode }}>
          <EditorWrapper id={id} />
        </EditorContext.Provider>
      </ThemeProvider>
    </Provider>
  )
}

export const useEditorContext = () => {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error('useEditorContext must be used within EditorContext')
  }
  return context
}
