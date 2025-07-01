import { FC, MouseEvent } from 'react'

import { Box, Button, DialogContent, IconButton, Dialog as MuiDialog, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialogWrapper = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 16px;
    box-shadow: none;
  }
`

export type DialogBaseProps = {
  isDialogOpen: boolean
  onCloseDialog: (event?: object, reason?: string) => void
}

export const StyledTitle = styled('h1')`
  color: ${({ theme }) => theme.palette.grey[900]};
  font-size: 20px;
  margin: 5px 0 0;
`

export const StyledContent = styled('p')`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: 14px;
  font-weight: 400;
`

export const StyledContentWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0 65px 0 10px;
`
export enum CloseIconVariant {
  default = 'default',
  black = 'black',
}

export const IconClose: FC<{
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void
  top?: string
  right?: string
  position?: string
  size?: number
  padding?: string
  variant?: CloseIconVariant
  buttonSize?: 'small' | 'medium' | 'large'
}> = ({
  onClick,
  top = '10px',
  right = '10px',
  position = 'absolute',
  size = 24,
  padding,
  variant = CloseIconVariant.default,
  buttonSize = 'medium',
}) => (
  <IconButton
    aria-label="close"
    sx={{
      position,
      right,
      top,
      cursor: 'pointer',
      zIndex: 10,
      ...(padding ? { padding: padding } : {}),
      ...(variant === CloseIconVariant.black && { backgroundColor: 'black' }),
    }}
    onClick={(e) => {
      e.stopPropagation()
      onClick(e)
    }}
    size={buttonSize}
  >
    <img
      height={size}
      width={size}
      src={`/static/icons/${variant === CloseIconVariant.black ? 'Cross-White.svg' : 'Cross.svg'}`}
      alt="Cross icon to close popup"
      style={{ display: 'block' }}
    />
  </IconButton>
)

export const Dialog = {
  PaperWrapper: styled(MuiDialog, {
    shouldForwardProp: (p: string) =>
      !['minHeightPx', 'maxWidthPx', 'overflowX', 'overflowY', 'fullHeight'].includes(p),
  })<{
    minHeightPx?: string
    maxWidthPx?: string
    overflowX?: string
    overflowY?: string
    fullHeight?: boolean
  }>(({ minHeightPx, maxWidthPx, overflowX, overflowY, fullHeight }) => ({
    '& .MuiPaper-root': {
      borderRadius: '16px',
      boxShadow: 'none',
      ...(maxWidthPx && { maxWidth: maxWidthPx }),
      ...(minHeightPx && { minHeight: minHeightPx }),
      ...(overflowX && { overflowX }),
      ...(overflowY && { overflowY }),
      ...(fullHeight && { height: '100%' }),
    },
  })),
  ContentWrapper: styled('div', { shouldForwardProp: (prop) => prop !== 'width' })<{
    width?: string
  }>(({ theme, width }) => {
    return {
      width: '95%',
      padding: '15px 24px',
      [theme.breakpoints.up('md')]: {
        width: width || '588px',
      },
    }
  }),
  Content: styled(DialogContent)(() => {
    return {
      padding: '15px 24px',
    }
  }),
  Title: styled('h1')`
    color: ${({ theme }) => theme.palette.grey[900]};
    font-size: 20px;
    margin: 5px 0 0;
  `,
  Description: styled('div')(({ theme }) => ({
    color: theme.palette.grey[600],
    lineHeight: '20px',
    fontWeight: '400',
    fontSize: '14px',
    marginTop: '8px',
    marginBottom: '24px',
  })),
  Footer: styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '30px',
  })),
  StickyFooter: styled('div')(() => ({
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '30px',
    padding: '15px 24px',
    zIndex: 1000,
    backgroundColor: '#fff',
  })),
  CancelButton: styled(Button)(() => ({
    marginRight: 'auto',
  })),
  InputLabel: styled('label')(() => ({
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    marginTop: '24px',
    span: {
      marginBottom: '0.3rem',
    },
    '.MuiFormControl-root': {
      backgroundColor: 'transparent',
    },
  })),
  TextInput: styled(TextField)(() => ({
    'input, textarea': {
      fontSize: '14px',
    },
  })),
  StepIndicator: styled('span')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.grey[600],
  })),
}

export const DialogWithScrollableContent = styled(Dialog.PaperWrapper)`
  .MuiPaper-root {
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    overflow: hidden;
  }
`
