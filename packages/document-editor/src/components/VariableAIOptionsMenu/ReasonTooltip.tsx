import { Box, Typography } from '@mui/material'
import React from 'react'

import InfoCircle from '../icons/InfoCircle'
import { StyledTooltip, TooltipContentWrapper, TooltipTitle } from './VariableAiOptionsMenu.styled'

interface IReasonTooltipProps {
  children: React.ReactNode
}

const ReasonTooltip: React.FC<IReasonTooltipProps> = ({ children }) => {
  return (
    <StyledTooltip
      title={
        <TooltipContentWrapper>
          <div>
            <TooltipTitle>Reason</TooltipTitle>
            <Typography variant="body2">{children}</Typography>
          </div>
        </TooltipContentWrapper>
      }
      placement="left-start"
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [20, -5] } }] } }}
    >
      {/* Without this box, tooltip doesn't work. SVG can't be a direct child of a Tooltip component */}
      <Box>
        <InfoCircle color="#72767D" size="18" />
      </Box>
    </StyledTooltip>
  )
}

export default ReasonTooltip
