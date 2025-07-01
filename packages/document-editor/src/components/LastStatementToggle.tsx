import { useCallback } from 'react'

import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

import { useAppDispatch } from '../hooks/redux'
import { useIndentLevel } from '../hooks/useIndentLevel'
import { toggleLastStatement } from '../redux'
import { StatementTypes, TemplateStatement } from '../types/editor'
import { ArrowTurnDownLeftIcon } from './icons/ArrowTurnDownLeftIcon'
import { ParagraphIcon } from './icons/ParagraphIcon'

type LastStatementToggleProps = {
  statement: TemplateStatement
}

export const LastStatementToggle: React.FC<LastStatementToggleProps> = ({ statement }) => {
  const dispatch = useAppDispatch()
  const LastStatementIcon = statement?.last_statement ? ParagraphIcon : ArrowTurnDownLeftIcon
  const { setIndentLevel } = useIndentLevel(statement)

  const onLastStatementToggle = useCallback(() => {
    if (typeof statement.indent_level === 'number') {
      setIndentLevel(statement.indent_level)
    }

    dispatch(
      toggleLastStatement({
        id: statement.id,
        lastStatement: Boolean(statement.last_statement),
      })
    )
  }, [dispatch, setIndentLevel, statement.id, statement.indent_level, statement.last_statement])

  if (statement.type && ![StatementTypes.TABLE, StatementTypes.IMAGE].includes(statement.type)) {
    return (
      <StyledLastStatementToggle onClick={onLastStatementToggle}>
        <LastStatementIcon color="#9299A1" />
      </StyledLastStatementToggle>
    )
  }

  return null
}

const StyledLastStatementToggle = styled(Box)(() => ({
  position: 'absolute',
  bottom: '0',
  right: '-32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '3px',
  height: '36px',
  width: '36px',
  padding: '0 5px',

  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}))
