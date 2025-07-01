import { Editor as CoreEditor } from '@tiptap/core'
import { Editor as ReactEditor } from '@tiptap/react'

export type TipTapEditor = CoreEditor | ReactEditor
export type TipTapCoreEditor = CoreEditor
export type TipTapReactEditor = ReactEditor

export type TemplateState = 'success' | 'pending' | 'raw_success' | 'retry' | 'failed' | 'timeout' | 'processing'

export enum VariableHistoryEntryAuthorType {
  USER = 'user',
  SYSTEM = 'system',
}

export type VariableHistoryEntry = {
  createdAt: string
  value: string
  sourceType: TemplateDataTypes
  authorType: VariableHistoryEntryAuthorType
}

export type TemplateVariable = {
  id: string
  name: string
  type: string
  description: string
  question: string
  example: string[]
  value?: string
  variableHistory?: VariableHistoryEntry[]
}

export type EntityContext = {
  project?: string
  entity?: string
  contextPath?: string
}

export type TemplateVariablesRegistry = Record<TemplateVariable['name'], TemplateVariable>

export type TemplateStatementActionHintParams = {
  turnOffVariables?: boolean
  optionalStatement?: boolean
  typeoverMode?: boolean
  isDeleted?: boolean
}

export enum LoadState {
  Pending = 'pending',
  Placeholder = 'placeholder',
  Ready = 'ready',
}

export type TemplateStatementDTO = TemplateStatementActionHintParams & {
  id: string
  name: string
  description: string
  text: string
  variables: TemplateVariable[]
  type?: StatementTypes
  isImageReady?: boolean
  imageUrl?: string
  isRegenerating?: boolean
  nameStatus?: LoadState
  classification?: Classification | null
  actionAutoApplied?: string | null
  // Indicates if a statement should be followed by a line break
  // (new paragraph, or new list item, etc.) for DOCX exports
  last_statement?: boolean
  indent_level?: number
}

export type TemplateStatement = TemplateStatementDTO & {
  // Properties prefixed with _ are private (FE-only, not sent to BE)
  _triggerUpdate?: boolean
  _focusPositionFromContentEnd?: number
}

export type TemplateSectionDTO = {
  id: string
  name: string
  state: TemplateState
  statements: TemplateStatementDTO[]
  path_variable_mapping: Record<string, string>
  isRegenerating?: boolean
  classification?: Classification | null
  header_size: string
  variables: TemplateVariable[]
}

export type TemplateSection = TemplateSectionDTO & {
  statements: TemplateStatement[]
  section_variables?: Record<VariableRegistryEntry['name'], VariableRegistryEntry['initialValue']>
  // Properties prefixed with _ are private (FE-only, not sent to BE)
  _triggerUpdate?: boolean
  _focusPositionFromContentEnd?: number
}

export enum TemplateDataTypes {
  TEMPLATE = 'template',
  TEMPLATE_DOCUMENT = 'templateDocument',
}
export enum TemplateVersionTypes {
  UNKNOWN = 'unknown',
  V5 = 'v5',
  V4 = 'v4',
}

export type VariableLatestValuesResponse = { projectVariables: ProjectVariable[] }

export const PROCESSABLE_AI_BE_TEMPLATE_VERSION = TemplateVersionTypes.V5

export type TemplateVersion = TemplateVersionTypes

export type HeaderFieldState = { id: string; width: number; text: string }
// FIXME: This name should indicate that this is reponse from templates AI backend service
export type TemplateDataDTO = {
  id: string
  name?: string // display name of the document/template
  title?: string // deprecated, `name` property should be used to reflect the display name of a document/template
  state: TemplateState
  sections: TemplateSectionDTO[]
  // AI backend returns ce and process as string, but we still have array of strings as a previous format
  ce?: string[] | string
  process?: string[] | string
  doc_type?: string
  classify_prompt_id?: string
  action_hint_logic_prompt_id?: string
  classify_image_prompt_id?: string
  promptIds: {
    [key in PromptTypes]?: string
  }
  type: TemplateDataTypes
  source?: {
    id: string
    name: string
    fileId?: string
  }
  version?: TemplateVersion
  locationId?: string
  lastUpdateAt?: string | Date
  visibility?: TEMPLATE_VISIBILITY_TAGS
  usesCount?: number
  tags?: string[]
  coverImgUrl?: string
  documentHeader?: Array<HeaderFieldState>
  documentHeading: string // part of template/document content (aka H1 heading)
  purposeAndNeed?: string[]
  proposedActions?: string[]
  relatedProject?: {
    url?: string
    name?: string
  }
  description?: string
  recordId?: string
  locationHistory?: LocationHistory[]
  showForProjectDefinitions?: string[] // only for templates in public catalog
}

