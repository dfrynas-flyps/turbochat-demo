import parse from 'html-react-parser'
import { useEffect, useRef } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useStatementProposedAction } from '../hooks/useStatementProposedAction'
import { formatStatementText } from '../helpers/parseTemplateStatements'
import { setActiveStatement } from '../redux'
import { selectActiveStatement, selectData, selectProjectData, selectVariableRegistry } from '../redux/selectors'
import { ProjectData, StatementTypes, TemplateDataTypes } from '../types/editor'
import Counter from './Counter'
import { LastStatementToggle } from './LastStatementToggle'
import MarkerIcon from './MarkerIcon'
import RichTextEditor from './RichTextEditor'
import { useSectionContext } from './SectionContext'
import Skeleton from './Skeleton'
import { useStatementContext } from './StatementContext'
import { StatementSideActionsMenu } from './StatementSideActionsMenu'
import { Tooltip } from './common/Tooltip'
import { ExclamationMarkIcon } from './icons/ExclamationMarkIcon'
import { getClassificationContent } from './regeneration/ClassificationMapping'

import StatementBottomActionsMenu from './StatementBottomActionsMenu'

interface StatementContentProps {
  projectData: ProjectData
}

const StatementContent = ({ projectData }: StatementContentProps) => {
  const { statement } = useStatementContext()
  const { isSectionSoftDeleted } = useSectionContext()
  const { section } = useSectionContext()
  const variableRegistry = useAppSelector(selectVariableRegistry)

  if (statement.isRegenerating) {
    return <Skeleton itemsCount={1} />
  }

  if (statement.isDeleted) {
    const statementContent = formatStatementText({
      statement,
      sectionId: section.id,
      variableRegistry,
      projectData,
      variableOutput: 'decorated',
    })

    return (
      <HighlightedStatement sectionSoftDeleted={isSectionSoftDeleted} isDeleted={statement.isDeleted}>
        {parse(statementContent, {
          replace(domNode) {
            if (domNode.type === 'text') {
              return <span>{domNode.data}</span>
            }
          },
        })}
      </HighlightedStatement>
    )
  }
  return <RichTextEditor />
}

const Statement: React.FC = () => {
  const { statement, statementIndex, isStatementActive: isStatementActiveBase } = useStatementContext()
  const activeStatement = useAppSelector(selectActiveStatement)
  const data = useAppSelector(selectData)
  const projectData = useAppSelector(selectProjectData)
  const { isSectionSoftDeleted } = useSectionContext()
  const activeRef = useRef<Element | null>(null)
  const dispatch = useAppDispatch()
  const { classification } = statement
  const color = classification && getClassificationContent(classification?.classification)?.color
  const { proposedAction } = useStatementProposedAction({ statement })

  // FIXME: this is a hack for a problem described in TP-3259. The true problem is yet to be solved.
  const [isStatementActive] = useDebounceValue(isStatementActiveBase, 50)

  useEffect(() => {
    if (activeStatement?.navInitiated) {
      activeRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [activeStatement])

  useEffect(() => {
    if (data?.type === TemplateDataTypes.TEMPLATE_DOCUMENT) {
      return
    }

    if (!statement.actionAutoApplied) {
      proposedAction.applyAction()
    }
  }, [data?.type, proposedAction, statement.actionAutoApplied])

  return (
    <StatementOuterWrapper>
      <StatementInnerWrapper
        isActiveStatement={isStatementActive}
        isDeleted={statement.isDeleted}
        sectionSoftDeleted={isSectionSoftDeleted}
        onClick={() => {
          if (!isStatementActive) {
            dispatch(setActiveStatement({ id: statement.id }))
          }
        }}
        {...(isStatementActive ? { 'data-editor-inner-click-marker': true } : {})}
        data-prevent-statement-deactivation
      >
        <StyledStatement ref={isStatementActive ? activeRef : null}>
          {!isStatementActive && statement?.optionalStatement && (
            <Tooltip placement="top" title={<span>This statement was marked as optional</span>}>
              <StyledExclamationMarkIcon />
            </Tooltip>
          )}
          <EditorWrapper isBlock={statement.type !== StatementTypes.TEXT}>
            <Counter
              main={color?.main || ''}
              light={color?.light || ''}
              isDeleted={Boolean(statement.isDeleted)}
              idx={statementIndex}
            />
            <StatementContent projectData={projectData} />

            <LastStatementToggle statement={statement} />
          </EditorWrapper>
          {isStatementActive && (
            <>
              <StatementBottomActionsMenu statement={statement} />
              <MarkerIcon color={color?.main} />
              <StatementSideActionsMenu statement={statement} />
            </>
          )}
        </StyledStatement>
      </StatementInnerWrapper>
    </StatementOuterWrapper>
  )
}

export default Statement

interface StatementWrapperProps {
  background?: string
  isActiveStatement: boolean
  isDeleted?: boolean
  sectionSoftDeleted?: boolean
}

const StatementOuterWrapper = styled(Box)({
  position: 'relative',
})

const StatementInnerWrapper = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActiveStatement', 'isDeleted', 'sectionSoftDeleted'].includes(prop),
})<StatementWrapperProps>(({ theme, background, isActiveStatement, isDeleted, sectionSoftDeleted }) => ({
  borderRadius: '12px',
  padding: '8px 12px',
  margin: '4px 0',
  cursor: 'pointer',
  transition: 'background 0.2s ease-in',
  ...(isActiveStatement && { marginBottom: isDeleted || sectionSoftDeleted ? 0 : '40px' }),
  '&:hover': {
    backgroundColor: background || theme.palette.grey[50],
  },
}))

const StyledStatement = styled(Box)(() => ({
  paddingRight: '32px',
  lineHeight: '40px',
  position: 'relative',
  scrollMarginTop: '40px',
}))

const EditorWrapper = styled('div', {
  shouldForwardProp: (prop) => !['isBlock'].includes(prop as string),
})<{
  isBlock?: boolean
}>(({ isBlock }) => ({
  position: 'relative',
  maxWidth: '100%',
  overflow: 'visible',
  minHeight: '80px',
  display: 'flex',
  alignItems: 'baseline',
  ...(isBlock && {
    alignItems: 'flex-start',
    '& ul': {
      margin: 0,
    },
  }),
}))

const HighlightedStatement = styled('p', {
  shouldForwardProp: (prop: string) => !['isDeleted', 'sectionSoftDeleted'].includes(prop),
})<{
  isDeleted?: boolean
  sectionSoftDeleted?: boolean
}>(({ theme, isDeleted, sectionSoftDeleted }) => ({
  display: 'inline',

  '& span': {
    display: 'inline',
    lineHeight: '24px',

    ...(isDeleted && {
      textDecoration: 'line-through',
    }),

    ...(sectionSoftDeleted && {
      backgroundColor: 'transparent',
      color: theme.palette.grey[600],
    }),
  },

  '& span.variable-preview': {
    display: 'inline-block',
    color: theme.palette.grey[600],
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
    margin: '0 12px',
    ...(sectionSoftDeleted && { borderColor: theme.palette.grey[200] }),
  },
}))

const StyledExclamationMarkIcon = styled(ExclamationMarkIcon)(({ theme }) => ({
  position: 'absolute',
  left: '-26px',
  top: '4px',
  margin: '4px 4px 0 0',
  width: '20px',
  minWidth: '20px',
  height: '28px',
  '& path': {
    fill: theme.palette.warning[500],
  },
}))
