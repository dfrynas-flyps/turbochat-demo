import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { debounce } from 'lodash'
import { v4 as uuid } from 'uuid'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { EditorContent, type EditorEvents, useEditor } from '@tiptap/react'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useIndentLevel } from '../hooks/useIndentLevel'
import { useRefState } from '../hooks/useRefState'
import { useUpdateTemplateData } from '../hooks/useUpdateTemplateData'
import { editorHtmlToStatementText, formatStatementText } from '../helpers/parseTemplateStatements'
import {
  addNewStatement,
  // getTitle,
  setActiveSection,
  setActiveStatement,
  setNewStatement,
  updateStatement,
} from '../redux'
// import { DEFAULT_STATEMENT_TITLE, LoadState } from '../redux/helpers'
import {
  selectActiveSectionId,
  selectActiveStatement,
  selectNewStatement,
  selectProjectData,
  selectVariableRegistry,
} from '../redux/selectors'
import { StatementTypes, type TemplateStatement, isListStatement } from '../types/editor'
import DynamicToolbar, { Divider } from './DynamicToolbar'
import { useEditorTabNavigation } from './EditorTabNavigation'
import { useSectionContext } from './SectionContext'
import { useStatementContext } from './StatementContext'
import VariableToggleButton from './VariableToggleButton'
import CustomImage from './common/RichTextEditor/ImageExtension'
import StatementEnterExtension from './common/RichTextEditor/StatementEnterExtension'
import CustomTable from './common/RichTextEditor/TableExtension'
import TableWrapper from './common/RichTextEditor/TableWrapperExtension'
import BackspaceExtension, { getEditorsCurrentNodeLength } from './tiptap-extensions/BackspaceExtension'
import VarInputExtension from './tiptap-extensions/VarInputExtension'

type ListStyleType = 'none' | 'disc' | 'decimal'

const CustomListItem = ListItem.extend({
  addKeyboardShortcuts() {
    return {
      'Shift-Enter': () => {
        this.editor.commands.splitListItem('listItem')
        return true
      },
    }
  },
})

