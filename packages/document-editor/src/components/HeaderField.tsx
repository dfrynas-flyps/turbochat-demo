import { useCallback, useRef } from 'react'

import styled from '@mui/material/styles/styled'

import { HeaderFieldState } from '../types/editor'

type HeaderFieldProps = {
  field: HeaderFieldState
  isHeaderActive: boolean
  isLast: boolean
  onResize: (event: React.MouseEvent<HTMLDivElement>, fieldId: string) => void
  onRemoveField: (fieldId: string) => void
  onInput: (event: React.ChangeEvent<HTMLTextAreaElement>, fieldId: string) => void
  isFieldActive: boolean
  onActivate: (fieldId: string) => void
}

export const HeaderField = ({
  field,
  isHeaderActive,
  isLast,
  onResize,
  onRemoveField,
  onInput,
  isFieldActive,
  onActivate,
}: HeaderFieldProps) => {
  const MAX_TEXT_LENGTH = 140
  const fieldRef = useRef<HTMLSpanElement>(null)

  const activateField = useCallback(() => {
    if (isHeaderActive && !isFieldActive) {
      onActivate(field.id)
    }
  }, [isHeaderActive, isFieldActive])

  const handleBorderDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => onResize(event, field.id),
    [field.id, onResize]
  )

  const handleFieldDelete = useCallback(() => onRemoveField(field.id), [field.id])

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => onInput(event, field.id),
    [field.id, onInput]
  )

  return (
    <StyledField
      ref={fieldRef}
      isHeaderActive={isHeaderActive}
      isFieldActive={isFieldActive}
      style={{ width: `${field.width}px` }}
    >
      {isFieldActive ? (
        <FieldInput
          value={field.text}
          placeholder="Type here..."
          maxLength={MAX_TEXT_LENGTH}
          onInput={handleInput}
          autoFocus
        />
      ) : (
        <FieldText onClick={activateField}>{field.text}</FieldText>
      )}
      {isHeaderActive && isFieldActive && (
        <>
          <CharacterCount>
            {field.text.length}
            <GreyText> / {MAX_TEXT_LENGTH}</GreyText>
          </CharacterCount>
          <DeleteFieldButton onClick={handleFieldDelete}>Delete block</DeleteFieldButton>
        </>
      )}
      {!isLast && isHeaderActive && <MovableBorder onMouseDown={handleBorderDrag} />}
    </StyledField>
  )
}

const shouldForwardProp = (prop: string) => !['isHeaderActive', 'isFieldActive'].includes(prop)
export const StyledField = styled('span', { shouldForwardProp })<{
  isHeaderActive?: boolean
  isFieldActive?: boolean
}>(({ isHeaderActive, isFieldActive }) => ({
  boxSizing: 'border-box',
  minWidth: '40px',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  border: 'none',
  position: 'relative',
  ...(isHeaderActive && {
    border: '1px solid #DADBE0',
  }),
  ...(isFieldActive && {
    border: '1px solid #FF6B00',
    backgroundColor: '#FFFBF3',
    outline: '4px solid #FFEDCC',
  }),
}))

const FieldInput = styled('textarea')(() => ({
  padding: '16px',
  border: 'none',
  width: '100%',
  height: '100%',
  resize: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontWeight: 'inherit',
  overflow: 'hidden',
  outline: 'none',
  backgroundColor: 'transparent',
}))

const FieldText = styled('p')(() => ({
  padding: '16px',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  outline: 'none',
  margin: '0',
}))

const CharacterCount = styled('span')(() => ({
  position: 'absolute',
  bottom: '6px',
  right: '6px',
  fontSize: '12px',
  lineHeight: '16px',
  backgroundColor: '#FFFBF3',
  padding: '2px',
  borderRadius: '2px',
}))

const GreyText = styled('span')(() => ({
  color: '#9299A1',
}))

const DeleteFieldButton = styled('button')(() => ({
  background: 'none',
  backgroundColor: 'white',
  cursor: 'pointer',
  borderRadius: '8px',
  padding: '6px 10px',
  border: '1px solid #EAEBEE',
  position: 'absolute',
  right: '0',
  bottom: '0',
  transform: 'translateY(calc(100% + 4px))',
  minWidth: '96px',
  boxShadow: '0px 4px 40px 0px rgba(0, 7, 26, 0.08), 0px 20px 40px 0px rgba(0, 7, 26, 0.08)',
}))

const MovableBorder = styled('div')(() => ({
  width: '5px',
  height: '100%',
  position: 'absolute',
  right: '0',
  transform: 'translateX(50%)',
  cursor: 'ew-resize',
  zIndex: 1,
  '&:active': {
    backgroundColor: '#FFEDCC',
    width: '2px',
  },
}))
