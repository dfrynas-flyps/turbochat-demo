import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { VAR_INPUT_EXTENSION_NAME, VAR_INPUT_TAG_NAME } from '../../types/templates'
import VarInput from '../VarInput'

export default Node.create({
  name: VAR_INPUT_EXTENSION_NAME,
  inline: true,
  group: 'inline',

  addAttributes() {
    return {
      name: {
        default: null,
        parseHTML: (element) => element.getAttribute('name'),
        renderHTML: (attributes) => {
          return {
            name: attributes.name,
          }
        },
      },
      value: {
        default: null,
        parseHTML: (element) => element.getAttribute('value'),
        renderHTML: (attributes) => {
          return {
            value: attributes.value,
          }
        },
      },
      displayId: {
        default: null,
        parseHTML: (element) => element.getAttribute('displayId'),
        renderHTML: (attributes) => {
          return {
            displayId: attributes.displayId,
          }
        },
      },
      statementId: {
        default: null,
        renderHTML: (attributes) => {
          return {
            statementId: attributes.statementId,
          }
        },
      },
      sectionId: {
        default: null,
        renderHTML: (attributes) => {
          return {
            sectionId: attributes.sectionId,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: VAR_INPUT_TAG_NAME,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [VAR_INPUT_TAG_NAME, HTMLAttributes]
  },

  addNodeView() {
    return ReactNodeViewRenderer(VarInput)
  },
})
