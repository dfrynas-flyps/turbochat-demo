import { ProjectData, TemplateSection, TemplateStatement, VariableMode, VariableRegistry, VariableRegistryEntry } from '../types/editor';
export declare const VARIABLE_REGEXP: RegExp;
export declare const createHTMLTag: ({ tagName, innerText, attrs, }: {
    tagName: string;
    innerText: string;
    attrs: Record<string, string | number | boolean>;
}) => string;
export declare const getVariableValue: (variable: VariableRegistryEntry, projectData: ProjectData) => string;
/**
 * Formats statement text and replaces variables with it's values, or with appropriate HTML tags for TipTap editor.
 */
export declare const formatStatementText: ({ statement, sectionId, variableRegistry, projectData, variableOutput, }: {
    statement: TemplateStatement;
    projectData: ProjectData;
    variableRegistry: VariableRegistry;
    variableOutput?: VariableMode;
    sectionId: TemplateSection["id"];
}) => string;
/**
 * Formats section name and replaces variables with it's values, or with appropriate HTML tags for TipTap editor.
 */
export declare const formatSectionName: ({ section, variableRegistry, projectData, variableOutput, }: {
    section: TemplateSection;
    variableRegistry: VariableRegistry;
    projectData: ProjectData;
    variableOutput?: VariableMode;
}) => string;
/**
 * Transforms section name to have variables in curly bracket notation, and with all HTML tags stripped.
 * @param {string} sectionName The input string
 * @returns {string} The section name without HTML tags
 */
export declare const editorHtmlToSectionName: (sectionName: string) => string;
/**
 * Transforms statement text to have variables in curly bracket notation, and strips all unnecessary HTML tags.
 * @param {string} statementText The input string
 * @returns
 */
export declare const editorHtmlToStatementText: (statementText: string) => string;
//# sourceMappingURL=parseTemplateStatements.d.ts.map