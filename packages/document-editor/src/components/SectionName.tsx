import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@mui/material'
import styled from '@mui/material/styles/styled'
import Document from '@tiptap/extension-document'
import Heading, { Level } from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import SectionEnterExtension from '../components/tiptap-extensions/SectionEnterExtension'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { editorHtmlToSectionName, formatSectionName } from '../helpers/parseTemplateStatements'
import {
  changeSectionHeadingSize,
  renameSection,
  setActiveSection,
  setActiveStatement,
  updateAndSaveSection,
} from '../redux'
import { selectActiveSectionId, selectProjectData, selectVariableRegistry } from '../redux/selectors'
import { TemplateSection } from '../types/editor'
import DynamicToolbar from './DynamicToolbar'
import HeadingSwitcherDropdown from './HeadingSwitcherDropdown'
import { useSectionContext } from './SectionContext'
import { useTemplateActionsContext } from './TemplateActions'
import VariableToggleButton from './VariableToggleButton'
import { getEditorsCurrentNodeLength } from './tiptap-extensions/BackspaceExtension'
import VarInputExtension from './tiptap-extensions/VarInputExtension'

import { EditorContent, EditorEvents, useEditor } from '@tiptap/react'
import { SectionSideActionsMenu } from './SectionSideActionsMenu'

type SectionNameProps = {
  section: TemplateSection
}

const SectionName: React.FC<SectionNameProps> = ({ section }) => {
  const dispatch = useAppDispatch()

  const activeSectionId = useAppSelector(selectActiveSectionId)
  const variableRegistry = useAppSelector(selectVariableRegistry)

  const [sectionNameTagLevel, setSectionNameTagLevel] = useState(section.header_size || 'h3')
  const projectData = useAppSelector(selectProjectData)
  const initialContent = useRef<string | null>(null)
  const { isSectionSoftDeleted } = useSectionContext()
  const { isAnySectionNameFocused } = useTemplateActionsContext()

  const sectionNameContainerRef = useRef<HTMLDivElement>(null)

  const debouncedSectionNameUpdate = useMemo(
    () =>
      debounce((updateEvent: EditorEvents['update']) => {
        const editor = updateEvent.editor
        const newName = editorHtmlToSectionName(editor.getHTML())

        dispatch(renameSection({ id: section.id, newName }))
      }, 500),
    [dispatch, section.id]
  )

  const editorContent = useMemo(() => {
    const sectionNameContent = formatSectionName({
      section,
      variableRegistry,
      projectData,
      variableOutput: 'editable',
    })

    return `<${sectionNameTagLevel}>${sectionNameContent}</${sectionNameTagLevel}>`
  }, [section, variableRegistry, projectData, sectionNameTagLevel])

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        Document,
        Text,
        Paragraph,
        Heading.configure({
          levels: [1, 2, 3, 4],
        }),
        VarInputExtension,
        SectionEnterExtension,
      ],
      content: editorContent,
      onUpdate: (updateEvent: EditorEvents['update']) => {
        debouncedSectionNameUpdate(updateEvent)
      },
      onFocus: (focusEvent: EditorEvents['focus']) => {
        const editor = focusEvent.editor
        initialContent.current = editor.getHTML()
        if (activeSectionId !== section.id) {
          dispatch(setActiveSection(section))
        }
        dispatch(setActiveStatement(null))

        if (activeSectionId !== section.id) {
          dispatch(setActiveSection({ id: section.id }))
        }
      },
    },
    [isSectionSoftDeleted]
  )

  useEffect(() => {
    if (editor && section._triggerUpdate) {
      editor.commands.setContent(editorContent)

      dispatch(
        updateAndSaveSection({
          id: section.id,
          newValues: {
            _triggerUpdate: false,
          },
        })
      )
    }
  }, [dispatch, editor, editorContent, section.id, section._triggerUpdate])

  useEffect(() => {
    if (!editor || !activeSectionId) return

    if (typeof section._focusPositionFromContentEnd === 'number') {
      const currentNodeLength = getEditorsCurrentNodeLength(editor)
      const newFocusPosition = currentNodeLength - section._focusPositionFromContentEnd

      editor.commands.focus(newFocusPosition)
      dispatch(
        updateAndSaveSection({
          id: section.id,
          newValues: { _focusPositionFromContentEnd: undefined },
        })
      )
    }
  }, [section._focusPositionFromContentEnd])

  useEffect(() => {
    if (editor && sectionNameTagLevel !== section.header_size) {
      const sectionHeadingLevel = section.header_size.replace(/\D/g, '')
      const parsedLevel = parseInt(sectionHeadingLevel, 10) as Level
      onHeadingLevelChange(parsedLevel)
    }
  }, [section.header_size])

  const isSectionNameFocused = useMemo(() => {
    return Boolean(editor && activeSectionId === section.id && isAnySectionNameFocused.value)
  }, [activeSectionId, editor, isAnySectionNameFocused.value, section])

  const onHeadingLevelChange = useCallback(
    (headingLevel: Level) => {
      if (editor) {
        dispatch(changeSectionHeadingSize({ id: section.id, newName: `h${headingLevel}` }))
        setSectionNameTagLevel(`h${headingLevel}`)
        editor.chain().focus().toggleHeading({ level: headingLevel }).run()
      }
    },
    [dispatch, editor, section.id]
  )

  return (
    <>
      <SectionHeadingLine
        onClick={() => dispatch(setActiveStatement({ id: '', navInitiated: false, classificationOpen: false }))}
      >
        {isSectionNameFocused && (
          <HeadingSwitcherDropdownWrapper>
            <HeadingSwitcherDropdown
              editor={editor!}
              onHeadingLevelChange={(level) => {
                onHeadingLevelChange(level)
                dispatch(changeSectionHeadingSize({ id: section.id, newName: `h${level}` }))
              }}
              icon={<ActiveHeadingInfo>{sectionNameTagLevel}</ActiveHeadingInfo>}
            />
          </HeadingSwitcherDropdownWrapper>
        )}

        <Box
          onFocus={isAnySectionNameFocused.setTrue}
          ref={sectionNameContainerRef}
          {...(isSectionNameFocused ? { 'data-editor-inner-click-marker': true } : {})}
        >
          <SectionHeadingTxt isSoftDeleted={isSectionSoftDeleted} editor={editor!} />

          <DynamicToolbar
            isOpen={Boolean(isSectionNameFocused)}
            editor={editor!}
            disabledActions={['bold', 'italic', 'underline', 'unorderedList', 'orderedList']}
          >
            <VariableToggleButton
              editor={editor}
              sectionId={section.id}
              onVariableRemove={() => {
                if (editor) {
                  const newName = editorHtmlToSectionName(editor.getHTML())
                  dispatch(renameSection({ id: section.id, newName }))
                }
              }}
            />
          </DynamicToolbar>
        </Box>
      </SectionHeadingLine>

      {isSectionNameFocused && <SectionSideActionsMenu />}
    </>
  )
}

