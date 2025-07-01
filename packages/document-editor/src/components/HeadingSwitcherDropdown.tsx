import React from 'react'

import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'
import { Level } from '@tiptap/extension-heading'
import { Editor } from '@tiptap/react'

import CommonExpandableMenu, { CommonMenu } from './common/ExpandableMenu'
import { StyledTick } from './icons/Checkbox'

type HeadingSwitcherDropdownProps = {
  editor?: Editor
  onHeadingLevelChange: (headingLevel: Level) => void
  icon?: React.ReactNode
  currentHeadingLevel?: number
}

const HeadingSwitcherDropdown: React.FC<HeadingSwitcherDropdownProps> = ({
  editor,
  onHeadingLevelChange,
  icon,
  currentHeadingLevel,
}) => {
  const levels: Level[] = [1, 2, 3, 4]

  const SingleMenuItem = ({ level, currentLevel }: { level: Level; currentLevel?: number }) => {
    if (!editor) {
      return (
        <StyledMenuItem
          onClick={() => {
            onHeadingLevelChange(level)
          }}
          className={level === currentLevel ? 'is-active' : ''}
          disabled={level === currentLevel}
          withBigSpacing
        >
          {`Heading ${level}`}
          {level === currentLevel && <StyledTick />}
        </StyledMenuItem>
      )
    }

    return (
      <StyledMenuItem
        onClick={() => onHeadingLevelChange(level)}
        className={editor?.isActive('heading', { level: level }) ? 'is-active' : ''}
        disabled={editor?.isActive('heading', { level: level })}
        withBigSpacing
      >
        {`Heading ${level}`}
        {editor?.isActive('heading', { level: level }) && <StyledTick />}
      </StyledMenuItem>
    )
  }

  return (
    <CommonExpandableMenu
      anchorRight={false}
      transformRight={false}
      icon={icon}
      disableScrollLock
      forceOpen={false}
      renderContent={() => (
        <Box sx={{ minWidth: '200px' }} data-prevent-section-deactivation>
          {levels.map((level) => (
            <SingleMenuItem key={level} level={level} currentLevel={currentHeadingLevel} />
          ))}
        </Box>
      )}
    />
  )
}

export default HeadingSwitcherDropdown

const StyledMenuItem = styled(CommonMenu.Item)(() => ({
  '&.MuiMenuItem-root.Mui-disabled.is-active': {
    opacity: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
