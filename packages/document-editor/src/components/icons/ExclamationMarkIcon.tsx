import { Box, BoxProps } from '@mui/material'
import React from 'react'

type ExclamationMarkIconProps = BoxProps & {
  width?: number
  height?: number
  fill?: string
}

// NOTE: forwardRef was necessary to make this icon work within <Tooltip />
export const ExclamationMarkIcon = React.forwardRef<HTMLOrSVGElement, ExclamationMarkIconProps>(
  ({ fill, ...props }, ref) => {
    return (
      <Box component="svg" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
        <path
          clipRule="evenodd"
          d="m22 12c0 5.5228-4.4772 10-10 10-5.52285 0-10-4.4772-10-10 0-5.52285 4.47715-10 10-10 5.5228 0 10 4.47715 10 10zm-10-4.75c.4142 0 .75.33579.75.75v5c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-5c0-.41421.3358-.75.75-.75zm0 9.75c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1z"
          fill={fill}
          fillRule="evenodd"
        />
      </Box>
    )
  }
)

ExclamationMarkIcon.displayName = 'ExclamationMarkIcon'
