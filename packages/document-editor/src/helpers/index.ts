import { TemplateSection, TemplateState } from '../types/editor'

export const checkSectionSoftDeleted = (section: TemplateSection) => {
  if (section?.statements.length === 0) return false

  return section.statements.every((statement) => statement.isDeleted)
}

export const isLoading = (state: TemplateState) => ['processing', 'pending', 'retry'].includes(state)