const RichTextEditor: React.FC = () => {
  const activeSectionId = useAppSelector(selectActiveSectionId)
  const activeStatement = useAppSelector(selectActiveStatement)
  const projectData = useAppSelector(selectProjectData)
  const newStatement = useAppSelector(selectNewStatement)
  const variableRegistry = useAppSelector(selectVariableRegistry)
  const [, setInitialContent] = useRefState<string | null>(null)

  const statementEditorRef = useRef<HTMLDivElement>(null)

  const { section } = useSectionContext()
  const { statement, statementIndex, isStatementActive } = useStatementContext()
  const { setTabNavigationNode } = useEditorTabNavigation()

  const { sendData } = useUpdateTemplateData()
  const dispatch = useAppDispatch()

  const listStyleType: ListStyleType = useMemo(() => {
    if (!isListStatement(statement)) {
      return 'none'
    }

    const previousStatement = section.statements[statementIndex - 1] as TemplateStatement | undefined
    const isFirstInSection = !previousStatement
    const isPreviousDifferentType = previousStatement?.type !== statement.type
    const isPreviousLastInList = previousStatement?.last_statement

    if (isFirstInSection || isPreviousDifferentType || isPreviousLastInList) {
      if (statement.type === StatementTypes.ORDERED_LIST) {
        return 'decimal'
      }

      if (statement.type === StatementTypes.UNORDERED_LIST) {
        return 'disc'
      }
    }

    return 'none'
  }, [section.statements, statement, statementIndex])

  const orderedListItemIndex = useMemo((): number | null => {
    if (statement.type !== StatementTypes.ORDERED_LIST) {
      return null
    }

    let currentListItemIndex = 1
    const previousStatements = section.statements.slice(0, statementIndex).reverse()
    for (const previousStatement of previousStatements) {
      if (previousStatement.type !== statement.type) {
        break
      }

      if (previousStatement.type === statement.type && previousStatement.last_statement) {
        currentListItemIndex++
      }
    }

    return currentListItemIndex
  }, [section, statement.type, statementIndex])

  const getEditorContent = useCallback(() => {
    if (statement.type === StatementTypes.IMAGE) {
      const imageUrl = statement.imageUrl
      if (imageUrl) {
        return `<img src="${imageUrl}" />`
      }
    }

    return formatStatementText({
      statement,
      sectionId: section.id,
      variableRegistry,
      projectData,
      variableOutput: statement.turnOffVariables ? 'decorated' : 'editable',
    })
  }, [statement, section.id, variableRegistry, projectData])

  const debouncedStatementUpdate = useMemo(
    () =>
      debounce((newText: string) => {
        dispatch(updateStatement({ id: statement.id, updatePayload: { text: newText } }))
      }, 500),
    [dispatch, statement.id]
  )

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        Document,
        Text,
        Paragraph,
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        CustomListItem,
        TableWrapper,
        CustomTable.configure({
          resizable: true,
        }),
        TableCell,
        TableHeader,
        TableRow,
        CustomImage.configure({
          statement,
        }),
        History,
        CharacterCount.configure({
          mode: 'nodeSize',
        }),
        VarInputExtension,
        StatementEnterExtension,
        BackspaceExtension,
      ],
      content: getEditorContent(),
      onUpdate: (updateEvent: EditorEvents['update']) => {
        const text = editorHtmlToStatementText(updateEvent.editor.getHTML())
        debouncedStatementUpdate(text)

        // if (statement.nameStatus === LoadState.Placeholder && updateEvent.editor.storage.characterCount.words() > 20) {
        //   dispatch(getTitle({ text, statementId: statement.id }))
        // }
      },
    },
    [statement.turnOffVariables]
  )

  useEffect(() => {
    if (editor && statement._triggerUpdate) {
      editor?.commands.setContent(getEditorContent())
      dispatch(
        updateStatement({
          id: statement.id,
          updatePayload: { _triggerUpdate: false },
          shouldSave: false,
        })
      )
    }
  }, [dispatch, editor, getEditorContent, statement.id, statement._triggerUpdate])

  useEffect(() => {
    if (!editor || activeStatement?.id !== statement.id) return

    if (typeof statement._focusPositionFromContentEnd === 'number') {
      if (statement._focusPositionFromContentEnd === -1) {
        editor.commands.focus('start')
      } else {
        const currentNodeLength = getEditorsCurrentNodeLength(editor)
        const newFocusPosition = currentNodeLength - statement._focusPositionFromContentEnd

        editor.commands.focus(newFocusPosition)
        dispatch(
          updateStatement({
            id: statement.id,
            updatePayload: { _focusPositionFromContentEnd: null },
            shouldSave: false,
          })
        )
      }
    }
  }, [statement.id, statement._focusPositionFromContentEnd, activeStatement?.id, editor, dispatch])

  useEffect(() => {
    if (!editor || !newStatement) {
      return
    }

    if (newStatement.id === statement.id) {
      sendData()

      if (newStatement.mode === 'append') {
        editor.chain().focus('start')
      }

      dispatch(setNewStatement(null))

      if (newStatement.type === 'table' && !newStatement.text) {
        editor.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: false }).run()
      }

      if (newStatement.type === 'image' && newStatement.imageUrl) {
        editor.chain().focus().setImage({ src: newStatement.imageUrl }).run()
      }
    }
  }, [dispatch, editor, newStatement, sendData, statement.id])

  const handleAddTable = () => {
    dispatch(addNewStatement({ id: uuid(), type: StatementTypes.TABLE, mode: 'append' }))
  }

  const onUnorderedListToggle = useCallback(() => {
    const isStatementTypeUnorderedList = statement.type === StatementTypes.UNORDERED_LIST
    if (isStatementTypeUnorderedList) {
      dispatch(updateStatement({ id: statement.id, updatePayload: { type: StatementTypes.TEXT } }))
    } else {
      dispatch(
        updateStatement({
          id: statement.id,
          updatePayload: { type: StatementTypes.UNORDERED_LIST },
        })
      )
    }
  }, [dispatch, statement.id, statement.type])

  const onOrderedListToggle = useCallback(() => {
    if (statement.type === StatementTypes.ORDERED_LIST) {
      dispatch(updateStatement({ id: statement.id, updatePayload: { type: StatementTypes.TEXT } }))
    } else {
      dispatch(updateStatement({ id: statement.id, updatePayload: { type: StatementTypes.ORDERED_LIST } }))
    }
  }, [dispatch, statement.id, statement.type])

  const handleAddImage = (imageUrl: string) => {
    dispatch(addNewStatement({ id: uuid(), type: StatementTypes.IMAGE, imageUrl, mode: 'append' }))
  }

  const onStatementClick = useCallback(() => {
    if (!isStatementActive && statement.typeoverMode && statementEditorRef.current) {
      const selection = window.getSelection()
      const selectAllRange = document.createRange()
      const statementContent = statementEditorRef.current.childNodes[0] as HTMLElement

      selectAllRange.selectNodeContents(statementContent)

      if (selection) {
        selection.removeAllRanges()
        selection.addRange(selectAllRange)
      }

      setTabNavigationNode(statementEditorRef.current)
    }

    if (editor) {
      setInitialContent(editor.getHTML())
    }

    if (!isStatementActive) {
      dispatch(setActiveStatement({ id: statement.id }))
    }
    if (activeSectionId !== section.id) {
      dispatch(setActiveSection({ id: section.id }))
    }
  }, [
    isStatementActive,
    statement.typeoverMode,
    statement.id,
    editor,
    activeSectionId,
    section.id,
    setTabNavigationNode,
    setInitialContent,
    dispatch,
  ])

  // const onStatementBlur = useCallback(() => {
  //   if (!editor) return
  //
  //   const editorContent = editor.getHTML()
  //   if (
  //     (statement.nameStatus === LoadState.Placeholder || statement.name === DEFAULT_STATEMENT_TITLE) &&
  //     editor.storage.characterCount.words()
  //   ) {
  //     dispatch(getTitle({ text: editorHtmlToStatementText(editorContent), statementId: statement.id }))
  //   }
  // }, [dispatch, editor, getInitialContent, statement.id, statement.name, statement.nameStatus])

  const indentFeature = useIndentLevel(statement)

  return (
    <StyledTypeoverLabelContainer>
      {statement.typeoverMode && (
        <TypeoverLabel>
          Please provide 1-2 sentence description
          {statement.name && ` of ${statement.name}`}
        </TypeoverLabel>
      )}

      <StyledEditor
        editor={editor}
        orderedListItemIndex={orderedListItemIndex}
        isList={isListStatement(statement)}
        listStyleType={listStyleType}
        isTable={statement.type === 'table'}
        isTypeover={Boolean(statement.typeoverMode)}
        isOptional={Boolean(statement.optionalStatement)}
        spellCheck="false"
        ref={statementEditorRef}
        onClick={onStatementClick}
        // onBlur={onStatementBlur}
        {...(statement.typeoverMode && { 'data-tab-navigation': 'click' })}
        indentLevelInPx={indentFeature.indentLevelInPx}
      />

      <DynamicToolbar
        isOpen={isStatementActive}
        editor={editor}
        handleAddTable={handleAddTable}
        handleUnorderedListToggle={onUnorderedListToggle}
        handleOrderedListToggle={onOrderedListToggle}
        handleAddImage={handleAddImage}
        isOrderedListActive={statement.type === StatementTypes.ORDERED_LIST}
        isUnorderedListActive={statement.type === StatementTypes.UNORDERED_LIST}
        indentFeature={indentFeature}
      >
        <>
          {!statement.typeoverMode && editor && (
            <VariableToggleButton
              editor={editor}
              sectionId={section.id}
              statementId={statement.id}
              onVariableRemove={() => {
                dispatch(updateStatement({ id: statement.id, updatePayload: { text: editor.getHTML() } }))
              }}
            />
          )}
          {editor?.can().deleteRow() && (
            <>
              <Divider />
              <TableBtn
                onClick={() => {
                  editor.commands.deleteRow()
                }}
              >
                Delete row
              </TableBtn>
            </>
          )}
          {editor?.can().deleteColumn() && (
            <TableBtn
              onClick={() => {
                editor.commands.deleteColumn()
              }}
            >
              Delete column
            </TableBtn>
          )}
        </>
      </DynamicToolbar>
    </StyledTypeoverLabelContainer>
  )
}

