import type { ButtonProps } from '@mui/material'
import { Button as MUIButton } from '@mui/material'

export function Button({ children, ...props }: ButtonProps) {
  return <MUIButton {...props}>{children}</MUIButton>
}

export function SmallButton({ children, ...props }: ButtonProps) {
  return <MUIButton {...props}>{children}</MUIButton>
}

export function LinkButton({ children, ...props }: ButtonProps) {
  return <MUIButton {...props}>{children}</MUIButton>
}
