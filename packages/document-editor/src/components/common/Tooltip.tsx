import { ReactNode } from 'react'

import styled from '@emotion/styled'
import { Box } from '@mui/material'
import TooltipComponent, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

import theme from '../../styles/theme'

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <TooltipComponent leaveDelay={0} {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'black',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    fontSize: '12px',
    padding: '15px',
    fontWeight: '600',
    textAlign: 'center',
  },
})

export const TooltipLight = styled(({ className, ...props }: TooltipProps) => (
  <TooltipComponent {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',
    '&:before': {
      border: `1px solid ${theme.palette.grey[200]}`,
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: theme.palette.grey[900],
    fontSize: '14px',
    padding: '24px',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '20px',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: '8px',
    maxWidth: '500px',
  },
})

export const TooltipIf = ({
  condition,
  children,
  TooltipComponent = Tooltip,
  ...tooltipProps
}: {
  condition: boolean
  TooltipComponent?: typeof Tooltip | typeof TooltipLight
  children: ReactNode
} & TooltipProps) => {
  if (condition) {
    return (
      <TooltipComponent {...tooltipProps}>
        <Box data-testid="tooltip-children-wrapper">{children}</Box>
      </TooltipComponent>
    )
  }

  return children
}
