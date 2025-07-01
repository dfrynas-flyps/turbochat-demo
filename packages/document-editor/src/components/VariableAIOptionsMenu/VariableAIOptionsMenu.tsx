import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { Box, Divider, PopoverProps, Skeleton, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useVariableLatestValues } from '../../hooks/useVariableValues'
import { clearVariableAIOptions, updateAndSaveSection, updateStatement, updateVariable } from '../../redux'
import { selectVariableAIOptions } from '../../redux/selectors'
import { VariableRegistryEntry } from '../../types/editor'
import { VARIABLE_AI_OPTIONS_MENU_FILL_IT_IN } from '../../types/templates'
import { GradientBorder } from '../GradentBorder'
import { useSectionContext } from '../SectionContext'
import { useStatementContext } from '../StatementContext'
import LoaderIcon from '../icons/LoaderIcon'
import SparklesIcon from '../icons/SparklesIcon'
import VariableAIOptions from './VariableAIOptions'
import {
  IconBackground,
  OriginalTextButton,
  OriginalTextButtonCaption,
  OriginalTextButtonContent,
  PopoverContent,
  StyledListItemButton,
  StyledListItemText,
  StyledPopover,
  TypographyWrapper,
} from './VariableAiOptionsMenu.styled'

interface IVariableAIOptionsMenuProps {
  isOpen: PopoverProps['open']
  anchorEl: PopoverProps['anchorEl']
  currentVariable: VariableRegistryEntry
  currentValue: string
  handleClose: (wasClosedFromMenuButton: boolean) => void
  menuRef: React.RefObject<HTMLDivElement>
}

const VariableAIOptionsMenu: React.FC<IVariableAIOptionsMenuProps> = ({
  isOpen,
  anchorEl,
  currentVariable,
  currentValue,
  handleClose,
  menuRef,
}) => {
  const [originalText, setOriginalText] = useState('')

  const dispatch = useAppDispatch()
  const autocompleteOptions = useAppSelector(selectVariableAIOptions)

  const { statement } = useStatementContext()
  const { section } = useSectionContext()
  const { updateVariableLatestValues } = useVariableLatestValues()

  const isLoading = useMemo(() => {
    return autocompleteOptions[currentVariable?.name]?.loadingState === 'loading'
  }, [autocompleteOptions, currentVariable?.name])

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (!currentVariable) return
      dispatch(
        updateVariable({
          variableName: currentVariable.name,
          newValue: value,
        })
      )

      if (statement?.id) {
        dispatch(
          updateStatement({
            id: statement.id,
            updatePayload: { _triggerUpdate: true },
            shouldSave: false,
          })
        )
      } else {
        dispatch(
          updateAndSaveSection({
            id: section.id,
            newValues: {
              _triggerUpdate: true,
            },
          })
        )
      }
      dispatch(clearVariableAIOptions({ variableName: currentVariable.name }))
      updateVariableLatestValues(currentVariable.name, value)
      handleClose(true)
    },
    [dispatch, currentVariable?.name, statement?.id, updateVariableLatestValues, handleClose, section.id]
  )

  const handleFillItIn = useCallback(() => {
    dispatch(clearVariableAIOptions({ variableName: currentVariable?.name }))
    handleClose(true)
  }, [currentVariable?.name, dispatch, handleClose])

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isOpen) {
        const popoverElement = menuRef.current
        const anchorElement = anchorEl as HTMLElement

        if (
          popoverElement &&
          anchorElement &&
          !popoverElement.contains(event.target as Node) &&
          !anchorElement.contains(event.target as Node)
        ) {
          dispatch(clearVariableAIOptions({ variableName: currentVariable?.name }))
          handleClose(false)
        }
      }
    },
    [isOpen, menuRef, anchorEl, dispatch, currentVariable?.name, handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      setOriginalText(currentValue)
    }
  }, [currentValue, isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <StyledPopover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      disableRestoreFocus
      disableEnforceFocus
      disableAutoFocus
      style={{ pointerEvents: 'none' }}
    >
      <Box ref={menuRef} sx={{ pointerEvents: 'auto' }}>
        <PopoverContent>
          <GradientBorder borderRadius="6px">
            <TypographyWrapper>
              {isLoading ? (
                <>
                  <LoaderIcon />

                  <Typography variant="inherit" sx={{ marginLeft: '8px' }}>
                    Generating Suggestions
                  </Typography>
                </>
              ) : (
                <>
                  <SparklesIcon width={14} height={14} />
                  <Typography variant="inherit" sx={{ marginLeft: '8px' }}>
                    Suggestions
                  </Typography>
                </>
              )}
            </TypographyWrapper>

            {isLoading ? (
              <Box sx={{ px: '20px', pb: '17px' }}>
                <Skeleton variant="text" width="100%" height={16} sx={{ borderRadius: '2px', transform: 'none' }} />
              </Box>
            ) : (
              <Box sx={{ marginTop: '-4px', paddingBottom: '8px' }}>
                <VariableAIOptions handleOptionSelect={handleOptionSelect} currentVariable={currentVariable} />
              </Box>
            )}
          </GradientBorder>

          <OriginalTextButton onClick={() => handleOptionSelect(originalText)} sx={{}}>
            <OriginalTextButtonCaption>Original text</OriginalTextButtonCaption>
            <OriginalTextButtonContent>{originalText}</OriginalTextButtonContent>
          </OriginalTextButton>
        </PopoverContent>

        <Divider />

        <PopoverContent>
          <StyledListItemButton onClick={handleFillItIn} className={VARIABLE_AI_OPTIONS_MENU_FILL_IT_IN}>
            <IconBackground>
              <img
                src="/static/icons/fa/pen-line.svg"
                alt="pen writing icon"
                width={18}
                height={18}
                style={{ display: 'block' }}
              />
            </IconBackground>
            <StyledListItemText primary="Fill it in" secondary="Custom" />
          </StyledListItemButton>
        </PopoverContent>
      </Box>
    </StyledPopover>
  )
}

export default VariableAIOptionsMenu
