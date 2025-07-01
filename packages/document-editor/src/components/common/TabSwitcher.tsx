import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { ReactNode } from 'react'
import classes from './TabSwitcher.module.css'

interface Props {
  options: ReactNode[]
  activeOptionIndex: number
  setActiveOptionIndex: (index: number) => void
  rightSlot?: ReactNode
}

const TabSwitcher: React.FC<Props> = (props) => {
  const { options, activeOptionIndex, setActiveOptionIndex } = props
  return (
    <Box sx={{ position: 'relative' }}>
      <Tabs
        value={activeOptionIndex}
        onChange={(_, index) => setActiveOptionIndex(index)}
        classes={{ root: classes.wrapper, indicator: classes.indicator }}
      >
        {options.map((option, index) => (
          <Tab
            classes={{
              root: classes.tab,
              selected: classes.selected,
            }}
            label={option}
            key={index}
          />
        ))}
      </Tabs>
      {props.rightSlot ? (
        <Box sx={{ marginLeft: 'auto', position: 'absolute', right: '0', top: '0' }}>{props.rightSlot}</Box>
      ) : null}
    </Box>
  )
}

export default TabSwitcher
