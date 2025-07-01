import { Editor as CoreEditor } from '@tiptap/core'
import { Editor as ReactEditor } from '@tiptap/react'
import { forwardRef, useCallback, useMemo, useRef } from 'react'

import { Box, Portal, SxProps } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

import { ToolbarPosition, useToolbarPosition } from '../hooks/useToolbarPosition'
import ImageUpload from './common/RichTextEditor/ImageUpload'
import { Tooltip } from './common/Tooltip'
import BoldIcon from './icons/BoldIcon'
import BulletListIcon from './icons/BulletListIcon'
import ItalicIcon from './icons/ItalicIcon'
import OrderedListIcon from './icons/OrderedListIcon'
import TableIcon from './icons/TableIcon'
import UnderlineIcon from './icons/UnderlineIcon'

import { getApiAdapter } from '../api-adapter'
import { useAppSelector } from '../hooks/redux'
import { useCustomEventEmitter } from '../hooks/useCustomEvent'
import { IndentLevelFeature } from '../hooks/useIndentLevel'
import { selectActiveVar } from '../redux/selectors'
import { AUTOFILLED_VARIABLES, VAR_INPUT_EXTENSION_NAME } from '../types/templates'
import { DecreaseIndentIcon } from './icons/DecreaseIndentIcon'
import { IncreaseIndentIcon } from './icons/IncreaseIndentIcon'
import SparklesIcon from './icons/SparklesIcon'

type Editor = CoreEditor | ReactEditor

type ButtonTypes =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'orderedList'
  | 'unorderedList'
  | 'justify'
  | 'table'
  | 'undo'
  | 'redo'
  | 'link'

type ToolbarProps = {
  children?: React.ReactNode
  editor: Editor | null
  background?: string
  handleAddTable?: () => void
  handleUnorderedListToggle?: () => void
  handleOrderedListToggle?: () => void
  handleAddImage?: (url: string) => void
  handleTrackToolbarEvent?: (eventDef: { action: string; action_details: string }) => void
  sx?: SxProps
  disabledActions?: ButtonTypes[]
  isUnorderedListActive?: boolean
  isOrderedListActive?: boolean
  isOpen: boolean
  indentFeature?: IndentLevelFeature
}

const apiAdapter = getApiAdapter()