export type VariableRegistryEntry = {
  name: string
  value: string
  initialValue: string
  variableHistory: VariableHistoryEntry[]
}

export type VariableRegistry = Record<VariableRegistryEntry['name'], VariableRegistryEntry>

export type TemplateData = TemplateDataDTO & {
  sections: TemplateSection[]
  variableRegistry?: VariableRegistry
  canUpdateLocation?: boolean
}

export type LocationHistory = {
  locationId: string
  createdAt: Date
}

export type TemplateMetadata = {
  visibility?: TEMPLATE_VISIBILITY_TAGS
  usesCount?: number
  tags?: string[]
  coverImgUrl?: string
  purposeAndNeed?: string[]
  proposedActions?: string[]
  description?: string
  locationHistory?: LocationHistory[]
  showForProjectDefinitions?: string[]
  relatedProject?: {
    url?: string
    name?: string
  }
  locationName?: string
  about?: string[]
  priority?: number
}

export enum TEMPLATE_VISIBILITY_TAGS {
  DRAFT = 'draft',
  CATALOG = 'catalog',
}

export const TemplateVisibilityTagsLabels = {
  [TEMPLATE_VISIBILITY_TAGS.DRAFT]: 'Draft',
  [TEMPLATE_VISIBILITY_TAGS.CATALOG]: 'Catalog',
} as const

// FIXME: cleanup mess with TemplateListData and TemplateRecordData
// on the other hand this type was used to type Record value received from turboplan-core
export type TemplateListData = Omit<TemplateData, 'sections' | 'promptIds' | 'state'> & {
  isTemplateReady?: boolean
  dataId?: string
}

export type TemplateVisibility = 'only-me' | 'level' | 'all-levels'

// export const isTemplateListDataItem = (item: any): item is TemplateListData => {
//   return item?.['type'] && [TemplateDataTypes.TEMPLATE, TemplateDataTypes.TEMPLATE_DOCUMENT].includes(item?.['type'])
// }

// export const isTemplateDocumentItem = (item: any): item is TemplateData => {
//   return item?.['type'] && [TemplateDataTypes.TEMPLATE_DOCUMENT].includes(item?.['type'])
// }

export type StatementProps = {
  statement: TemplateStatement
  idx: number
}

export enum ActionNames {
  ALL_VARIABLES = 'All variables',
  TYPEOVER = 'Typeover',
  RECOMMEND_DELETION = 'Recommend Deletion',
  VARIABLES_OFF = 'Variables Off',
  OPTIONAL = 'Optional',
}

export type Classification = {
  id: string
  classification: string
  hint: ActionNames[]
  patterns: boolean
  applies: number
}

export type HeaderClassification = Omit<Classification, 'id'>

export type StatementMetadata = {
  highlighting: string
  easy_deletion: boolean
}

export type Prompt = {
  name: string
  prompt: string
  default: boolean
  initial: boolean
  id: string
}

export type PromptTypes = 'templatize' | 'classify' | 'classifyImage' | 'actionHintLogic'
export type TemplatePrompts = { [key in PromptTypes]: Prompt[] }
export type SavableTemplatePrompts = Omit<TemplatePrompts, 'classifyImage'>

export enum EDocumentType {
  ScopingLetter = 'scoping_letter',
  ProposedAction = 'proposed_action',
  DecisionMemo = 'decision_memo',
  ResourceEvaluation = 'resource_evaluation',
  Other = 'other',
}

export type ProjectVariable = {
  documentType: EDocumentType
  documentId: string
  variableName: string
  variableValue: string
}

export type DeleteModalTypes = 'section' | 'statement' | 'prompt' | 'template' | 'document' | 'templatedDocument'

export type ProjectData = Record<string, string | null>

export type SavingState = 'none' | 'loading' | 'saved' | 'error'

export enum StatementTypes {
  TABLE = 'table',
  IMAGE = 'image',
  TEXT = 'text',
  LIST = 'list',
  ORDERED_LIST = 'structured_list_item',
  UNORDERED_LIST = 'unstructured_list_item',
}

const ListStatementTypes: StatementTypes[] = [StatementTypes.ORDERED_LIST, StatementTypes.UNORDERED_LIST]

export const isListStatement = (statementOrType: TemplateStatement | StatementTypes) => {
  if (typeof statementOrType === 'string') {
    return ListStatementTypes.includes(statementOrType as StatementTypes)
  }
  return ListStatementTypes.includes(statementOrType?.type as StatementTypes)
}

export type VariableMode = 'value' | 'editable' | 'decorated'

export type Point2D = {
  x: number
  y: number
}

// todo mocked from form turboplan
export const TemplatesModuleType = 'templates'
// todo mocked from form turboplan
export const TagsModuleType = 'tags'
