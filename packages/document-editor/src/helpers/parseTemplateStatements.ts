import sanitizeHtml, { AllowedAttribute } from 'sanitize-html'
import { v4 as uuid } from 'uuid'

import {
  ProjectData,
  TemplateSection,
  TemplateStatement,
  VariableMode,
  VariableRegistry,
  VariableRegistryEntry,
} from '../types/editor'
import { VAR_INPUT_TAG_NAME } from '../types/templates'

// NOTE: Currently `createVariableName()` function generates var names with [a-z0-9] and _,
// but for backwards compatibility we have to support more characters when recognizing a variable.
export const VARIABLE_REGEXP = new RegExp(/{([a-z_.0-9-\(\)]*)}/gi)
const tableRegexp = new RegExp(/<\s*table(\s+.*?>|>)(.|\n)*?<\s*\/\s*table\s*>/gi)
const defaultAllowedTags = ['strong', 'b', 'em', 'i', 'u', 'ol', 'ul', 'li', 'table', 'th', 'tr', 'td', 'img', 'mark']
const defaultAllowedAttrs: Record<string, AllowedAttribute[]> = {
  img: ['src'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
  mark: ['data-comment-id', 'style'],
}

export const createHTMLTag = ({
  tagName,
  innerText,
  attrs,
}: {
  tagName: string
  innerText: string
  attrs: Record<string, string | number | boolean>
}): string => {
  const attributesString = Object.keys(attrs)
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ')

  return `<${tagName} ${attributesString}>${innerText}</${tagName}>`
}

export const getVariableValue = (variable: VariableRegistryEntry, projectData: ProjectData): string => {
  return String(variable.value || projectData[variable.name] || variable.initialValue)
}

/**
 * Formats statement text and replaces variables with it's values, or with appropriate HTML tags for TipTap editor.
 */
export const formatStatementText = ({
  statement,
  sectionId,
  variableRegistry,
  projectData,
  variableOutput = 'editable',
}: {
  statement: TemplateStatement
  projectData: ProjectData
  variableRegistry: VariableRegistry
  variableOutput?: VariableMode
  sectionId: TemplateSection['id']
}) => {
  return statement.text
    .replaceAll(VARIABLE_REGEXP, (match, variableName) => {
      const variable = variableRegistry[variableName]

      if (!variable) {
        return match.replace('{', '').replace('}', '')
      }

      const variableValue = getVariableValue(variable, projectData)

      switch (variableOutput) {
        case 'editable':
          return createHTMLTag({
            tagName: VAR_INPUT_TAG_NAME,
            innerText: variableValue,
            attrs: {
              name: variable.name,
              value: variableValue,
              statementId: statement.id,
              sectionId,
              displayId: uuid(),
            },
          })

        case 'decorated':
          return createHTMLTag({
            tagName: 'span',
            innerText: variableValue,
            attrs: { class: 'variable-preview', name: variable.name },
          })

        default:
          return variableValue
      }
    })
    .replaceAll(tableRegexp, (match) => `<table-wrapper>${match}</table-wrapper>`)
}

/**
 * Formats section name and replaces variables with it's values, or with appropriate HTML tags for TipTap editor.
 */
export const formatSectionName = ({
  section,
  variableRegistry,
  projectData,
  variableOutput = 'editable',
}: {
  section: TemplateSection
  variableRegistry: VariableRegistry
  projectData: ProjectData
  variableOutput?: VariableMode
}) => {
  return section.name.replaceAll(VARIABLE_REGEXP, (match, variableName) => {
    const variable = variableRegistry[variableName]

    if (!variable) {
      return match.replace('{', '').replace('}', '')
    }

    const variableValue = getVariableValue(variable, projectData)

    switch (variableOutput) {
      case 'editable':
        return createHTMLTag({
          tagName: VAR_INPUT_TAG_NAME,
          innerText: variableValue,
          attrs: {
            name: variable.name,
            value: variableValue,
            sectionId: section.id,
            displayId: uuid(),
          },
        })

      case 'decorated':
        return createHTMLTag({
          tagName: 'mark',
          innerText: variableValue,
          attrs: { name: variable.name },
        })

      default:
        return variableValue
    }
  })
}

/**
 * This function transforms variables notation:
 * from: <var-input ... name="variable_name" ...></var-input>
 * to:   <var-input ... name="variable_name" ...>{variable_name}</var-input>
 * The purpose of this, is to prepare a variable replacement, from HTML tag notation to curly bracket notation.
 */
const transformVariables = (text: string) => {
  return sanitizeHtml(text, {
    allowedTags: [...defaultAllowedTags, VAR_INPUT_TAG_NAME, 'span'],
    allowedAttributes: {
      [VAR_INPUT_TAG_NAME]: ['name'],
      span: ['className, name'],
      ...defaultAllowedAttrs,
    },
    transformTags: {
      [VAR_INPUT_TAG_NAME]: function (tagName: string, attribs: sanitizeHtml.Attributes) {
        return {
          tagName: tagName,
          text: `{${attribs['name']}}`,
          attribs,
        }
      },
      span: function (tagName: string, attribs: sanitizeHtml.Attributes) {
        return {
          tagName: tagName,
          text: `{${attribs['name']}}`,
          attribs,
        }
      },
    },
  })
}

/**
 * Transforms section name to have variables in curly bracket notation, and with all HTML tags stripped.
 * @param {string} sectionName The input string
 * @returns {string} The section name without HTML tags
 */
export const editorHtmlToSectionName = (sectionName: string): string => {
  const sectionNameWithParsedVariables = transformVariables(sectionName)
  const sanitizedSectionName = sanitizeHtml(sectionNameWithParsedVariables, {
    allowedTags: ['mark'],
    allowedAttributes: { mark: defaultAllowedAttrs['mark'] },
  })
  return sanitizedSectionName
}

/**
 * Transforms statement text to have variables in curly bracket notation, and strips all unnecessary HTML tags.
 * @param {string} statementText The input string
 * @returns
 */
export const editorHtmlToStatementText = (statementText: string) => {
  const statementTextWithParsedVariables = transformVariables(statementText)
  return sanitizeHtml(statementTextWithParsedVariables, {
    allowedTags: defaultAllowedTags,
    allowedAttributes: defaultAllowedAttrs,
  })
}