const DynamicToolbar = forwardRef<HTMLDivElement | null, ToolbarProps>(
  (
    {
      children,
      editor,
      handleAddTable,
      handleUnorderedListToggle,
      handleOrderedListToggle,
      handleAddImage,
      handleTrackToolbarEvent,
      sx,
      disabledActions = [],
      isUnorderedListActive,
      isOrderedListActive,
      isOpen,
      indentFeature,
    },
    ref
  ) => {
    const activeVariable = useAppSelector(selectActiveVar)
    const toolbarWrapperRef = useRef<HTMLDivElement>(null)
    const { toolbarPosition } = useToolbarPosition({
      editor,
      toolbarWrapperRef,
    })

    const emitCustomEvent = useCustomEventEmitter()

    const activeVariableId = activeVariable?.variableDisplayId || ''
    const activeVariableName = activeVariable?.name || ''

    // const isTextSelected = editor ? !editor.state.selection.empty : false

    const isAutocompleteDisabled = useMemo(() => {
      return AUTOFILLED_VARIABLES.includes(activeVariableName)
    }, [activeVariableName])

    const onShowSuggestionClick = useCallback(() => {
      if (isAutocompleteDisabled) {
        return
      }

      if (activeVariableId) {
        emitCustomEvent(activeVariableId)
      }
    }, [activeVariableId, emitCustomEvent, isAutocompleteDisabled])

    const withEntireVariableSelected = useCallback((action: () => void) => {
      if (!action) return
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const rangeStart =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement
          : (range.startContainer as Element)
      const variableNode = rangeStart?.closest(`.node-${VAR_INPUT_EXTENSION_NAME}`) as Node

      if (variableNode) {
        const entireVariableRange = document.createRange()
        entireVariableRange.selectNode(variableNode)
        selection.removeAllRanges()
        selection.addRange(entireVariableRange)
        setTimeout(action, 0)
      }
    }, [])

    const handleImageUploadIconClick = useCallback(() => {
      handleTrackToolbarEvent?.({
        action: 'menu_bar.insert_image_clicked',
        action_details: 'true',
      })
    }, [handleTrackToolbarEvent])

    const toggleBold = useCallback(() => {
      if (!editor || disabledActions.includes('bold')) {
        return
      }

      if (activeVariable) {
        withEntireVariableSelected(() => editor.chain().focus().toggleBold().run())
      } else {
        editor.chain().focus().toggleBold().run()
      }

      handleTrackToolbarEvent?.({
        action: 'menu_bar.bold_toggle',
        action_details: `${editor.isActive('bold') ? 'on' : 'off'}`,
      })
    }, [disabledActions, editor, handleTrackToolbarEvent, activeVariable, withEntireVariableSelected])

    const toggleItalic = useCallback(() => {
      if (!editor || disabledActions.includes('italic')) {
        return
      }

      if (activeVariable) {
        withEntireVariableSelected(() => editor.chain().focus().toggleItalic().run())
      } else {
        editor.chain().focus().toggleItalic().run()
      }

      handleTrackToolbarEvent?.({
        action: 'menu_bar.italic_toggle',
        action_details: `${editor.isActive('italic') ? 'on' : 'off'}`,
      })
    }, [disabledActions, editor, handleTrackToolbarEvent, activeVariable, withEntireVariableSelected])

    const toggleUnderline = useCallback(() => {
      if (!editor || disabledActions.includes('underline')) {
        return
      }

      if (activeVariable) {
        withEntireVariableSelected(() => editor.chain().focus().toggleUnderline().run())
      } else {
        editor.chain().focus().toggleUnderline().run()
      }

      handleTrackToolbarEvent?.({
        action: 'menu_bar.underline_toggle',
        action_details: `${editor.isActive('underline') ? 'on' : 'off'}`,
      })
    }, [disabledActions, editor, handleTrackToolbarEvent, activeVariable, withEntireVariableSelected])

    const toggleUnorderedList = useCallback(() => {
      if (!editor || disabledActions.includes('unorderedList')) {
        return
      }

      if (handleUnorderedListToggle) {
        handleUnorderedListToggle()
      } else {
        editor.chain().focus().toggleBulletList().run()
      }
    }, [disabledActions, editor, handleUnorderedListToggle])

    const toggleOrderedList = useCallback(() => {
      if (!editor || disabledActions.includes('orderedList')) {
        return
      }

      if (handleOrderedListToggle) {
        handleOrderedListToggle()
      } else {
        editor.chain().focus().toggleOrderedList().run()
      }
    }, [disabledActions, editor, handleOrderedListToggle])

    if (!editor || !isOpen) {
      return null
    }

    return (
      <Portal container={document.body}>
        <ToolbarWrapper data-editor-inner-click-marker ref={toolbarWrapperRef} toolbarPosition={toolbarPosition}>
          <Toolbar sx={sx} ref={ref}>
            {apiAdapter.hasVariableAutocomplete() && Boolean(activeVariableId) && (
              <>
                <Tooltip
                  title={
                    isAutocompleteDisabled
                      ? `Suggestions are unavailable for this variable (${activeVariableName}), because it is autofilled`
                      : 'Show suggestions'
                  }
                >
                  <Button
                    className={`var-${activeVariableId}`}
                    aria-label="Show suggestions"
                    onClick={onShowSuggestionClick}
                    disabled={isAutocompleteDisabled}
                  >
                    <SparklesIcon width={14} height={14} />
                  </Button>
                </Tooltip>

                <Divider />
              </>
            )}

            {indentFeature?.isIndentable && (
              <>
                <Button
                  aria-label="Decrease indentation"
                  disabled={!indentFeature.canDecreaseIndent}
                  onClick={indentFeature.decreaseIndent}
                >
                  <DecreaseIndentIcon color="currentColor" />
                </Button>

                <Button
                  aria-label="Increase indentation"
                  disabled={!indentFeature.canIncreaseIndent}
                  onClick={indentFeature.increaseIndent}
                >
                  <IncreaseIndentIcon color="currentColor" />
                </Button>
                <Divider />
              </>
            )}

            <Button
              aria-label="Bold"
              onClick={toggleBold}
              isActive={editor.isActive('bold')}
              disabled={disabledActions.includes('bold')}
            >
              <BoldIcon />
            </Button>

            <Button
              aria-label="Italic"
              onClick={toggleItalic}
              isActive={editor.isActive('italic')}
              disabled={disabledActions.includes('italic')}
            >
              <ItalicIcon color="currentColor" />
            </Button>

            <Button
              aria-label="Underline"
              onClick={toggleUnderline}
              isActive={editor.isActive('underline')}
              disabled={disabledActions.includes('underline')}
            >
              <UnderlineIcon color="currentColor" />
            </Button>

            <Divider />

            <Button
              aria-label="Unordered List"
              onClick={toggleUnorderedList}
              isActive={isUnorderedListActive ?? editor.isActive('bulletList')}
              disabled={disabledActions.includes('unorderedList')}
            >
              <BulletListIcon color="currentColor" />
            </Button>

            <Button
              aria-label="Ordered List"
              onClick={toggleOrderedList}
              isActive={isOrderedListActive ?? editor.isActive('orderedList')}
              disabled={disabledActions.includes('orderedList')}
            >
              <OrderedListIcon color="currentColor" />
            </Button>

            {handleAddTable && (
              <Tooltip title="Insert table">
                <Button aria-label="Table" onClick={handleAddTable} isActive={editor.isActive('table')}>
                  <TableIcon color="currentColor" />
                </Button>
              </Tooltip>
            )}

            {handleAddImage && apiAdapter.hasImageUpload() && (
              <ImageUpload
                handleImageUpload={handleAddImage}
                handleImageUploadIconClick={handleImageUploadIconClick}
                editor={editor}
              />
            )}

            <Divider />

            {/* {!Boolean(activeVariableId) && isTextSelected && (
              <Tooltip title="Add a comment">
                <Button aria-label="Add a comment" onClick={handleAddComment}>
                  <CommentPlusIcon color="currentColor" />
                </Button>
              </Tooltip>
            )} */}

            {children}
          </Toolbar>
        </ToolbarWrapper>
      </Portal>
    )
  }
)

