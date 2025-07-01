// import { StatementTypes, TemplateData, TemplateDataTypes, TemplateSection, TemplateStatement } from '../../types/editor'
// import { getParagraphStatementIds } from '../getParagraphStatementIds'
//
// describe('getParagraphStatementIds', () => {
//   const createStatement = (id: string, type: StatementTypes, last_statement?: boolean): TemplateStatement => ({
//     id,
//     name: '',
//     description: '',
//     text: '',
//     variables: [],
//     type,
//     last_statement: last_statement ?? false,
//   })
//
//   const createSection = (id: string, statements: TemplateStatement[]): TemplateSection => ({
//     id,
//     name: '',
//     state: 'success',
//     statements,
//     path_variable_mapping: {},
//     header_size: '',
//     variables: [],
//   })
//
//   const createTemplateData = (sections: TemplateSection[]): TemplateData => ({
//     id: '',
//     type: TemplateDataTypes.TEMPLATE_DOCUMENT,
//     sections,
//     state: 'success',
//     promptIds: {},
//     documentHeading: '',
//   })
//
//   it('should return an empty array if data is null', () => {
//     expect(getParagraphStatementIds('some-id', null)).toEqual([])
//   })
//
//   it('should return an empty array if the statementId is not found', () => {
//     const data = createTemplateData([createSection('section-1', [createStatement('id-1', StatementTypes.TEXT)])])
//     expect(getParagraphStatementIds('non-existent-id', data)).toEqual([])
//   })
//
//   it('should return ids of statements in the same paragraph', () => {
//     const data = createTemplateData([
//       createSection('section-1', [
//         createStatement('id-1', StatementTypes.TEXT),
//         createStatement('id-2', StatementTypes.TEXT),
//         createStatement('id-3', StatementTypes.TEXT, true), // end of a paragraph
//       ]),
//     ])
//
//     expect(getParagraphStatementIds('id-2', data)).toEqual(['id-1', 'id-2', 'id-3'])
//   })
//
//   it('should handle paragraphs at the start and end of sections', () => {
//     const data = createTemplateData([
//       createSection('section-1', [
//         createStatement('id-1', StatementTypes.TEXT),
//         createStatement('id-2', StatementTypes.TEXT, true), // end of first paragraph
//         createStatement('id-3', StatementTypes.TEXT),
//         createStatement('id-4', StatementTypes.TEXT),
//       ]),
//     ])
//
//     expect(getParagraphStatementIds('id-3', data)).toEqual(['id-3', 'id-4'])
//   })
//
//   it('should handle different types of statements correctly', () => {
//     const data = createTemplateData([
//       createSection('section-1', [
//         createStatement('id-1', StatementTypes.TEXT),
//         createStatement('id-2', StatementTypes.TEXT),
//         createStatement('id-3', StatementTypes.UNORDERED_LIST), // different type starts a new paragraph
//       ]),
//     ])
//
//     expect(getParagraphStatementIds('id-1', data)).toEqual(['id-1', 'id-2'])
//     expect(getParagraphStatementIds('id-3', data)).toEqual(['id-3'])
//   })
//
//   it('should handle single statement paragraphs', () => {
//     const data = createTemplateData([
//       createSection('section-1', [
//         createStatement('id-1', StatementTypes.TABLE, true), // single statement paragraph
//       ]),
//     ])
//
//     expect(getParagraphStatementIds('id-1', data)).toEqual(['id-1'])
//   })
// })
