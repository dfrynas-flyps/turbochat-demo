// import type { PayloadAction, TypedStartListening } from '@reduxjs/toolkit'
// import { isEqual } from 'lodash'
// import Router from 'next/router'
// import type { AppDispatch, RootState } from '../store'
import { TemplateData, TemplateDataTypes, TemplateSection } from '../types/editor'
// import {
//   fetchAITemplate,
//   fetchData,
//   getRegeneratedSection,
//   regenerateSection,
//   saveData,
//   setData,
//   setFetchError,
//   setRegeneratedSection,
// } from './index'
//
// // todo mock
// // const getEntityContextFromRouter = (router: any, levelPath: string) => ({})
//
// type AppStartListening = TypedStartListening<RootState, AppDispatch>
//
// // time between requests to check if data is ready
// const waitingTime = 5000
//
// // Check if AI data is ready
export const isDataReady = (data: TemplateData) => {
  if (!data) {
    return false
  }

  if (data.state !== 'success' && data.state !== 'failed') {
    return false
  }

  if (!data.sections || data.sections.length === 0) {
    return false
  }

  return data.sections.every((section: TemplateSection) => section.state === 'success' || section.state === 'failed')
}
//
// // Don't override existing ready sections
// const fillNewSections = (currentState: TemplateData, newData: TemplateData) => {
//   const data = { ...newData, name: currentState.name, variableRegistry: currentState.variableRegistry ?? {} }
//   data.sections = newData.sections?.map((section) => {
//     const currentSection = currentState.sections.find((el) => el.id === section.id)
//     return currentSection?.state === 'success' ? currentSection : section
//   })
//   return data
// }

// export const setupTemplateListeners = (startListening: AppStartListening) => {
//   startListening({
//     actionCreator: fetchAITemplate.fulfilled,
//     effect: async (action, listenerApi) => {
//       listenerApi.cancelActiveListeners()
//       const state = listenerApi.getState()
//
//       const isReady = isDataReady(action.payload.data)
//       const {
//         template: { data },
//       } = state
//       if (!data) return
//
//       // Update BE save only on the first pull or if data is fully ready
//       if (!data.id || isReady) {
//         const source = data.source
//
//         listenerApi.dispatch(
//           saveData({
//             id: Router.query.id as string,
//             data: { ...action.payload.data, name: data.name, source },
//             // ...getEntityContextFromRouter(Router, Router.query.levelPath as string),
//           })
//         )
//       }
//
//       if (action.payload.data?.state === 'failed' || !action.payload.data?.id) {
//         listenerApi.dispatch(setFetchError(true))
//       } else {
//         if (!isEqual(data, action.payload)) {
//           const newData = { ...action.payload.data, source: data.source }
//           listenerApi.dispatch(setData(fillNewSections(data, newData)))
//         }
//         if (!isReady) {
//           await listenerApi.delay(waitingTime)
//           listenerApi.dispatch(
//             fetchAITemplate({
//               id: action.payload.data.id,
//               ...(action.payload.prompt ? { prompt: action.payload.prompt } : {}),
//             })
//           )
//         }
//       }
//     },
//   })
//
//   startListening({
//     actionCreator: fetchAITemplate.rejected,
//     effect: async (action, listenerApi) => {
//       listenerApi.cancelActiveListeners()
//       await listenerApi.delay(waitingTime)
//       const {
//         meta: {
//           arg: { id, prompt },
//         },
//       } = action
//
//       listenerApi.dispatch(
//         fetchAITemplate({
//           id,
//           retrying: true,
//           ...(prompt ? { prompt } : {}),
//         })
//       )
//     },
//   })
//
//   startListening({
//     actionCreator: fetchData.fulfilled,
//     effect: async (action: PayloadAction<TemplateData>, listenerApi) => {
//       listenerApi.cancelActiveListeners()
//
//       if (action.payload.type && action.payload.type !== TemplateDataTypes.TEMPLATE) {
//         return
//       }
//
//       const isNewDataReady = isDataReady(action.payload)
//       if (action.payload?.id && !isNewDataReady) {
//         listenerApi.dispatch(
//           fetchAITemplate({
//             id: action.payload.id,
//           })
//         )
//       }
//
//       if (action.payload?.sections && action.payload?.id && isNewDataReady) {
//         action.payload.sections.forEach((section) => {
//           if (section.isRegenerating) {
//             listenerApi.dispatch(
//               getRegeneratedSection({
//                 templateId: action.payload.id,
//                 sectionId: section.id,
//               })
//             )
//           }
//         })
//       }
//     },
//   })
//
//   startListening({
//     actionCreator: regenerateSection.fulfilled,
//     effect: async (action, listenerApi) => {
//       const { templateId, sectionId } = action.payload
//       listenerApi.dispatch(getRegeneratedSection({ templateId, sectionId }))
//     },
//   })
//
//   startListening({
//     actionCreator: getRegeneratedSection.fulfilled,
//     effect: async (action, listenerApi) => {
//       if (['processing', 'retry'].includes(action.payload?.state)) {
//         const {
//           meta: {
//             arg: { sectionId, templateId },
//           },
//         } = action
//         await listenerApi.delay(waitingTime)
//         listenerApi.dispatch(getRegeneratedSection({ templateId, sectionId }))
//       } else {
//         listenerApi.dispatch(setRegeneratedSection(action.payload))
//       }
//     },
//   })
// }
