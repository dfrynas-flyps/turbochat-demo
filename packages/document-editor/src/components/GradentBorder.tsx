import * as React from 'react'

import { Box, BoxProps } from '@mui/material'

type GradientBorderProps = BoxProps & {
  gradient?: string
  borderRadius?: string
  borderSize?: string
  backgroundColor?: string
  children: React.ReactNode
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  borderSize = '1px',
  borderRadius = '0px',
  gradient = 'linear-gradient(107.77deg, #FA958E 14.09%, #87ACFB 49.41%, #FFD599 83.46%)',
  backgroundColor = '#FFF',
  ...props
}) => {
  return (
    <Box sx={{ borderRadius: borderRadius, background: gradient, padding: borderSize }}>
      <Box sx={{ borderRadius: `calc(${borderRadius} - 1px)`, background: backgroundColor }}>
        <Box {...props}>{children}</Box>
      </Box>
    </Box>
  )
}
