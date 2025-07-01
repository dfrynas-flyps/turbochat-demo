import React, { useCallback, useEffect, useMemo } from 'react'

import Box from '@mui/material/Box'
import { debounce } from 'lodash'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchData, saveData } from '../redux'
import { selectData, selectTriggerDataSave } from '../redux/selectors'
import { TemplateData } from '../types/editor'
import { DocumentPaper } from './DocumentPaper'
import EditorComponent from './Editor'

export const EditorWrapper = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  const triggerDataSave = useAppSelector(selectTriggerDataSave)

  // Create the save function (not debounced yet)
  const saveDataFn = useCallback(
    (newData: TemplateData, triggerDataSave: number | null) => {
      if (triggerDataSave && newData) {
        console.log('saveDataFn', new Date().toISOString(), newData)
        dispatch(saveData({ id, data: newData }))
      }
    },
    [dispatch, id]
  )

  // Create the debounced version of the save function
  const saveDataDebounced = useMemo(() => debounce(saveDataFn, 1000), [saveDataFn])

  // Call the debounced function when either data or triggerDataSave changes
  useEffect(() => {
    if (triggerDataSave && data) {
      saveDataDebounced(data, triggerDataSave)
    }
  }, [triggerDataSave, data, saveDataDebounced])

  useEffect(() => {
    if (id) {
      dispatch(fetchData({ id }))
    }
  }, [dispatch, id])

  if (!data) {
    return null
  }

  return <EditorComponent sections={data.sections} />
}
