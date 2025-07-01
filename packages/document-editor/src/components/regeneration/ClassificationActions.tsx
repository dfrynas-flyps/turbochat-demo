import React, { useRef, useState } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'

import { useStatementProposedAction } from '../../hooks/useStatementProposedAction'
import { TemplateStatement } from '../../types/editor'
import { CommonMenu } from '../common/ExpandableMenu'

const ClassificationActions = ({ statement }: { statement: TemplateStatement }) => {
  const { proposedAction, actions } = useStatementProposedAction({ statement })
  const [anchorEl, setAnchorEl] = useState(false)
  const open = Boolean(anchorEl)
  const buttonsRef = useRef(null)

  const toggleMenu = () => {
    setAnchorEl((prevAnchorEl) => {
      if (!prevAnchorEl && buttonsRef?.current) {
        return buttonsRef?.current
      }
      return false
    })
  }

  return (
    <>
      <StyledButtonGroup data-editor-inner-click-marker ref={buttonsRef}>
        <StyledButton
          onClick={() => proposedAction.applyAction()}
          isDanger={proposedAction.danger}
          isActive={open}
          disabled={!proposedAction.applyAction}
        >
          {proposedAction.text}
        </StyledButton>
        <StyledButton onClick={toggleMenu} isDropdown isDanger={proposedAction.danger} isActive={open}>
          <svg fill="none" height="16" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="m18 9.75c0-.42-.33-.75-.75-.75h-10.5c-.42 0-.75.33-.75.75 0 .195.075.36.195.495l5.25 6c.135.15.33.255.555.255s.42-.105.555-.255l5.25-6c.12-.135.195-.3.195-.495z"
              fill="#0c0d0e"
              fillRule="evenodd"
            />
          </svg>
        </StyledButton>
      </StyledButtonGroup>
      <StyledMenu data-editor-inner-click-marker anchorEl={buttonsRef?.current} open={open} onClose={toggleMenu}>
        {actions.map((action) => {
          if (action.isVisible(statement) && action.key !== proposedAction.key) {
            return (
              <li key={action.key}>
                {action.divider && <CommonMenu.Divider />}
                <CommonMenu.Item onClick={() => action.applyAction()} danger={action.danger} withBigSpacing>
                  {action.text}
                </CommonMenu.Item>
              </li>
            )
          }
        })}
      </StyledMenu>
    </>
  )
}

export default ClassificationActions

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  height: '32px',
}))

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => !['isDropdown', 'isDanger', 'isActive'].includes(prop as string),
})<{
  isDropdown?: boolean
  isDanger?: boolean
  isActive?: boolean
}>(({ isDropdown, isDanger, isActive, theme }) => ({
  border: 'none',
  borderRadius: '6px',
  height: '32px',
  backgroundColor: theme.palette.grey[75],
  ...(isDanger && {
    backgroundColor: theme.palette.error[100],
    color: theme.palette.error[600],
    '& svg path': {
      fill: theme.palette.error[600],
    },
  }),
  ...(isDropdown && {
    width: '24px',
    padding: '8px 4px',
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
  }),
  ...(isActive && {
    outline: `4px solid ${theme.palette.grey[200]}`,
  }),
  '&:hover': {
    border: 'none',
    borderLeft: isDropdown ? `1px solid ${theme.palette.grey[200]}` : 'none',
    backgroundColor: isDanger ? theme.palette.error[100] : theme.palette.grey[100],
  },
  '&.Mui-disabled': {
    border: 'none',
    color: theme.palette.primary.main,
  },
}))

const StyledMenu = styled(Menu)(() => ({
  '& ul': {
    padding: '8px',
    minWidth: '240px',
  },
}))
