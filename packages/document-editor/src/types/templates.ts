/** Used for dynamic fields in template editor */
export const VAR_INPUT_TAG_NAME = 'var-input'
export const VAR_INPUT_EXTENSION_NAME = 'varInput'

/** Used for tab navigation between variables */
export const VARIABLE_NODE_SELECTOR = `[data-variable-node]`
export const VARIABLE_WRAPPER_SELECTOR = `[data-variable-wrapper]`

/** Used for Variable AI Options menu */
export const VARIABLE_AI_OPTIONS_MENU_FILL_IT_IN = 'variable-ai-options-menu-fill-it-in'

export const LEGACY_DEFAULT_NEW_VARIABLE_VALUE = 'new dynamic field'
export const DEFAULT_NEW_VARIABLE_VALUE = 'new variable'

/** Z-indexes from materialUI docs, sadly I wasn't able to import them from MUI package https://mui.com/material-ui/customization/default-theme/?expand-path=$.zIndex */
export const MATERIAL_UI_Z_INDEXES = {
  MOBILE_STEPPING: 1000,
  FAB: 1050,
  SPEED_DIAL: 1050,
  APP_BAR: 1100,
  DRAWER: 1200,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
}

/** Variable names that are autofilled, for now we have project_name and forest_name */
export const AUTOFILLED_VARIABLES = ['project_name', 'forest_name']
