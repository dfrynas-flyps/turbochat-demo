import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import styled from '@mui/material/styles/styled'

import { getApiAdapter } from '../../../api-adapter'
import { setAlert } from '../../../redux'
import type { TipTapEditor } from '../../../types/editor'
import ProcessingOverlay from '../../ProcessingOverlay'
import { ImageIcon } from '../../icons/ImageIcon'
import { SmallButton } from '../Button'
import { Tooltip } from '../Tooltip'

type ImageInputProps = {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}
const ImageInput = ({ handleFileChange }: ImageInputProps) => (
  <Input type="file" onChange={handleFileChange} accept="image/jpg,image/jpeg,image/png" />
)

const apiAdapter = getApiAdapter()

const ImageUpload = ({
  handleImageUpload,
  handleImageUploadIconClick = () => {},
  editor,
  isReplace,
}: {
  handleImageUpload: (url: string) => void
  handleImageUploadIconClick?: () => void
  editor: TipTapEditor
  isReplace?: boolean
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()

  if (!apiAdapter.hasImageUpload()) {
    return null
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const url = await apiAdapter.uploadFile(file)
      handleImageUpload(url)
    } catch (error) {
      console.error(error)
      const errorText = error instanceof Error ? error.message : 'Error uploading image'

      dispatch(
        setAlert({
          text: errorText,
          type: 'error',
        })
      )
    } finally {
      setIsUploading(false)
    }
  }

  if (isReplace) {
    return (
      <ReplaceBtn>
        <SmallButton
          component="label"
          startIcon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.83325 2.50228C8.69365 2.50049 8.53215 2.50006 8.34306 2.50006H7.33325C6.37631 2.50006 5.7089 2.50112 5.20533 2.56882C4.71615 2.63459 4.4571 2.75489 4.27259 2.9394C4.08808 3.12391 3.96779 3.38296 3.90202 3.87214C3.83431 4.37571 3.83325 5.04311 3.83325 6.00006V10.0001C3.83325 10.957 3.83431 11.6244 3.90202 12.128C3.96779 12.6172 4.08808 12.8762 4.27259 13.0607C4.4571 13.2452 4.71615 13.3655 5.20533 13.4313C5.7089 13.499 6.37631 13.5001 7.33325 13.5001H8.66659C9.62353 13.5001 10.2909 13.499 10.7945 13.4313C11.2837 13.3655 11.5427 13.2452 11.7272 13.0607C11.9118 12.8762 12.0321 12.6172 12.0978 12.128C12.1655 11.6244 12.1666 10.957 12.1666 10.0001V6.32358C12.1666 6.13452 12.1662 5.97304 12.1644 5.83345H11.9999L11.9653 5.83345C11.3663 5.83347 10.8668 5.83348 10.4703 5.78017C10.0517 5.7239 9.67387 5.60012 9.37022 5.29648C9.06658 4.99283 8.9428 4.61496 8.88653 4.19643C8.83321 3.79991 8.83323 3.30043 8.83325 2.70145L8.83325 2.66678V2.50228ZM9.83325 2.65531V2.66678C9.83325 3.30946 9.83431 3.74116 9.87761 4.06319C9.91897 4.37083 9.99045 4.50249 10.0773 4.58937C10.1642 4.67625 10.2959 4.74773 10.6035 4.78909C10.9255 4.83239 11.3572 4.83345 11.9999 4.83345H12.0114C11.8953 4.61234 11.6778 4.38502 11.1415 3.84871L10.8179 3.52518C10.2817 2.98892 10.0543 2.77136 9.83325 2.65531ZM8.43813 1.50003C9.16332 1.49968 9.66728 1.49944 10.1282 1.69036C10.5891 1.88128 10.9453 2.23781 11.4578 2.75083L11.525 2.81808L11.8486 3.1416L11.9158 3.2088C12.4288 3.72134 12.7854 4.07753 12.9763 4.53844C13.1672 4.99936 13.167 5.50333 13.1666 6.22851V6.22851L13.1666 6.32358V10.0001V10.0366V10.0366V10.0367C13.1666 10.9484 13.1666 11.6833 13.0889 12.2612C13.0082 12.8613 12.8356 13.3665 12.4344 13.7678C12.0331 14.1691 11.5278 14.3417 10.9278 14.4224C10.3498 14.5001 9.61489 14.5001 8.70316 14.5001H8.66659H7.33325H7.29667C6.38494 14.5001 5.65006 14.5001 5.07208 14.4224C4.47201 14.3417 3.96676 14.1691 3.56549 13.7678C3.16421 13.3665 2.99161 12.8613 2.91093 12.2612C2.83323 11.6832 2.83324 10.9484 2.83325 10.0366V10.0001V6.00006V5.96348C2.83324 5.05175 2.83323 4.31687 2.91093 3.73889C2.99161 3.13882 3.16421 2.63357 3.56549 2.23229C3.96676 1.83101 4.47201 1.65842 5.07209 1.57774C5.65006 1.50003 6.38494 1.50004 7.29667 1.50006L7.33325 1.50006H8.34306L8.43813 1.50003ZM7.64636 6.97993C7.84162 6.78467 8.15821 6.78467 8.35347 6.97993L10.0201 8.6466C10.2154 8.84186 10.2154 9.15844 10.0201 9.35371C9.82487 9.54897 9.50829 9.54897 9.31303 9.35371L8.49992 8.54059V11.3335C8.49992 11.6096 8.27606 11.8335 7.99991 11.8335C7.72377 11.8335 7.49991 11.6096 7.49991 11.3335V8.54059L6.6868 9.35371C6.49154 9.54897 6.17496 9.54897 5.97969 9.35371C5.78443 9.15844 5.78443 8.84186 5.97969 8.6466L7.64636 6.97993Z"
                fill="#0C0D0E"
              />
            </svg>
          }
        >
          <ImageInput handleFileChange={handleFileChange} />
          Replace image
        </SmallButton>
        {isUploading ? <ProcessingOverlay /> : null}
      </ReplaceBtn>
    )
  }
  return (
    <>
      <Tooltip title="Insert image">
        <InputLabel onClick={handleImageUploadIconClick} isActive={editor.isActive('image')}>
          <ImageInput handleFileChange={handleFileChange} />
          <ImageIcon color="#fff" />
        </InputLabel>
      </Tooltip>
      {isUploading ? <ProcessingOverlay /> : null}
    </>
  )
}

export default ImageUpload

const Input = styled('input')(() => ({
  display: 'none',
}))

const InputLabel = styled('label', {
  shouldForwardProp: (p) => !['isActive'].includes(p as string),
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
  margin: '0 8px',
  padding: '4px',
  borderRadius: 0,
  color: '#0C0D0E',
  cursor: 'pointer',
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',

  ...(isActive && {
    backgroundColor: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
  }),
}))

const ReplaceBtn = styled('div')({
  '& label': {
    display: 'flex',
    alignItems: 'center',
    minWidth: '150px',
    cursor: 'pointer',
  },
})
