import { ActionNames, TemplateData, TemplateDataDTO, TemplateStatementActionHintParams } from '../types/editor';
/** We had a bug where we were saving duplicated variables in the database, this function fixes it */
export declare const fixDuplicatedVariables: (template: TemplateData) => TemplateData;
/**
 * This function was made to fix corrupted dynamic fields data in the database.
 * It may be also useful to cleanup the payload before sending it to the database.
 * This way we're sure corrupted data never gets out anymore.
 */
export declare const fixTemplateDynamicFieldsNotation: (template: TemplateData) => TemplateData;
/**
 * Normalizes templateData before it's saved to database through API.
 * It's main purpose is to have a one way to cleanup corrupted, or badly shaped data */
export declare const normalizeTemplateDataWrite: (templateData: TemplateData) => TemplateData;
/**
 * Normalizes templateData after it's read from database through API.
 * It's main purpose is to have a one way to cleanup corrupted, or badly shaped data */
export declare const normalizeTemplateDataRead: (templateData: TemplateData) => TemplateData;
/**
 * AI service returns some properties we choose to ignore.
 * Mentioned properties should be controlled by the user through UI, we can't let AI service response to override those.
 */
export declare const cleanupAIServiceResponse: (data: TemplateData) => TemplateData;
/**
 * Removes all properties with keys starting with an underscore from a TemplateData object.
 * This function is used to clean the data before sending it to the backend.
 *
 * @param {TemplateData} data - The original TemplateData object potentially containing private properties.
 * @returns {TemplateDataDTO} A new object of type TemplateDataDTO with all private properties removed.
 */
export declare const removePrivateProperties: (data: TemplateData) => TemplateDataDTO;
/**
 * Maps action names to template statement parameters.
 *
 * This function takes an array of `ActionNames`
 * to determine which properties in `TemplateStatementActionHintParams` should be set to true.
 *
 * @param {ActionNames[]} actionHints - An array of actions that will modify the template parameters.
 * @returns {TemplateStatementActionHintParams} - An object with updated parameters based on the actions.
 */
export declare const mapActionHintNamesToStatementHintParams: (actionHints: ActionNames[]) => TemplateStatementActionHintParams;
//# sourceMappingURL=templateDataCleanup.d.ts.map