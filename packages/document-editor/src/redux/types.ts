import { AlertColor } from '@mui/material'
import {
  DeleteModalTypes,
  ProjectData,
  ProjectVariable,
  SavingState,
  StatementTypes,
  TemplateData,
  TemplatePrompts,
  TemplateStatement,
  VariableRegistryEntry,
} from '../types/editor'
import { VariableAIOptionsResponse } from './thunks'

export type File = {
  fileName: string
  id: string
  projectPath: string | string[]
}

export type RegeneratePrompts = {
  prompt?: string
}

export type LoadingState = 'loaded' | 'loading' | 'error'

export type NormalizedVariableAIOptionsState = {
  [key: string]: {
    loadingState: LoadingState
    variableOptions: VariableAIOptionsResponse | null
  } | null
}

export type ActiveVariable = VariableRegistryEntry & { variableDisplayId: string }

export interface TemplateState {
  activeSection: null | {
    id: string
  }
  activeVar: ActiveVariable | null
  activeStatement: null | {
    id: string
    navInitiated: boolean
    classificationOpen: boolean
  }
  variableAIOptions: NormalizedVariableAIOptionsState
  projectVariableValues: ProjectVariable[]
  isTemplateLoading: boolean
  poolingPrompts: RegeneratePrompts | null
  initialData: TemplateData | null
  data: TemplateData | null
  createState: {
    loading: boolean
    error: boolean
    message?: string
  }
  savingState: {
    initialSaveSuccess: boolean
    error: boolean
    state: SavingState
  }
  newStatement:
    | (Partial<TemplateStatement> & {
        id: TemplateStatement['id']
        type: StatementTypes
        imageUrl?: string
        mode?: 'prepend' | 'append'
      })
    | null
  alert: {
    type?: AlertColor
    text: string
  }
  projectData: ProjectData
  triggerDataSave: null | number
  trackLoadedTemplateAfterCreation: boolean
  deleteModal?: {
    id: string
    type: DeleteModalTypes
  } | null
  promptToDelete?: string
  prompts: TemplatePrompts
}
