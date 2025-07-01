import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { SmallButton } from './common/Button'
import Input from './common/Input'
import { Dialog, IconClose } from './dialog/BaseDialog'

type ModalProps = {
  handleCloseDialog: () => void
  handleChange: Dispatch<SetStateAction<string>>
  handleSave: () => void
  dialogTitle: string
  inputName: string
  value: string
  text?: string
}

const InputModal = ({
  handleCloseDialog,
  handleChange,
  handleSave,
  dialogTitle,
  inputName,
  value,
  text,
}: ModalProps) => {
  return (
    <Dialog.PaperWrapper onClose={handleCloseDialog} open={true}>
      <IconClose onClick={handleCloseDialog} />
      <Dialog.ContentWrapper>
        <Title>{dialogTitle}</Title>
        <Text>{text}</Text>
        <ModalContent>
          <Input
            name={inputName}
            id={inputName}
            autoFocus
            value={value}
            className="fullWidth"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.currentTarget.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSave()
              }
            }}
          />
        </ModalContent>
        <Dialog.Footer>
          <div>
            <SmallButton onClick={handleSave}>Save</SmallButton>
            <Button sx={{ marginLeft: '1rem' }} onClick={handleCloseDialog}>
              Cancel
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog.ContentWrapper>
    </Dialog.PaperWrapper>
  )
}

export default InputModal

const ModalContent = styled(Box)(() => ({
  margin: '24px 0 32px',
}))

const Title = styled(Dialog.Title)(() => ({
  fontSize: '20px',
  fontWeight: '600',
}))

const Text = styled('p')(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
  margin: '8px 0 -8px',
}))
