import { Editor as CoreEditor, JSONContent } from '@tiptap/core'
import { generateHTML } from '@tiptap/html'
import { Node as ProseMirrorNode, Slice } from '@tiptap/pm/model'
import { Editor as ReactEditor } from '@tiptap/react'

import { VARIABLE_WRAPPER_SELECTOR } from '../../types/templates'

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type Editor = CoreEditor | ReactEditor

/**
 * This function travels through TipTap editor content and recursively extracts desired nodes.
 */
export const getEditorNodes = (content: JSONContent, desiredNodeType: string): JSONContent[] => {
  let results: JSONContent[] = []

  if (content.type === desiredNodeType) {
    results = [...results, content]
  }

  if (content.content) {
    for (const nestedContent of content.content) {
      results = [...results, ...getEditorNodes(nestedContent, desiredNodeType)]
    }
  }

  return results
}

/**
 * This function travels through TipTap editor nodes and recursively calls a `nodeReplacer` for each node.
 */
export const replaceEditorNodes = (
  content: JSONContent,
  nodeReplacer: (node: JSONContent) => JSONContent
): JSONContent => {
  const results: JSONContent = { ...content }

  if (results.content) {
    results.content = results.content.map((nestedContent) => replaceEditorNodes(nestedContent, nodeReplacer))
  }

  return nodeReplacer(results)
}

export const getDocumentSlice = (editor: Editor, slice: Slice): ProseMirrorNode => {
  const rootNodeJson = editor.state.doc.toJSON()
  const sliceJSON = { ...rootNodeJson, content: slice.content.toJSON() }
  return ProseMirrorNode.fromJSON(editor.state.schema, sliceJSON)
}

export const generateSliceHTML = (editor: Editor, slice: Slice): string => {
  const documentSlice = getDocumentSlice(editor, slice)
  return generateHTML(documentSlice.toJSON(), editor.extensionManager.extensions)
}

export const getEditorDetailsBasedOnCursorPosition = (editor: Editor) => {
  const { $from, $to } = editor.state.selection

  const rootNode = editor.state.doc
  const beforeCursorSlice = rootNode.slice(0, $from.pos)
  const afterCursorSlice = rootNode.slice($to.pos)

  const beforeCursorDoc = getDocumentSlice(editor, beforeCursorSlice)
  const afterCursorDoc = getDocumentSlice(editor, afterCursorSlice)

  const beforeCursorJSON = beforeCursorDoc.toJSON()
  const afterCursorJSON = afterCursorDoc.toJSON()

  const isCursorAtTheBeginning = beforeCursorDoc.textContent.replaceAll(' ', '').length === 0
  const isCursorAtTheEnd = afterCursorDoc.textContent.replaceAll(' ', '').length === 0

  const isCursorInTheMiddle = !isCursorAtTheBeginning && !isCursorAtTheEnd

  const beforeCursorHtml = generateSliceHTML(editor, beforeCursorSlice)
  const afterCursorHtml = generateSliceHTML(editor, afterCursorSlice)

  return {
    isCursorAtTheBeginning,
    isCursorAtTheEnd,
    isCursorInTheMiddle,
    beforeCursorHtml,
    afterCursorHtml,
    beforeCursorDoc,
    afterCursorDoc,
    beforeCursorJSON,
    afterCursorJSON,
    $from,
    $to,
  }
}

export const selectFirstVariableNode = async () => {
  const firstVariableNode = document.querySelectorAll<HTMLElement>(VARIABLE_WRAPPER_SELECTOR).item(0) as HTMLElement
  firstVariableNode?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  await wait(500)

  const firstVariableNodeChild = firstVariableNode?.firstElementChild as HTMLElement
  firstVariableNodeChild?.focus()
}
