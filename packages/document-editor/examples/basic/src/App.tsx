import { EditorContainer, setApiAdapter } from '@wildfires-org/document-editor'
import { useEffect } from 'react'
import { SimpleApiAdapter } from './SimpleApiAdapter'

export default function App() {
  useEffect(() => {
    setApiAdapter(new SimpleApiAdapter())
  }, [])

  return (
    <div style={{ margin: '2rem auto', maxWidth: '892px', border: '1px solid #ccc' }}>
      <EditorContainer id="example-template" />
    </div>
  )
}
