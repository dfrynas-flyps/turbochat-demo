import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import uniqBy from 'lodash/uniqBy';
import { VARIABLE_REGEXP, editorHtmlToSectionName, editorHtmlToStatementText } from '../helpers/parseTemplateStatements';
import { ActionNames, StatementTypes, } from '../types/editor';
import { createOrUpdateVariableRegistry, removeUnusedVariablesFromRegistry } from './variableRegistry';
/** We had a bug where we were saving duplicated variables in the database, this function fixes it */
export const fixDuplicatedVariables = (template) => {
    if (!template) {
        return template;
    }
    const cleanVariables = (variables) => {
        if (Array.isArray(variables)) {
            return uniqBy([...variables].reverse(), 'name').reverse();
        }
        return variables;
    };
    return {
        ...template,
        sections: template.sections?.map((section) => ({
            ...section,
            variables: cleanVariables(section.variables),
            statements: section.statements?.map((statement) => ({
                ...statement,
                variables: cleanVariables(statement.variables),
            })),
        })),
    };
};
/**
 * This function was made to fix corrupted dynamic fields data in the database.
 * It may be also useful to cleanup the payload before sending it to the database.
 * This way we're sure corrupted data never gets out anymore.
 */
export const fixTemplateDynamicFieldsNotation = (template) => {
    if (!template) {
        return template;
    }
    return {
        ...template,
        sections: template.sections?.map((section) => {
            return {
                ...section,
                name: section.name ? editorHtmlToSectionName(section.name) : section.name,
                statements: section.statements?.map((statement) => {
                    return {
                        ...statement,
                        text: statement.text ? editorHtmlToStatementText(statement.text) : statement.text,
                    };
                }),
            };
        }),
    };
};
/**
 * Here we attempt to redefine the type of a TemplateStatement based on its content.
 * @param statement The TemplateStatement to be redefined.
 * @returns The redefined TemplateStatement.
 */
