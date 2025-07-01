import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../redux/store'
import { PromptTypes, TemplateData, TemplateSection, TemplateStatement, VariableRegistry } from '../types/editor'

export const selectIsTemplateLoading = (state: RootState) => state.template.isTemplateLoading
export const selectActiveVar = (state: RootState) => state.template.activeVar
export const selectVariableAIOptions = (state: RootState) => state.template.variableAIOptions
export const selectProjectVariableValues = (state: RootState) => state.template.projectVariableValues
export const selectActiveSectionId = (state: RootState) => state.template.activeSection?.id ?? null
export const selectActiveStatement = (state: RootState) => state.template.activeStatement
// export const selectInitialData = (state: RootState) => state.template.initialData
export const selectData = (state: RootState) => state.template.data
// export const selectPoolingPrompts = (state: RootState) => state.template.poolingPrompts

// export const selectTemplateName = (state: RootState) => state.template.data?.name
export const selectNewStatement = (state: RootState) => state.template.newStatement
// export const selectAlert = (state: RootState) => state.template.alert
// export const selectCreateState = (state: RootState) => state.template.createState
// export const selectTrackLoadedTemplateAfterCreation = (state: RootState) =>
//   state.template.trackLoadedTemplateAfterCreation
// export const selectSavingState = (state: RootState) => state.template.savingState
export const selectProjectData = (state: RootState) => state.template.projectData
export const selectTriggerDataSave = (state: RootState) => state.template.triggerDataSave
// export const selectDeleteModal = (state: RootState) => state.template.deleteModal
// export const selectPromptToDelete = (state: RootState) => state.template.promptToDelete
export const selectPrompts = (state: RootState) => state.template.prompts
// export const selectDocumentHeader = (state: RootState) => state.template.data?.documentHeader

export const selectStatementById = createSelector(
  [selectData, (_: RootState, statementId: TemplateStatement['id']) => statementId],
  (templateData, statementId) => {
    const sections = templateData?.sections || []

    for (const section of sections) {
      for (const statement of section.statements) {
        if (statement.id === statementId) {
          return statement
        }
      }
    }
    return null
  }
)

export const selectSectionById = createSelector(
  [selectData, (_: RootState, sectionId: TemplateSection['id']) => sectionId],
  (templateData, sectionId) => {
    return templateData?.sections.find((section) => section.id === sectionId)
  }
)

export const selectPreviousStatement = createSelector(
  [selectData, (_: RootState, statementId: TemplateStatement['id']) => statementId],
  (templateData, statementId) => {
    const sections = templateData?.sections || []

    for (const section of sections) {
      for (const [index, statement] of section.statements.entries()) {
        if (statement.id === statementId) {
          if (index >= 1) {
            return section.statements[index - 1]
          }
          return null
        }
      }
    }
    return null
  }
)

export const selectPromptsByType = createSelector(
  [selectPrompts, (_: RootState, promptType: PromptTypes) => promptType],
  (promptsObject, promptType) => {
    const promptsByType = promptsObject[promptType]

    return promptsByType
  }
)

const MEMOIZED_EMPTY_OBJECT = {}
export const selectVariableRegistry = createSelector(
  [selectData],
  (templateData: TemplateData | null): VariableRegistry => {
    if (templateData?.variableRegistry) {
      return templateData.variableRegistry
    }
    return MEMOIZED_EMPTY_OBJECT
  }
)
