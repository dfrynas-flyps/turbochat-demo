import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import { v4 as uuid } from 'uuid'

import { getEditorDetailsBasedOnCursorPosition } from '../../../helpers/editor'
import { editorHtmlToStatementText } from '../../../helpers/parseTemplateStatements'
import { addNewStatement, updateStatement } from '../../../redux'
import { selectActiveStatement, selectStatementById } from '../../../redux/selectors'
import reduxStore from '../../../redux/store'
import { StatementTypes } from '../../../types/editor'

const StatementEnterExtension = Extension.create({
  name: 'enter',
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }: { editor: Editor }) => {
        const activeStatement = selectActiveStatement(reduxStore.getState())

        if (!activeStatement) {
          return false
        }

        const currentStatement = selectStatementById(reduxStore.getState(), activeStatement.id)

        if (!currentStatement) {
          return false
        }

        const {
          isCursorAtTheBeginning: withoutTypeoverIsCursorAtTheBeginning,
          isCursorAtTheEnd: withoutTypeoverIsCursorAtTheEnd,
          isCursorInTheMiddle,
          beforeCursorHtml,
          afterCursorHtml,
          beforeCursorJSON,
        } = getEditorDetailsBasedOnCursorPosition(editor)

        const isCursorAtTheBeginning = withoutTypeoverIsCursorAtTheBeginning
        const isCursorAtTheEnd = withoutTypeoverIsCursorAtTheEnd

        const isTextOrListStatement = currentStatement.type && !['table', 'image'].includes(currentStatement.type)

        // NOTE: Create new empty statement
        if (isTextOrListStatement) {
          if (isCursorAtTheBeginning) {
            reduxStore.dispatch(addNewStatement({ id: uuid(), type: StatementTypes.TEXT, mode: 'prepend' }))
            return true
          }

          if (isCursorAtTheEnd) {
            reduxStore.dispatch(addNewStatement({ id: uuid(), type: StatementTypes.TEXT, mode: 'append' }))
            return true
          }
        }

        // NOTE: Split a statement
        if (isCursorInTheMiddle && isTextOrListStatement) {
          reduxStore.dispatch(
            updateStatement({
              id: currentStatement.id,
              updatePayload: { text: editorHtmlToStatementText(beforeCursorHtml) },
            })
          )
          editor.commands.setContent(beforeCursorJSON)

          if (currentStatement.type) {
            reduxStore.dispatch(
              addNewStatement({
                ...currentStatement,
                id: uuid(),
                type: currentStatement.type,
                text: editorHtmlToStatementText(afterCursorHtml),
                mode: 'append',
              })
            )
          }

          return true
        }

        // Let the enter work normally in tables
        if (currentStatement.type === 'table') {
          return false
        }

        return true
      },
    }
  },
})

export default StatementEnterExtension
