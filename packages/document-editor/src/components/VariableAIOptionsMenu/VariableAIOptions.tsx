import { Box } from '@mui/material'
import React from 'react'

import { useAppSelector } from '../../hooks/redux'
import { selectVariableAIOptions } from '../../redux/selectors'
import { VariableRegistryEntry } from '../../types/editor'
import ReasonTooltip from './ReasonTooltip'
import { AutocompleteOption } from './VariableAiOptionsMenu.styled'

interface IVariableAIOptionsProps {
  currentVariable: VariableRegistryEntry
  handleOptionSelect: (optionText: string) => void
}

const VariableAIOptions = (props: IVariableAIOptionsProps) => {
  const variableAIOptions = useAppSelector(selectVariableAIOptions)

  const isError = variableAIOptions[props.currentVariable?.name]?.loadingState === 'error'

  if (isError) return null

  return (
    <>
      {[0, 1].map((value) => {
        const autocompleteOptions = variableAIOptions[props.currentVariable?.name]?.variableOptions
        const option = autocompleteOptions?.options?.[value]
        const recommendation = autocompleteOptions?.recommendation

        const isRecommended = recommendation?.hint === value + 1

        if (option?.text) {
          return (
            <AutocompleteOption
              key={value}
              isRecommended={isRecommended}
              onClick={() => props.handleOptionSelect(option.text)}
            >
              <Box sx={{ flex: 1 }}>{option.text}</Box>

              <Box className="info">
                <ReasonTooltip>{option.reason}</ReasonTooltip>
              </Box>
            </AutocompleteOption>
          )
        }

        return null
      })}
    </>
  )
}

export default VariableAIOptions
