import React from 'react'

import { Breakpoint } from '@mui/material'
import { SxProps } from '@mui/material/styles'

import { DialogBaseProps } from '../BaseDialog'

type Styles = {
  ContentWrapper?: SxProps
  PaperWrapper?: SxProps
  DialogActions?: SxProps
}

export type DialogProps = DialogBaseProps & {
  title: string
  content: React.ReactNode
  callToAction: React.ReactNode
  image?: JSX.Element | null
  styles?: Styles
  maxWidth?: Breakpoint
}
