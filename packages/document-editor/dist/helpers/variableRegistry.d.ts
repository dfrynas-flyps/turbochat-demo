import { TemplateData, TemplateSection, TemplateVariable, VariableRegistry, VariableRegistryEntry } from '../types/editor';
export declare const suffixVariableName: (variableRegistry: VariableRegistry, variableName: string, initialValue: string) => string;
export declare const createVariableName: (input: string, options?: Partial<{
    maxWords: number;
}>) => string;
export declare const createOrUpdateVariableRegistry: (template: TemplateData) => TemplateData;
export declare const removeUnusedVariablesFromRegistry: (template: TemplateData) => TemplateData;
export declare const countVariablesInText: (text: string) => number;
declare const exportsForTesting: {
    createOrUpdateVariableRegistry: (template: TemplateData) => TemplateData;
    createVariableRegistryEntry: (entry: Partial<VariableRegistryEntry> & {
        name: VariableRegistryEntry["name"];
    }) => VariableRegistryEntry;
    removeUnusedVariablesFromRegistry: (template: TemplateData) => TemplateData;
    suffixVariableName: (variableRegistry: VariableRegistry, variableName: string, initialValue: string) => string;
    uploadIntoRegistry: (variableRegistry: VariableRegistry, section: TemplateSection) => [VariableRegistry, TemplateSection];
    updateVariableNameWithinSection: (section: TemplateSection, originalName: string, newName: string) => TemplateSection;
    createVariableRegistryEntryFromLegacyVariable: (variable: TemplateVariable) => VariableRegistryEntry;
    addLegacyVariablesIntoRegistry: (variableRegistry: VariableRegistry, section: TemplateSection) => VariableRegistry;
    countVariablesInText: (text: string) => number;
    createVariableName: (input: string, options?: Partial<{
        maxWords: number;
    }>) => string;
};
export default exportsForTesting;
//# sourceMappingURL=variableRegistry.d.ts.map