export default RichTextEditor

const StyledTypeoverLabelContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '80px',
  width: '100%',
}))

const shouldForwardProp = (prop: string) =>
  ![
    'isTable',
    'isList',
    'listStyleType',
    'orderedListItemIndex',
    'isTypeover',
    'isOptional',
    'indentLevelInPx',
  ].includes(prop)

interface StyledEditorType {
  isTable: boolean
  isList: boolean
  listStyleType: ListStyleType
  orderedListItemIndex: number | null
  isTypeover?: boolean
  isOptional: boolean
  indentLevelInPx: number
}

const StyledEditor = styled(EditorContent, { shouldForwardProp })<StyledEditorType>(
  ({ theme, isTable, isList, listStyleType, orderedListItemIndex, isTypeover, isOptional, indentLevelInPx }) => ({
    width: 'calc(100% - 36px)',
    minHeight: '80px',
    overflowX: 'hidden',
    ...(isTable && {
      overflowX: 'scroll',
    }),
    ...(isList && {
      overflowX: 'visible',
    }),

    '& .tiptap': {
      ...(!isList && { marginLeft: `${indentLevelInPx}px` }),
      minWidth: '1px',
      width: `calc(100% - ${indentLevelInPx}px)`,
      '& p': {
        display: 'inline',
      },
      '& table': {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        fontSize: '14px',
        lineHeight: '20px',
      },
      '& ul': {
        paddingLeft: '20px',
      },
      '& th': {
        textAlign: 'left',
      },
      '& tr, & td, & th': {
        border: `1px solid #EAEBEE`,
      },
      '& td, & th': {
        position: 'relative',
        minWidth: '217px',
        padding: '10px 16px',

        '&:focus-within, &:focus': {
          outline: `4px solid ${theme.palette.primary[200]}`,
        },
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
      },
      '& .column-resize-handle': {
        position: 'absolute',
        right: '-2px',
        top: 0,
        bottom: '-2px',
        width: '2px',
        backgroundColor: theme.palette.primary[500],
        pointerEvents: 'none',
      },
      '& span.variable-preview': {
        backgroundColor: theme.palette.info[100],
      },
      ...(isTypeover && {
        textDecorationLine: 'underline',
        textDecorationThickness: '1px',
        textDecorationStyle: 'solid',
        textDecorationColor: theme.palette.grey[200],
        textUnderlineOffset: '8px',
        color: theme.palette.grey[600],
      }),

      ...(isOptional && {
        '& p': {
          display: 'inline',
          backgroundColor: 'rgba(248, 249, 249, 1)',
          color: 'rgba(80, 83, 88, 1)',
        },
      }),

      '& [contenteditable="false"] [contenteditable="true"]': {
        whiteSpace: 'normal',
      },
    },
    '& .tiptap:focus-within': {
      outline: 'none',
    },
    '& .resize-cursor': {
      cursor: 'col-resize',
    },

    ...(isList && {
      display: 'list-item',
      margin: '-10px 0 0 20px',
      marginLeft: `${indentLevelInPx}px`,
      paddingLeft: '10px',
      listStyleType,

      '.tiptap': {
        display: 'block',
      },

      ...(orderedListItemIndex &&
        listStyleType === 'decimal' && {
          '&::marker': {
            content: `"${orderedListItemIndex}."`,
          },
        }),
    }),
  })
)

const TableBtn = styled(Button)(() => ({
  fontSize: '12px',
  fontWeight: '500',
  color: '#fff',
  margin: '0 8px',
}))

const TypeoverLabel = styled('span')(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
}))
