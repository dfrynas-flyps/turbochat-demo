// import { TemplateData, TemplateVariable } from '../../types/editor'
// import { fixDuplicatedVariables } from '../templateDataCleanup'
//
// describe('fixDuplicatedVariables', () => {
//   it('should return the same template when input is null or undefined', () => {
//     // @ts-ignore
//     expect(fixDuplicatedVariables(null)).toBeNull()
//     // @ts-ignore
//     expect(fixDuplicatedVariables(undefined)).toBeUndefined()
//   })
//
//   it('should remove duplicated variables from the template', () => {
//     const variables: TemplateVariable[] = [
//       {
//         id: '1',
//         name: 'variable1',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//       {
//         id: '2',
//         name: 'variable2',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//       {
//         id: '3',
//         name: 'variable1',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//     ]
//
//     const template = {
//       id: 'template1',
//       sections: [
//         {
//           id: 'section1',
//           name: 'section1',
//           state: 'success',
//           statements: [
//             {
//               id: 'statement1',
//               text: 'statement1',
//               variables: [...variables],
//             },
//           ],
//           variables: [...variables],
//         },
//       ],
//     } as TemplateData
//
//     const cleanedTemplate = fixDuplicatedVariables(template)
//
//     expect(cleanedTemplate.sections[0].variables).toEqual([
//       {
//         id: '2',
//         name: 'variable2',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//       {
//         id: '3',
//         name: 'variable1',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//     ])
//
//     expect(cleanedTemplate.sections[0].statements[0].variables).toEqual([
//       {
//         id: '2',
//         name: 'variable2',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//       {
//         id: '3',
//         name: 'variable1',
//         type: 'string',
//         description: '',
//         question: '',
//         example: [''],
//       },
//     ])
//   })
//
//   it('should handle template without sections', () => {
//     const template = {
//       id: 'template1',
//       sections: [],
//       state: 'success',
//       promptIds: {},
//       type: 'template',
//     } as unknown as TemplateData
//
//     const cleanedTemplate = fixDuplicatedVariables(template)
//     expect(cleanedTemplate).toEqual(template)
//   })
//
//   it('should handle sections without statements or variables', () => {
//     const template = {
//       id: 'template1',
//       sections: [
//         {
//           id: 'section1',
//           name: 'section1',
//           state: 'success',
//         },
//       ],
//     } as TemplateData
//
//     const cleanedTemplate = fixDuplicatedVariables(template)
//     expect(cleanedTemplate).toEqual(template)
//   })
//
//   it('should handle statements without variables', () => {
//     const template = {
//       id: 'template1',
//       sections: [
//         {
//           id: 'section1',
//           name: 'section1',
//           state: 'success',
//           statements: [
//             {
//               id: 'statement1',
//               text: 'statement1',
//             },
//           ],
//         },
//       ],
//     } as TemplateData
//
//     const cleanedTemplate = fixDuplicatedVariables(template)
//     expect(cleanedTemplate).toEqual(template)
//   })
// })