export default SectionName

const SectionHeadingLine = styled('div')(() => ({
  position: 'relative',
}))

const SectionHeadingTxt = styled(EditorContent, {
  shouldForwardProp: (prop) => prop !== 'isSoftDeleted',
})<{
  isSoftDeleted?: boolean
}>(({ isSoftDeleted, theme }) => ({
  '> div:focus-within': {
    outline: 'none',
  },

  'h1, h2, h3, h4': {
    fontWeight: '600',
    color: '#0C0D0E',
    textTransform: 'none',
    margin: '0 12px',
    paddingBottom: '10px',
    ...(isSoftDeleted && {
      textDecoration: 'line-through',
      color: theme.palette.grey[600],
    }),
  },

  h1: {
    fontSize: '24px',
    lineHeight: '24px',
  },

  h2: {
    fontSize: '20px',
    lineHeight: '20px',
  },

  h3: {
    fontSize: '18px',
    lineHeight: '18px',
  },

  h4: {
    fontSize: '16px',
    lineHeight: '16px',
  },
}))

const HeadingSwitcherDropdownWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '-4px',
  left: '-20px',

  '> button.MuiIconButton-sizeMedium': {
    width: '26px',
    height: '26px',
  },
}))

const ActiveHeadingInfo = styled('span')(() => ({
  textTransform: 'uppercase',
  fontFamily: 'monospace',
  fontSize: '14px',
}))
