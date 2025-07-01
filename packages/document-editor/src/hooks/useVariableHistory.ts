import isEmpty from 'lodash/isEmpty'
import { useCallback } from 'react'

import { setVariableHistory } from '../redux/index'
import { selectData, selectVariableRegistry } from '../redux/selectors'
import { VariableHistoryEntry, VariableHistoryEntryAuthorType } from '../types/editor'
import { useAppDispatch, useAppSelector } from './redux'

// TODO: figure out if variable history is still needed,
// because it's probably only used for DOCX exports, which are not relevant within this package
export const useVariableHistory = () => {
  const dispatch = useAppDispatch()
  const templateData = useAppSelector(selectData)
  const variableRegistry = useAppSelector(selectVariableRegistry)

  const createNewEntry = useCallback(
    (value: string, authorType: VariableHistoryEntryAuthorType): VariableHistoryEntry => {
      if (isEmpty(templateData)) {
        throw new Error('Unable to create variable history entry without template data')
      }

      return {
        createdAt: new Date().toISOString(),
        value: value,
        sourceType: templateData.type,
        authorType,
      }
    },
    [templateData]
  )

  const addVariableHistoryEntry = useCallback(
    (variableName: string, newValue: string, authorType: VariableHistoryEntryAuthorType) => {
      const currentVariable = variableRegistry[variableName]

      const latestHistoricalEntry = currentVariable?.variableHistory
        ?.slice()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0]

      if (!latestHistoricalEntry || latestHistoricalEntry.value !== newValue) {
        dispatch(
          setVariableHistory({
            variableName: variableName,
            newHistory: [...(currentVariable?.variableHistory || []), createNewEntry(newValue, authorType)],
          })
        )
      }
    },
    [variableRegistry, createNewEntry, dispatch]
  )

  // The main purpose of resetting history, is when user edits a variable in a template, not templatedDocument
  const resetVariableHistory = useCallback(
    (variableName: string, newValue: string, authorType: VariableHistoryEntryAuthorType) => {
      dispatch(
        setVariableHistory({
          variableName: variableName,
          newHistory: [createNewEntry(newValue, authorType)],
        })
      )
    },
    [createNewEntry, dispatch]
  )

  return { createNewEntry, addVariableHistoryEntry, resetVariableHistory }
}
