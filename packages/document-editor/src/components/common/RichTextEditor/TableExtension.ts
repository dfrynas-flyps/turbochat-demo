import { default as TableExtension, createTable } from '@tiptap/extension-table'
import { TextSelection } from '@tiptap/pm/state'

// Needed to override insertTable and deleteTable because of the bug reported here: https://github.com/ueberdosis/tiptap/issues/2892
// It can be probably simplified when version 2.2.0 is released with this change: https://github.com/ueberdosis/tiptap/pull/3984
const Table = TableExtension.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      insertTable:
        ({ rows, cols, withHeaderRow } = {}) =>
        ({ editor, commands, tr, dispatch }) => {
          const node = createTable(editor.schema, rows ?? 1, cols ?? 1, Boolean(withHeaderRow))

          if (dispatch) {
            const offset = tr.selection.anchor + 1
            commands.insertContent({
              type: 'table-wrapper',
              content: [node.toJSON()],
            })

            tr.scrollIntoView().setSelection(TextSelection.near(tr.doc.resolve(offset)))
          }

          return true
        },
      deleteTable:
        () =>
        ({ state, dispatch }) => {
          const $pos = state.selection.$anchor
          for (let d = $pos.depth; d > 0; d--) {
            const node = $pos.node(d)
            if (node.type.name === 'table-wrapper') {
              if (dispatch) {
                dispatch(state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView())
              }
              return true
            }
          }
          return false
        },
    }
  },
})

export default Table
