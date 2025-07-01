// import {
//   TemplateData,
//   TemplateSection,
//   TemplateStatement,
//   TemplateVariable,
//   VariableRegistry,
//   VariableRegistryEntry,
// } from '../../types/editor'
// import variableRegistryFunctions from '../variableRegistry'
//
// const {
//   createVariableRegistryEntry,
//   suffixVariableName,
//   uploadIntoRegistry,
//   createOrUpdateVariableRegistry,
//   updateVariableNameWithinSection,
//   createVariableRegistryEntryFromLegacyVariable,
//   addLegacyVariablesIntoRegistry,
//   removeUnusedVariablesFromRegistry,
//   countVariablesInText,
//   createVariableName,
// } = variableRegistryFunctions
//
// describe('createVariableRegistryEntry', () => {
//   it('should create a new variable registry entry', () => {
//     const variableName = 'variable'
//     const initialValue = 'initialValue'
//     const variableRegistryEntry = createVariableRegistryEntry({
//       name: variableName,
//       initialValue,
//     })
//
//     expect(variableRegistryEntry.name).toBe(variableName)
//     expect(variableRegistryEntry.initialValue).toBe(initialValue)
//     expect(variableRegistryEntry.value).toBe('')
//     expect(variableRegistryEntry.variableHistory).toEqual([])
//   })
// })
//
// describe('suffixVariableName', () => {
//   it('should return the same variable name if the variable name already exists and have the same initial value', () => {
//     const variableRegistry: Record<string, Partial<VariableRegistryEntry>> = {
//       variable: { name: 'variable', initialValue: 'variable initialValue' },
//       'variable-2': {
//         name: 'variable-2',
//         initialValue: 'variable-2 initialValue',
//       },
//       'variable-3': {
//         name: 'variable-3',
//         initialValue: 'variable-3 initialValue',
//       },
//     }
//
//     const suffixedVariableName = suffixVariableName(
//       variableRegistry as VariableRegistry,
//       'variable',
//       'variable initialValue'
//     )
//
//     expect(suffixedVariableName).toBe('variable')
//   })
//
//   it('should return a new variable name with a suffix if the variable name already exists and have different value', () => {
//     const variableRegistry: Record<string, Partial<VariableRegistryEntry>> = {
//       variable: { name: 'variable', initialValue: 'variable initialValue' },
//       'variable-2': {
//         name: 'variable-2',
//         initialValue: 'variable-2 initialValue',
//       },
//       'variable-3': {
//         name: 'variable-3',
//         initialValue: 'variable-3 initialValue',
//       },
//     }
//
//     const suffixedVariableName = suffixVariableName(
//       variableRegistry as VariableRegistry,
//       'variable',
//       'different initialValue'
//     )
//
//     expect(suffixedVariableName).toBe('variable-4')
//   })
//
//   it('should return the original variable name if the variable name does not exist', () => {
//     const variableRegistry: Record<string, Partial<VariableRegistryEntry>> = {
//       variable: { name: 'variable' },
//       'variable-2': { name: 'variable-2' },
//       'variable-3': { name: 'variable-3' },
//     }
//
//     const variableName = 'new-variable'
//     const suffixedVariableName = suffixVariableName(variableRegistry as VariableRegistry, variableName, 'initialValue')
//
//     expect(suffixedVariableName).toBe('new-variable')
//   })
//
//   it('should return the original variable name if the variable is included in AUTOFILLED_VARIABLES array', () => {
//     const variableRegistry: Record<string, Partial<VariableRegistryEntry>> = {
//       forest_name: { name: 'forest_name' },
//       project_name: { name: 'project_name' },
//       other_variable: { name: 'other_variable' },
//     }
//
//     const suffixedVariableName = suffixVariableName(variableRegistry as VariableRegistry, 'forest_name', 'initialValue')
//     expect(suffixedVariableName).toBe('forest_name')
//   })
// })
//
// describe('updateVariableNameWithinSection', () => {
//   it('should return the original section if no section is provided', () => {
//     const section = null
//
//     // @ts-ignore - section is not provided
//     const updatedSection = updateVariableNameWithinSection(section, 'variable', 'new-variable')
//
//     expect(updatedSection).toEqual(section)
//   })
//   it('should return the original section if originalName is not found in section name', () => {
//     const section = {
//       name: 'Section name with {variable_1} within',
//       statements: [],
//     } as Partial<TemplateSection>
//
//     const updatedSection = updateVariableNameWithinSection(section as TemplateSection, 'variable', 'new-variable')
//
//     expect(updatedSection).toEqual(section)
//   })
//   it('should return the original section if newName is the same as originalName', () => {
//     const section = {
//       name: 'Section name with {other_variable} within',
//       statements: [],
//     } as Partial<TemplateSection>
//
//     const updatedSection = updateVariableNameWithinSection(section as TemplateSection, 'variable', 'variable')
//
//     expect(updatedSection).toEqual(section)
//   })
//   it('should update variable name used in section name', () => {
//     const section = {
//       name: 'Section name with {variable} within',
//       statements: [],
//     } as Partial<TemplateSection>
//
//     const updatedSection = updateVariableNameWithinSection(section as TemplateSection, 'variable', 'new-variable')
//
//     expect(updatedSection.name).toEqual('Section name with {new-variable} within')
//   })
//   it('should update variable name used in statement text', () => {
//     const section = {
//       name: 'Section name',
//       statements: [{ text: 'Some text with {variable} within' }, { text: 'Some text with {other_variable} within' }],
//     } as Partial<TemplateSection>
//
//     const updatedSection = updateVariableNameWithinSection(section as TemplateSection, 'variable', 'new-variable')
//
//     expect(updatedSection.statements[0].text).toEqual('Some text with {new-variable} within')
//     expect(updatedSection.statements[1].text).toEqual('Some text with {other_variable} within')
//   })
// })
//
// describe('uploadIntoRegistry', () => {
//   it('should return the original section if no section is provided', () => {
//     const variableRegistry: VariableRegistry = {}
//     const section = null
//
//     // @ts-ignore - section is not provided
//     const [_, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section)
//
//     expect(sectionAfterUpload).toBe(section)
//   })
//
//   it('should return the original section if the section does not have section_variables', () => {
//     const variableRegistry: VariableRegistry = {}
//     const section = {
//       state: 'success',
//     } as Partial<TemplateSection>
//
//     const [_, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(sectionAfterUpload).toBe(section)
//   })
//
//   it('should return the original section if the section state is not "success"', () => {
//     const variableRegistry: VariableRegistry = {}
//     const section = {
//       state: 'failed',
//       section_variables: {
//         variable_1: 'initialValue_1',
//         variable_2: 'initialValue_2',
//       },
//     } as Partial<TemplateSection>
//
//     const [_, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(sectionAfterUpload).toBe(section)
//   })
//
//   it('should return the original section if the variable registry is not provided', () => {
//     const variableRegistry = null
//     const section = {
//       state: 'success',
//       section_variables: {
//         variable_1: 'initialValue_1',
//         variable_2: 'initialValue_2',
//       },
//     } as Partial<TemplateSection>
//
//     // @ts-ignore - variable registry is not provided
//     const [_, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(sectionAfterUpload).toBe(section)
//   })
//
//   it('should update the variable registry with the section_variables', () => {
//     const variableRegistry = {
//       variable_1: {
//         initialValue: 'initialValue_1',
//         name: 'variable_1',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//     }
//     const section = {
//       state: 'success',
//       section_variables: {
//         variable_2: 'initialValue_2',
//         variable_3: 'initialValue_3',
//       },
//     } as Partial<TemplateSection>
//
//     const [registryAfterUpload, _] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(Object.entries(registryAfterUpload).length).toBe(3)
//     expect(registryAfterUpload['variable_2']).toEqual({
//       initialValue: 'initialValue_2',
//       name: 'variable_2',
//       value: '',
//       variableHistory: [],
//     })
//   })
//
//   it('should remove section_variables from section after uploading', () => {
//     const variableRegistry: VariableRegistry = {}
//     const section = {
//       state: 'success',
//       section_variables: {
//         variable_1: 'initialValue_1',
//       },
//     } as Partial<TemplateSection>
//
//     const [updatedRegistry, updatedSection] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(Object.entries(updatedRegistry).length).toBe(1)
//     expect(updatedSection.section_variables).toBeUndefined()
//   })
//
//   it('should properly suffix the variable names if they already exist in the variable registry', () => {
//     const variableRegistry: VariableRegistry = {
//       variable_1: {
//         initialValue: 'initialValue_1',
//         name: 'variable_1',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//     }
//     const section = {
//       state: 'success',
//       section_variables: {
//         variable_1: 'different initialValue',
//         variable_2: 'initialValue_2',
//       },
//     } as Partial<TemplateSection>
//
//     const [registryAfterUpload, _] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(Object.entries(registryAfterUpload).length).toBe(3)
//     expect(registryAfterUpload['variable_1']).toEqual({
//       initialValue: 'initialValue_1',
//       name: 'variable_1',
//       value: 'user edited value',
//       variableHistory: [],
//     })
//     expect(registryAfterUpload['variable_1-2']).toEqual({
//       initialValue: 'different initialValue',
//       name: 'variable_1-2',
//       value: '',
//       variableHistory: [],
//     })
//   })
//
//   it('should update variable name used in section name if variable name was suffixed', () => {
//     const variableRegistry: VariableRegistry = {
//       variable_1: {
//         initialValue: 'initialValue_1',
//         name: 'variable_1',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//     }
//     const section = {
//       state: 'success',
//       name: 'Section name with {variable_1} within',
//       section_variables: {
//         variable_1: 'some variable value',
//         variable_2: 'initialValue_2',
//       },
//       statements: [],
//     } as Partial<TemplateSection>
//
//     const [registryAfterUpload, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(Object.entries(registryAfterUpload).length).toBe(3)
//     expect(registryAfterUpload['variable_1'].initialValue).toEqual(variableRegistry.variable_1.initialValue)
//     expect(registryAfterUpload['variable_1-2'].initialValue).toEqual(section.section_variables!.variable_1)
//     expect(sectionAfterUpload.name).toEqual('Section name with {variable_1-2} within')
//   })
//
//   it('should update variable name used in statement text if variable name was suffixed', () => {
//     const variableRegistry: VariableRegistry = {
//       variable_1: {
//         initialValue: 'initialValue_1',
//         name: 'variable_1',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//     }
//     const section = {
//       state: 'success',
//       name: 'section name',
//       section_variables: {
//         variable_1: 'some variable value',
//         variable_2: 'initialValue_2',
//       },
//       statements: [
//         {
//           text: 'Some text with {variable_1} within',
//         } as Partial<TemplateStatement>,
//       ],
//     } as Partial<TemplateSection>
//
//     const [registryAfterUpload, sectionAfterUpload] = uploadIntoRegistry(variableRegistry, section as TemplateSection)
//
//     expect(Object.entries(registryAfterUpload).length).toBe(3)
//     expect(registryAfterUpload['variable_1'].initialValue).toEqual(variableRegistry.variable_1.initialValue)
//     expect(registryAfterUpload['variable_1-2'].initialValue).toEqual(section.section_variables!.variable_1)
//     expect(sectionAfterUpload.statements[0].text).toEqual('Some text with {variable_1-2} within')
//   })
// })
//
// describe('createOrUpdateVariableRegistry', () => {
//   it('should return the original template if no template is provided', () => {
//     const template = null
//
//     // @ts-ignore - template is not provided
//     const updatedTemplate = createOrUpdateVariableRegistry(template)
//
//     expect(updatedTemplate).toBe(template)
//   })
//
//   it('should return the original template if the template does not have sections', () => {
//     const template = {}
//
//     const updatedTemplate = createOrUpdateVariableRegistry(template as TemplateData)
//
//     expect(updatedTemplate).toBe(template)
//   })
//
//   it('should create a new variable registry if the template does not have one', () => {
//     const template: Partial<TemplateData> = {
//       sections: [
//         {
//           state: 'success',
//           section_variables: {
//             variable_1: 'initialValue_1',
//             variable_2: 'initialValue_2',
//           },
//         } as Partial<TemplateSection>,
//         {
//           state: 'success',
//           section_variables: {
//             variable_3: 'initialValue_3',
//           },
//         } as Partial<TemplateSection>,
//       ] as TemplateSection[],
//     }
//
//     const updatedTemplate = createOrUpdateVariableRegistry(template as TemplateData)
//
//     expect(updatedTemplate.variableRegistry).toBeDefined()
//     expect(Object.entries(updatedTemplate.variableRegistry!).length).toBe(3)
//   })
//
//   it('should update the variable registry with the section variables for each section', () => {
//     const variableRegistry: VariableRegistry = {
//       variable_1: {
//         initialValue: 'initialValue_1',
//         name: 'variable_1',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//       variable_2: {
//         initialValue: 'initialValue_2',
//         name: 'variable_2',
//         value: 'user edited value',
//         variableHistory: [],
//       },
//     }
//     const template: Partial<TemplateData> = {
//       variableRegistry,
//       sections: [
//         {
//           state: 'success',
//           section_variables: {
//             variable_2: 'different initialValue_2',
//           },
//         } as Partial<TemplateSection>,
//       ] as TemplateSection[],
//     }
//
//     const updatedTemplate = createOrUpdateVariableRegistry(template as TemplateData)
//
//     expect(updatedTemplate.variableRegistry).toBeDefined()
//     expect(Object.entries(updatedTemplate.variableRegistry!).length).toBe(3)
//     expect(updatedTemplate.variableRegistry!['variable_2']).toEqual({
//       initialValue: 'initialValue_2',
//       name: 'variable_2',
//       value: 'user edited value',
//       variableHistory: [],
//     })
//     expect(updatedTemplate.variableRegistry!['variable_2-2']).toEqual({
//       initialValue: 'different initialValue_2',
//       name: 'variable_2-2',
//       value: '',
//       variableHistory: [],
//     })
//   })
//   it('should not duplicate sections', () => {
//     const template: Partial<TemplateData> = {
//       sections: [
//         {
//           state: 'success',
//           section_variables: {
//             variable_1: 'initialValue_1',
//             variable_2: 'initialValue_2',
//           },
//         } as Partial<TemplateSection>,
//         {
//           state: 'success',
//           section_variables: {
//             variable_3: 'initialValue_3',
//           },
//         } as Partial<TemplateSection>,
//       ] as TemplateSection[],
//     }
//
//     const updatedTemplate = createOrUpdateVariableRegistry(template as TemplateData)
//
//     expect(updatedTemplate.sections.length).toBe(template.sections!.length)
//   })
// })
//
// describe('createVariableRegistryEntryFromLegacyVariable', () => {
//   it('should create a variable registry entry from a legacy variable with a single value', () => {
//     const legacyVariable = {
//       name: 'legacy_variable',
//       example: ['example_value'],
//       value: 'value',
//       variableHistory: [],
//     } as unknown as TemplateVariable
//
//     const variableRegistryEntry = createVariableRegistryEntryFromLegacyVariable(legacyVariable)
//
//     expect(variableRegistryEntry.name).toBe(legacyVariable.name)
//     expect(variableRegistryEntry.initialValue).toBe('example_value')
//     expect(variableRegistryEntry.value).toBe(legacyVariable.value)
//     expect(variableRegistryEntry.variableHistory).toEqual(legacyVariable.variableHistory)
//   })
//
//   it('should handle an empty example array', () => {
//     const legacyVariable = {
//       name: 'legacy_variable',
//       example: [],
//       value: 'value',
//       variableHistory: [],
//     } as unknown as TemplateVariable
//
//     const variableRegistryEntry = createVariableRegistryEntryFromLegacyVariable(legacyVariable)
//
//     expect(variableRegistryEntry.initialValue).toBe('')
//   })
//
//   it('should join multiple examples with a comma', () => {
//     const legacyVariable = {
//       name: 'legacy_variable',
//       example: ['value1', 'value2'],
//       value: 'value',
//       variableHistory: [],
//     } as unknown as TemplateVariable
//
//     const variableRegistryEntry = createVariableRegistryEntryFromLegacyVariable(legacyVariable)
//
//     expect(variableRegistryEntry.initialValue).toBe('value1, value2')
//   })
//
//   it('should assign an empty string to value if not provided', () => {
//     const legacyVariable = {
//       name: 'legacy_variable',
//       example: ['example_value'],
//       variableHistory: [],
//     } as unknown as TemplateVariable
//
//     const variableRegistryEntry = createVariableRegistryEntryFromLegacyVariable(legacyVariable)
//
//     expect(variableRegistryEntry.value).toBe('')
//   })
//
//   it('should assign an empty array to variableHistory if not provided', () => {
//     const legacyVariable = {
//       name: 'legacy_variable',
//       example: ['example_value'],
//       value: 'value',
//     } as unknown as TemplateVariable
//
//     const variableRegistryEntry = createVariableRegistryEntryFromLegacyVariable(legacyVariable)
//
//     expect(variableRegistryEntry.variableHistory).toEqual([])
//   })
// })
//
// describe('addLegacyVariablesIntoRegistry', () => {
//   it('should add legacy variables from section to an empty registry', () => {
//     const initialRegistry: VariableRegistry = {}
//     const section: Partial<TemplateSection> = {
//       variables: [
//         {
//           name: 'legacy_variable_1',
//           example: ['example_value_1'],
//           value: 'value1',
//           variableHistory: [],
//         },
//         {
//           name: 'legacy_variable_2',
//           example: ['value2'],
//           variableHistory: [],
//         },
//       ] as unknown as TemplateVariable[],
//     }
//
//     const updatedRegistry = addLegacyVariablesIntoRegistry(initialRegistry, section as TemplateSection)
//     expect(Object.entries(updatedRegistry).length).toBe(2)
//     expect(updatedRegistry['legacy_variable_1']).toEqual({
//       name: 'legacy_variable_1',
//       initialValue: 'example_value_1',
//       value: 'value1',
//       variableHistory: [],
//     })
//     expect(updatedRegistry['legacy_variable_2']).toEqual({
//       name: 'legacy_variable_2',
//       initialValue: 'value2',
//       value: '',
//       variableHistory: [],
//     })
//   })
//
//   it('should retain existing registry variables not in legacy section', () => {
//     const initialRegistry: VariableRegistry = {
//       existing_variable: {
//         name: 'existing_variable',
//         initialValue: 'initial_value',
//         value: 'value',
//         variableHistory: [],
//       },
//     }
//     const section: Partial<TemplateSection> = {
//       variables: [
//         {
//           name: 'legacy_variable',
//           example: ['example_value_1'],
//           variableHistory: [],
//         },
//       ] as unknown as TemplateVariable[],
//     }
//
//     const updatedRegistry = addLegacyVariablesIntoRegistry(initialRegistry, section as TemplateSection)
//     expect(Object.entries(updatedRegistry).length).toBe(2)
//     expect(updatedRegistry['existing_variable']).toEqual(initialRegistry['existing_variable'])
//   })
//
//   it('should not overwrite existing variables in the registry', () => {
//     const initialRegistry: VariableRegistry = {
//       some_variable: {
//         name: 'some_variable',
//         initialValue: 'existing_initial_value',
//         value: 'existing_value',
//         variableHistory: [],
//       },
//     }
//     const section: Partial<TemplateSection> = {
//       variables: [
//         {
//           name: 'some_variable',
//           example: ['new_example'],
//           variableHistory: [],
//         },
//       ] as unknown as TemplateVariable[],
//     }
//
//     const updatedRegistry = addLegacyVariablesIntoRegistry(initialRegistry, section as TemplateSection)
//     expect(Object.entries(updatedRegistry).length).toBe(1)
//     expect(updatedRegistry['legacy_variable']).toEqual(initialRegistry['legacy_variable'])
//   })
//
//   it('should add legacy variables from both section and statements', () => {
//     const initialRegistry: VariableRegistry = {}
//     const section: Partial<TemplateSection> = {
//       variables: [
//         {
//           name: 'legacy_variable_section',
//           example: ['section_example'],
//           variableHistory: [],
//         },
//       ] as unknown as TemplateVariable[],
//       statements: [
//         {
//           variables: [
//             {
//               name: 'legacy_variable_statement',
//               example: ['statement_example'],
//               variableHistory: [],
//             },
//           ] as unknown as TemplateVariable[],
//         },
//       ] as TemplateStatement[],
//     }
//
//     const updatedRegistry = addLegacyVariablesIntoRegistry(initialRegistry, section as TemplateSection)
//     expect(Object.entries(updatedRegistry).length).toBe(2)
//     expect(updatedRegistry['legacy_variable_section']).toEqual({
//       name: 'legacy_variable_section',
//       initialValue: 'section_example',
//       value: '',
//       variableHistory: [],
//     })
//     expect(updatedRegistry['legacy_variable_statement']).toEqual({
//       name: 'legacy_variable_statement',
//       initialValue: 'statement_example',
//       value: '',
//       variableHistory: [],
//     })
//   })
//
//   it('should handle sections with empty data gracefully', () => {
//     const initialRegistry: VariableRegistry = {}
//     const section: Partial<TemplateSection> = {}
//
//     const updatedRegistry = addLegacyVariablesIntoRegistry(initialRegistry, section as TemplateSection)
//     expect(Object.entries(updatedRegistry).length).toBe(0)
//   })
// })
//
// describe('removeUnusedVariablesFromRegistry', () => {
//   it('should do nothing if there is no template passed', () => {
//     const template = null as unknown as TemplateData
//
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template)
//
//     expect(updatedTemplate).toBe(template)
//   })
//
//   it('should do nothing if no registry is present', () => {
//     const template = {
//       sections: [
//         {
//           name: 'This is a section',
//           statements: [
//             {
//               text: 'This is a statement',
//             },
//           ],
//         },
//       ],
//     }
//
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template as TemplateData)
//
//     expect(updatedTemplate).toBe(template)
//   })
//
//   it('should do nothing if the registry is empty', () => {
//     const template = {
//       sections: [
//         {
//           name: 'This is a section',
//           statements: [
//             {
//               text: 'This is a statement',
//             },
//           ],
//         },
//       ],
//       variableRegistry: {},
//     }
//
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template as TemplateData)
//
//     expect(updatedTemplate).toBe(template)
//   })
//   it('should remove unused variables from the registry', () => {
//     const template = {
//       sections: [
//         {
//           name: 'This is a section',
//           statements: [
//             {
//               text: 'This is a statement',
//             },
//           ],
//         },
//       ],
//       variableRegistry: {
//         unusedVariable: {},
//       },
//     }
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template as unknown as TemplateData)
//
//     expect(updatedTemplate.variableRegistry).toEqual({})
//   })
//
//   it('should not remove variables used in section name from the registry', () => {
//     const template = {
//       sections: [
//         {
//           name: 'This is a {sectionName} section',
//           statements: [
//             {
//               text: 'This is a statement',
//             },
//           ],
//         },
//       ],
//       variableRegistry: {
//         sectionName: {},
//         unusedVariable: {},
//       },
//     }
//
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template as unknown as TemplateData)
//
//     expect(updatedTemplate.variableRegistry).toEqual({
//       sectionName: {},
//     })
//   })
//
//   it('should not remove variables used in statement text from the registry', () => {
//     const template = {
//       sections: [
//         {
//           name: 'This is a section',
//           statements: [
//             {
//               text: 'This is a {statementText} statement',
//             },
//           ],
//         },
//       ],
//       variableRegistry: {
//         statementText: {},
//         unusedVariable: {},
//       },
//     }
//
//     const updatedTemplate = removeUnusedVariablesFromRegistry(template as unknown as TemplateData)
//
//     expect(updatedTemplate.variableRegistry).toEqual({
//       statementText: {},
//     })
//   })
// })
//
// describe('countVariablesInText', () => {
//   it('should return 0 when there are no variables in the text', () => {
//     const text = 'This is a plain text with no variables.'
//     expect(countVariablesInText(text)).toBe(0)
//   })
//
//   it('should return 1 for a single variable in the text', () => {
//     const text = 'This is a text with one {variable}.'
//     expect(countVariablesInText(text)).toBe(1)
//   })
//
//   it('should return 1 for duplicate variables in the text', () => {
//     const text = 'This is a text with duplicate {variable} and another {variable}.'
//     expect(countVariablesInText(text)).toBe(1)
//   })
//
//   it('should return 2 for two different variables', () => {
//     const text = 'This is a text with two variables: {variable1} and {variable2}.'
//     expect(countVariablesInText(text)).toBe(2)
//   })
//
//   it('should handle text with no curly braces', () => {
//     const text = 'A completely different kind of text with parentheses (variable).'
//     expect(countVariablesInText(text)).toBe(0)
//   })
//
//   it('should correctly count variables in complex strings', () => {
//     const text = '{var1} and text {var2} with {var1} rep {var3}etition'
//     expect(countVariablesInText(text)).toBe(3)
//   })
//
//   it('should return 0 for an empty string', () => {
//     const text = ''
//     expect(countVariablesInText(text)).toBe(0)
//   })
// })
//
// describe('Generating variable names in statement editor', () => {
//   it('should generate appropriate variable name', () => {
//     const input = ' - ## - _ !@#$%^&*() ą ź ą Lorem IPSUM  __ #hashtag (95 dolor) ź !@# -- '
//     const expectedOutput = 'lorem_ipsum_hashtag_95_dolor'
//     expect(createVariableName(input)).toEqual(expectedOutput)
//   })
//
//   it('should not break user defined variable name', () => {
//     const input = 'lorem_ipsum_dolor_sit_amet'
//     const expectedOutput = 'lorem_ipsum_dolor_sit_amet'
//     expect(createVariableName(input)).toEqual(expectedOutput)
//   })
//
//   it('should generate appropriate variable name, limited by amount of words', () => {
//     const input = 'lorem ąę ## ipsum dolor sit amet'
//     const expectedOutput = 'lorem_ipsum_dolor'
//     expect(createVariableName(input, { maxWords: 3 })).toEqual(expectedOutput)
//   })
// })