DynamicToolbar.displayName = 'DynamicToolbar'

export default DynamicToolbar

type ToolbarWrapperType = {
  toolbarPosition: ToolbarPosition | null
}
const ToolbarWrapper = styled('div', {
  shouldForwardProp: (prop: string) => !['toolbarPosition'].includes(prop),
})<ToolbarWrapperType>(({ toolbarPosition }) => ({
  position: 'fixed',
  bottom: '32px',
  left: '50%',
  transform: `translateX(-50%)`,
  zIndex: 9999,
  ...(toolbarPosition && {
    position: 'absolute',
    top: `${toolbarPosition.top}px`,
    left: `${toolbarPosition.left}px`,
    bottom: 'unset',
  }),
}))

const Toolbar = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '796px',
  padding: '6px 8px',
  border: `1px solid ${theme.palette.grey[100]}`,
  gap: '9px',
  borderRadius: '8px',
  boxShadow: '0 4px 40px 0 rgba(0, 7, 26, .08), 0 20px 40px 0 rgba(0, 7, 26, .08)',

  '& button, & label': {
    margin: 0,
    padding: '4px',
  },

  '& > *': {
    flexShrink: 0,
  },
}))

export const Divider = styled('span')(({ theme }) => ({
  display: 'inline-block',
  height: '24px',
  width: '1px',
  verticalAlign: 'middle',
  backgroundColor: theme.palette.grey[600],
}))

export const Button = styled(IconButton, {
  shouldForwardProp: (p) => !['isActive', 'disabled'].includes(p as string),
})<{ isActive?: boolean; disabled?: boolean }>(({ isActive, disabled, theme }) => ({
  margin: '0',
  padding: '4px',
  borderRadius: 0,
  ...(isActive && {
    backgroundColor: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
  }),

  color: disabled ? 'var(--color-gray-500)' : '#fff',
  cursor: disabled ? 'not-allowed' : 'pointer',
}))
