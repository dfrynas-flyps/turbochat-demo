import { Box, Button, DialogActions, DialogContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Dialog, IconClose, StyledContent, StyledContentWrapper } from '../BaseDialog'
import { DialogProps } from './types'

const Title = Dialog.Title

const Content = StyledContent

const ConfirmButton = styled(Button)`
  background-color: ${() => 'red' /* theme.palette.error[500] */};
  border-radius: 6px;
  color: #fff;
  display: flex;
  gap: 10px;
  padding: 5px 17px;
  &:hover {
    background-color: ${() => 'red' /* theme.palette.error[400] */};
  }
  & p {
    margin: 0;
  }
`

const ConfirmDeleteDialog: React.FC<DialogProps> = ({
  onCloseDialog,
  isDialogOpen,
  title,
  content,
  callToAction,
  styles,
  maxWidth,
  image = (
    <Box>
      <img src="/static/cup.svg" alt="Cup of coffee" />
    </Box>
  ),
}) => {
  return (
    <Dialog.PaperWrapper open={isDialogOpen} onClose={onCloseDialog} {...(maxWidth && { maxWidth: maxWidth })}>
      <IconClose onClick={onCloseDialog} />
      <DialogContent>
        <StyledContentWrapper sx={styles?.ContentWrapper ? styles?.ContentWrapper : {}}>
          {image}
          <Box>
            {title}
            {content}
          </Box>
        </StyledContentWrapper>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px', gap: '10px', ...styles?.DialogActions }}>
        {callToAction}
      </DialogActions>
    </Dialog.PaperWrapper>
  )
}

export { Title, Content, ConfirmButton }

export default ConfirmDeleteDialog