const redefineStatementType = (statement) => {
    const tableRegex = /<table[\s\S]*?<tr[\s\S]*?<td[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?<\/table>/i;
    if (statement.type === StatementTypes.TEXT) {
        if (tableRegex.test(statement.text)) {
            return { ...statement, type: StatementTypes.TABLE };
        }
    }
    if (statement.type === StatementTypes.LIST || statement.type === StatementTypes.TABLE) {
        const listItemRegex = /<li[\s\S]*?>/i;
        if (!listItemRegex.test(statement.text) && !tableRegex.test(statement.text)) {
            return { ...statement, type: StatementTypes.TEXT };
        }
    }
    return statement;
};
/**
 * Fixes the statement types in the template data.
 * @param templateData The original template data.
 * @returns The template data with fixed statement types.
 */
const fixStatementTypes = (templateData) => {
    return {
        ...templateData,
        sections: templateData.sections.map((section) => {
            return {
                ...section,
                statements: section.statements.map(redefineStatementType),
            };
        }),
    };
};
const detachTypeoverFromVariablesConcept = (templateData) => {
    const processStatement = (statement) => {
        if (!statement.typeoverMode) {
            return statement;
        }
        const isStatementTextAttachedToVariable = VARIABLE_REGEXP.test(statement.text) &&
            statement.text.trim().startsWith('{') &&
            statement.text.trim().endsWith('}') &&
            statement.text.trim().length > 2;
        if (!isStatementTextAttachedToVariable) {
            return statement;
        }
        const variableName = statement.text.trim().replace('{', '').replace('}', '');
        const variable = statement.variables.find((variableItem) => variableItem.name === variableName);
        if (!variable) {
            return statement;
        }
        const variableExampleValue = variable.type === 'list of strings' ? variable.example.join(', ') : variable.example[0];
        return {
            ...statement,
            text: variable.value || variableExampleValue || '',
            variables: statement.variables.filter((variableItem) => variableItem.name !== variableName),
        };
    };
    return {
        ...templateData,
        sections: templateData.sections.map((section) => {
            return {
                ...section,
                statements: section.statements.map(processStatement),
            };
        }),
    };
};
/**
 * @deprecated Every cleanup method inside should to be reviewed, to pick one of the following:
 * - run a migration script to fix all existing DB entries, and then remove a cleanup method,
 * - move the cleanup method to `normalizeTemplateDataWrite` or `normalizeTemplateDataRead` methods to avoid running it twice
 */
const legacyTemplateDataCleanup = (templateData) => {
    let output = fixTemplateDynamicFieldsNotation(templateData);
    output = fixStatementTypes(output);
    output = fixDuplicatedVariables(output);
    output = detachTypeoverFromVariablesConcept(output);
    return output;
};
/**
 * Normalizes templateData before it's saved to database through API.
 * It's main purpose is to have a one way to cleanup corrupted, or badly shaped data */
export const normalizeTemplateDataWrite = (templateData) => {
    let output = legacyTemplateDataCleanup(templateData);
    output = removePrivateProperties(output);
    output = removeUnusedVariablesFromRegistry(output);
    return output;
};
/**
 * Normalizes templateData after it's read from database through API.
 * It's main purpose is to have a one way to cleanup corrupted, or badly shaped data */
export const normalizeTemplateDataRead = (templateData) => {
    let output = legacyTemplateDataCleanup(templateData);
    output = createOrUpdateVariableRegistry(output);
    return output;
};
/**
 * AI service returns some properties we choose to ignore.
 * Mentioned properties should be controlled by the user through UI, we can't let AI service response to override those.
 */
export const cleanupAIServiceResponse = (data) => {
    return omit(data, ['doc_type', 'name', 'title', 'ce', 'process']);
};
/**
 * Removes all properties with keys starting with an underscore from a TemplateData object.
 * This function is used to clean the data before sending it to the backend.
 *
 * @param {TemplateData} data - The original TemplateData object potentially containing private properties.
 * @returns {TemplateDataDTO} A new object of type TemplateDataDTO with all private properties removed.
 */
export const removePrivateProperties = (data) => {
    const isPrivateKey = (_, key) => key.startsWith('_');
    const cleanObject = (obj) => omitBy(obj, (value, key) => {
        if (isPrivateKey(value, key))
            return true;
        if (isObject(value) && !Array.isArray(value)) {
            cleanObject(value);
        }
        return false;
    });
    const cleanData = {
        ...cleanObject(data),
        sections: data.sections.map((section) => ({
            ...cleanObject(section),
            statements: section.statements.map((statement) => cleanObject(statement)),
        })),
    };
    return cleanData;
};
/**
 * Maps action names to template statement parameters.
 *
 * This function takes an array of `ActionNames`
 * to determine which properties in `TemplateStatementActionHintParams` should be set to true.
 *
 * @param {ActionNames[]} actionHints - An array of actions that will modify the template parameters.
 * @returns {TemplateStatementActionHintParams} - An object with updated parameters based on the actions.
 */
export const mapActionHintNamesToStatementHintParams = (actionHints) => {
    const initialValues = {
        turnOffVariables: false,
        optionalStatement: false,
        typeoverMode: false,
        isDeleted: false,
    };
    if (!actionHints || !Array.isArray(actionHints) || actionHints?.length === 0) {
        return initialValues;
    }
    const mappedStatementHintParams = { ...initialValues };
    actionHints.forEach((action) => {
        switch (action) {
            case ActionNames.VARIABLES_OFF:
                mappedStatementHintParams.turnOffVariables = true;
                break;
            case ActionNames.OPTIONAL:
                mappedStatementHintParams.optionalStatement = true;
                break;
            case ActionNames.TYPEOVER:
                mappedStatementHintParams.typeoverMode = true;
                break;
            case ActionNames.RECOMMEND_DELETION:
                mappedStatementHintParams.isDeleted = true;
                break;
            case ActionNames.ALL_VARIABLES:
                mappedStatementHintParams.turnOffVariables = false;
                break;
            default:
                break;
        }
    });
    return mappedStatementHintParams;
};
//# sourceMappingURL=templateDataCleanup.js.map