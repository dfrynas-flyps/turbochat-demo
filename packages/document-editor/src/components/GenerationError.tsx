import React, { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  deleteSection,
  // regenerateSection,
  // updateTemplate
} from '../redux'
import {
  // selectData,
  selectIsTemplateLoading,
} from '../redux/selectors'
import type { TemplateSection } from '../types/editor'
import { SmallButton } from './common/Button'
import Loading from './common/Loading'
import { IconClose } from './common/dialog/index'
import ErrorIcon from './icons/ErrorIcon'

const Title = ({ isGlobal, failedSections }: { isGlobal?: boolean; failedSections: TemplateSection[] }) => {
  if (isGlobal && failedSections?.length) {
    return (
      <StyledTitle isGlobal>
        Couldn&apos;t generate the content of{' '}
        {failedSections.map((section, idx) => (
          <Fragment key={section.id}>
            <a href={`#${section.id}`}>{section.name}</a>
            {idx < failedSections.length - 1 ? ', ' : ' '}
          </Fragment>
        ))}
        sections.
      </StyledTitle>
    )
  } else {
    return <StyledTitle>Couldn’t generate the content of this section.</StyledTitle>
  }
}

const GenerationError = ({
  isGlobalError,
  failedSections,
}: {
  isGlobalError?: boolean
  failedSections: TemplateSection[]
}) => {
  const [isOpen, setIsOpen] = useState(true)
  // const data = useAppSelector(selectData)
  const isTemplateLoading = useAppSelector(selectIsTemplateLoading)
  const dispatch = useAppDispatch()

  const handleRegenerate = () => {
    console.error('regenerate sections not implemented!')
    // if (failedSections.length) dispatch(updateTemplate({ isTemplateLoading: true }))
    //
    // failedSections?.forEach((section) => {
    //   if (!data?.id) return
    //   dispatch(regenerateSection({ templateId: data.id, sectionId: section.id }))
    // })
  }

  const handleRemove = () => {
    failedSections?.forEach((section) => {
      dispatch(deleteSection({ id: section.id }))
    })
  }

  if (!isOpen) {
    return null
  }

  return (
    <ErrorBox isGlobal={isGlobalError}>
      {isGlobalError && <IconClose onClick={() => !isTemplateLoading && setIsOpen(false)} size={16} />}
      <ErrorIcon size="20" />
      <Box>
        <Title isGlobal={isGlobalError} failedSections={failedSections} />
        {isGlobalError && <Text>Scroll to see the details, retry all or remove unavailable sections.</Text>}
        <Buttons isGlobal={isGlobalError}>
          <SmallButton disabled={isTemplateLoading} onClick={handleRegenerate}>
            {!isTemplateLoading ? (
              'Retry'
            ) : (
              <>
                Retrying
                <LoadingWrapper>
                  <Loading />
                </LoadingWrapper>
              </>
            )}
          </SmallButton>
          <SmallButton disabled={isTemplateLoading} onClick={handleRemove}>
            {isGlobalError ? 'Remove unavailable sections' : 'Remove section'}
          </SmallButton>
        </Buttons>
      </Box>
    </ErrorBox>
  )
}

export default GenerationError

const ErrorBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'isGlobal' })<{
  isGlobal?: boolean
}>(({ isGlobal, theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  background: '#fff',
  padding: '20px 39px 20px 16px',
  ...(isGlobal && {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '33px',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.error[500]}`,
  }),
}))

const StyledTitle = styled('p', { shouldForwardProp: (prop) => prop !== 'isGlobal' })<{
  isGlobal?: boolean
}>(({ theme, isGlobal }) => ({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.palette.grey[600],
  margin: 0,
  ...(isGlobal && {
    color: theme.palette.grey[900],
  }),
}))

const Text = styled('p')(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[600],
}))

const Buttons = styled('div', { shouldForwardProp: (prop) => prop !== 'isGlobal' })<{
  isGlobal?: boolean
}>(({ isGlobal }) => ({
  display: 'flex',
  gap: '4px',
  marginTop: '16px',
  ...(!isGlobal && {
    justifyContent: 'center',
  }),
}))

const LoadingWrapper = styled('span')(() => ({
  display: 'inline-block',
  paddingLeft: '10px',
  opacity: 0.6,
}))
