import { useState } from 'react'

import { Box } from '@mui/material'
import styled from '@mui/material/styles/styled'
import Image from '@tiptap/extension-image'
import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { useDispatch } from 'react-redux'

import { setImageAsConfirmed } from '../../../redux'
import type { TemplateStatement, TipTapEditor } from '../../../types/editor'
import { CheckMarkIcon } from '../../icons/CheckMarkIcon'
import { SmallButton } from '../Button'
import ImageLoader from '../ImageLoader'
import ImageUpload from '../RichTextEditor/ImageUpload'
import { Dialog, IconClose } from '../dialog'

export interface CustomExtensionOptions {
  statement: TemplateStatement
}

const ImageActions = ({
  editor,
  handleReplace,
  handleConfirm,
  isReady,
  isDialog,
}: {
  editor: TipTapEditor
  handleReplace: (url: string) => void
  handleConfirm: () => void
  isReady: boolean
  isDialog?: boolean
}) => {
  return (
    <Buttons isDialog={isDialog}>
      <ImageUpload handleImageUpload={handleReplace} editor={editor} isReplace />
      {!isReady && (
        <SmallButton
          onClick={handleConfirm}
          startIcon={<CheckMarkIcon width={16} height={16} fill={isDialog ? '#fff' : '#0c0d0e'} />}
        >
          Use image
        </SmallButton>
      )}
    </Buttons>
  )
}

const ImageNode = (props: NodeViewProps) => {
  const {
    node: {
      attrs: { src },
    },
    updateAttributes,
    extension: {
      options: { statement },
    },
    editor,
  } = props
  const [isReplaced, setIsReplaced] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const isReady = statement.isImageReady || isReplaced
  const dispatch = useDispatch()

  const handleReplace = (url: string) => {
    if (url) {
      setIsReplaced(true)
      setIsPreviewOpen(false)
      updateAttributes({ src: url })
    }
  }

  const handleConfirm = () => {
    setIsReplaced(true)
    setIsPreviewOpen(false)
    dispatch(setImageAsConfirmed({ id: statement.id }))
  }

  return (
    <NodeViewWrapper>
      <ImageContainer>
        <ImageWrapper isLoading={!isReady}>
          <ImageLoader
            src={src}
            onClick={() => {
              setIsPreviewOpen(true)
            }}
          />
        </ImageWrapper>
        <ImageActions isReady={isReady} handleConfirm={handleConfirm} handleReplace={handleReplace} editor={editor} />
      </ImageContainer>
      {isPreviewOpen && (
        <Dialog.PaperWrapper onClose={() => setIsPreviewOpen(false)} open={true} maxWidth={false}>
          <IconClose onClick={() => setIsPreviewOpen(false)} />
          <Dialog.ContentWrapper width="1016px">
            <Title>View and update</Title>
            <ModalContent>
              <DialogText>Use placeholder image or upload a new one.</DialogText>
              <ImageWrapper>
                <ImageLoader src={src} />
              </ImageWrapper>
              <Dialog.Footer>
                <Dialog.CancelButton onClick={() => setIsPreviewOpen(false)}>Cancel</Dialog.CancelButton>
                <ImageActions
                  isReady={isReady}
                  handleConfirm={handleConfirm}
                  handleReplace={handleReplace}
                  editor={editor}
                  isDialog
                />
              </Dialog.Footer>
            </ModalContent>
          </Dialog.ContentWrapper>
        </Dialog.PaperWrapper>
      )}
    </NodeViewWrapper>
  )
}

const ImageContainer = styled('div')(() => ({
  position: 'relative',
  minWidth: '160px',
  minHeight: '80px',
}))

const ImageWrapper = styled('div', { shouldForwardProp: (prop) => prop !== 'isLoading' })<{
  isLoading?: boolean
}>(({ isLoading }) => ({
  display: 'block',
  maxWidth: '100%',
  margin: '0 auto',
  ...(isLoading && {
    opacity: '30%',
  }),
}))

const Buttons = styled('div', { shouldForwardProp: (prop) => prop !== 'isDialog' })<{
  isDialog?: boolean
}>(({ theme, isDialog }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'end',
  alignItems: 'center',
  gap: '12px',
  ...(!isDialog && {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    '& button': {
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  }),
}))

const ModalContent = styled(Box)(() => ({
  margin: '8px 0',
}))

const Title = styled(Dialog.Title)(() => ({
  fontSize: '20px',
  fontWeight: '600',
}))

const DialogText = styled('p')(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
  margin: '0 0 24px',
}))

export default Image.extend<CustomExtensionOptions>({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode)
  },
})
