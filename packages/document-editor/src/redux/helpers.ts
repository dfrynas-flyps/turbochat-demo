import { selectPrompts } from '../redux/selectors'
import { RootState } from '../redux/store'
import type {
  Prompt,
  PromptTypes,
  SavableTemplatePrompts,
  StatementTypes,
  TemplateSection,
  TemplateStatement,
} from '../types/editor'
import type { TemplateState } from './types'

const statementsNames: { [Type in StatementTypes]?: string } = {
  image: 'New image',
}

export const DEFAULT_STATEMENT_TITLE = 'New statement'

export enum LoadState {
  Pending = 'pending',
  Placeholder = 'placeholder',
  Ready = 'ready',
}

export const getDefaultPrompt = (prompts: Prompt[] | null) => {
  if (!Array.isArray(prompts)) return null

  const defaultPrompt = prompts.find((p) => p.default)
  if (defaultPrompt) return defaultPrompt
  return prompts.find((p) => p.initial)
}

export const getCombinedPromptsPayload = (
  state: RootState,
  promptType: PromptTypes,
  promptsToUpdate: Prompt[]
): Record<PromptTypes, Prompt[]> => {
  const prompts = selectPrompts(state)

  const combinedPrompts: Record<PromptTypes, Prompt[]> = {
    templatize: [...prompts.templatize],
    classify: [...prompts.classify],
    actionHintLogic: [...prompts.actionHintLogic],
    classifyImage: [...prompts.classifyImage],
    [promptType]: promptsToUpdate,
  }

  return combinedPrompts
}

export const createNewStatement = (
  data: Partial<TemplateStatement> & {
    id: TemplateStatement['id']
    type: StatementTypes
  }
): TemplateStatement => {
  const newStatementDefaults = {
    description: '',
    name: statementsNames[data.type] || DEFAULT_STATEMENT_TITLE,
    variables: [],
    text: '',
    nameStatus: LoadState.Placeholder as TemplateStatement['nameStatus'],
    last_statement: true,
    isImageReady: undefined as boolean | undefined,
  }

  if (data.type === 'image') {
    newStatementDefaults.isImageReady = true
  }

  return {
    ...newStatementDefaults,
    ...data,
  }
}

export const updateSectionField = ({
  state,
  id,
  newValues,
}: {
  state: TemplateState
  id: string
  newValues: Partial<TemplateSection>
}) => {
  if (!state.data) {
    console.warn('Unable to update section field before establishing template data')
    return
  }

  state.data.sections = state.data.sections.map((section) => {
    if (section.id === id) {
      return {
        ...section,
        ...newValues,
      }
    }

    return section
  })
}

export const updateStatementField = ({
  state,
  id,
  newValues,
  updateAll,
}: {
  state: TemplateState
  id: string
  newValues: Record<string, unknown>
  updateAll?: boolean
}) => {
  if (!state.data) {
    console.error('Unable to update statement field before establishing template data')
    return
  }

  state.data.sections = state.data.sections.map((section) => ({
    ...section,
    statements: section.statements.map((statement) => ({
      ...statement,
      ...((updateAll || statement.id === id) && newValues),
    })),
  }))
}

export const updatePromptFields = ({ state, prompts }: { state: TemplateState; prompts: SavableTemplatePrompts }) => {
  state.prompts = {
    ...state.prompts,
    ...prompts,
  }
}
