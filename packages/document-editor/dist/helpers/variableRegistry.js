import { VARIABLE_REGEXP } from '../helpers/parseTemplateStatements';
import { AUTOFILLED_VARIABLES } from '../types/templates';
const createVariableRegistryEntry = (entry) => ({
    initialValue: entry.initialValue || '',
    value: entry.value || '',
    variableHistory: entry.variableHistory || [],
    name: entry.name,
});
const createVariableRegistryEntryFromLegacyVariable = (variable) => {
    return createVariableRegistryEntry({
        name: variable.name,
        initialValue: variable.example.join(', '),
        value: variable.value ?? '',
        variableHistory: variable.variableHistory ?? [],
    });
};
export const suffixVariableName = (variableRegistry, variableName, initialValue) => {
    if (AUTOFILLED_VARIABLES.includes(variableName)) {
        return variableName;
    }
    const existingVariable = variableRegistry[variableName];
    if (existingVariable && existingVariable.initialValue !== initialValue) {
        const similarNames = Object.keys(variableRegistry).filter((name) => name === variableName || Boolean(name.match(new RegExp(`^${variableName}-\\d+$`))));
        return `${variableName}-${similarNames.length + 1}`;
    }
    return variableName;
};
export const createVariableName = (input, options = {}) => {
    const separator = '_';
    let result = input;
    result = result
        .trim()
        .replace(/[^a-zA-Z0-9\s_-]/g, '') // removes unwanted chars
        .replace(/[\s-]+/g, separator) // replaces white spaces and dashes with underscores
        .replace(/_+/g, separator) // replaces double underscores with single underscore
        .replace(/^_+|_+$/g, '') // trims underscores from the start/end
        .toLowerCase();
    if (options.maxWords) {
        result = result.split(separator, options.maxWords).join(separator);
    }
    return result;
};
const updateVariableNameWithinSection = (section, originalName, newName) => {
    if (!section || !section.name || !section.statements || originalName === newName) {
        return section;
    }
    const replaceVariableNameInText = (text, originalName, newName) => {
        return text.replace(new RegExp(`\{${originalName}\}`, 'g'), `{${newName}}`);
    };
    const updatedSection = {
        ...section,
        name: replaceVariableNameInText(section.name, originalName, newName),
        statements: section.statements.map((statement) => ({
            ...statement,
            text: replaceVariableNameInText(statement.text, originalName, newName),
        })),
    };
    return updatedSection;
};
const addLegacyVariablesIntoRegistry = (variableRegistry, section) => {
    const updatedRegistry = { ...variableRegistry };
    for (const sectionVariable of section?.variables ?? []) {
        if (!updatedRegistry[sectionVariable.name]) {
            updatedRegistry[sectionVariable.name] = createVariableRegistryEntryFromLegacyVariable(sectionVariable);
        }
    }
    for (const statement of section?.statements ?? []) {
        for (const statementVariable of statement?.variables ?? []) {
            if (!updatedRegistry[statementVariable.name]) {
                updatedRegistry[statementVariable.name] = createVariableRegistryEntryFromLegacyVariable(statementVariable);
            }
        }
    }
    return updatedRegistry;
};
const uploadIntoRegistry = (variableRegistry, section) => {
    if (section?.state !== 'success' || section?.isRegenerating) {
        return [variableRegistry, section];
    }
    if (!section?.section_variables || !variableRegistry) {
        const updatedRegistryFromLegacyData = addLegacyVariablesIntoRegistry(variableRegistry, section);
        return [updatedRegistryFromLegacyData, section];
    }
    const updatedRegistry = { ...variableRegistry };
    const variableNamesToUpdate = [];
    Object.entries(section.section_variables ?? {}).forEach(([variableName, initialValue]) => {
        if (updatedRegistry[variableName] !== undefined) {
            const uniqueVariableName = suffixVariableName(updatedRegistry, variableName, initialValue);
            variableNamesToUpdate.push([variableName, uniqueVariableName]);
            updatedRegistry[uniqueVariableName] = createVariableRegistryEntry({
                name: uniqueVariableName,
                initialValue,
            });
        }
        else {
            updatedRegistry[variableName] = createVariableRegistryEntry({
                name: variableName,
                initialValue,
            });
        }
    });
    const updatedSection = variableNamesToUpdate.reduce((sectionMemo, [originalName, newName]) => updateVariableNameWithinSection(sectionMemo, originalName, newName), { ...section });
    delete updatedSection.section_variables;
    return [updatedRegistry, updatedSection];
};
export const createOrUpdateVariableRegistry = (template) => {
    if (!template || !template.sections) {
        return template;
    }
    let updatedRegistry = template.variableRegistry || {};
    const updatedSections = [];
    for (const section of template.sections) {
        const [newRegistry, newSection] = uploadIntoRegistry(updatedRegistry, section);
        updatedRegistry = newRegistry;
        updatedSections.push(newSection);
    }
    return {
        ...template,
        variableRegistry: updatedRegistry,
        sections: updatedSections,
    };
};
export const removeUnusedVariablesFromRegistry = (template) => {
    if (!template?.variableRegistry || Object.entries(template?.variableRegistry).length === 0) {
        return template;
    }
    const usedVariableNames = new Set();
    template.sections?.forEach((section) => {
        if (section.name) {
            const matches = section.name?.match(VARIABLE_REGEXP) ?? [];
            matches?.forEach((name) => usedVariableNames.add(name));
        }
        section.statements?.forEach((statement) => {
            const matches = statement.text?.match(VARIABLE_REGEXP) ?? [];
            matches?.forEach((name) => usedVariableNames.add(name));
        });
    });
    const refreshedVariableRegistry = Array.from(usedVariableNames).reduce((newRegistry, bracedVariableName) => {
        const variableName = bracedVariableName.replace('{', '').replace('}', '');
        return {
            ...newRegistry,
            [variableName]: template.variableRegistry[variableName],
        };
    }, {});
    return {
        ...template,
        variableRegistry: refreshedVariableRegistry,
    };
};
export const countVariablesInText = (text) => {
    const matches = text.match(VARIABLE_REGEXP);
    if (!matches) {
        return 0;
    }
    const uniqueVariables = new Set();
    matches.forEach((variableName) => {
        uniqueVariables.add(variableName);
    });
    return uniqueVariables.size;
};
const exportsForTesting = {
    createOrUpdateVariableRegistry,
    createVariableRegistryEntry,
    removeUnusedVariablesFromRegistry,
    suffixVariableName,
    uploadIntoRegistry,
    updateVariableNameWithinSection,
    createVariableRegistryEntryFromLegacyVariable,
    addLegacyVariablesIntoRegistry,
    countVariablesInText,
    createVariableName,
};
export default exportsForTesting;
//# sourceMappingURL=variableRegistry.js.map