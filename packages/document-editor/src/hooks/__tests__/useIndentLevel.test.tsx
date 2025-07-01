// /**
//  * @jest-environment jsdom
//  */
// import { renderHook } from '@testing-library/react-hooks'
// import * as reactRedux from 'react-redux'
// import {
//   StatementTypes,
//   TemplateData,
//   TemplateDataTypes,
//   TemplateSection,
//   TemplateStatement,
// } from '../../../document-editor/TemplateAI'
// import { setIndentLevel } from '../../redux'
// import { INDENT_LEVEL_PX, IndentLevelFeature, MAX_INDENT_LEVEL, useIndentLevel } from '../useIndentLevel'
//
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }))
//
// const createStatement = (
//   id: string,
//   indent_level: number,
//   type: StatementTypes = StatementTypes.TEXT
// ): TemplateStatement => ({
//   id,
//   name: '',
//   description: '',
//   text: '',
//   variables: [],
//   type,
//   indent_level,
// })
//
// const createSection = (id: string, statements: TemplateStatement[]): TemplateSection => ({
//   id,
//   name: '',
//   state: 'success',
//   statements,
//   path_variable_mapping: {},
//   header_size: '',
//   variables: [],
// })
//
// const createTemplateData = (sections: TemplateSection[]): TemplateData => ({
//   id: '',
//   type: TemplateDataTypes.TEMPLATE_DOCUMENT,
//   sections,
//   state: 'success',
//   promptIds: {},
//   documentHeading: '',
// })
//
// describe('useIndentLevel', () => {
//   const mockSelector = jest.spyOn(reactRedux, 'useSelector')
//
//   beforeEach(() => {
//     mockSelector.mockReturnValue(createTemplateData([createSection('section-1', [createStatement('statement-1', 2)])]))
//   })
//
//   it('should handle null/undefined statement', () => {
//     const expectedSafeNilResult: IndentLevelFeature = {
//       isIndentable: false,
//       canIncreaseIndent: false,
//       canDecreaseIndent: false,
//       indentLevelInPx: 0,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//
//     const nullHookResult = renderHook(() => useIndentLevel(null as any))
//     expect(nullHookResult.result.current).toEqual(expectedSafeNilResult)
//
//     const undefinedHookResult = renderHook(() => useIndentLevel(undefined as any))
//     expect(undefinedHookResult.result.current).toEqual(expectedSafeNilResult)
//   })
//
//   it('should handle non-indentable statements', () => {
//     const expectedNonIndentableResult: IndentLevelFeature = {
//       isIndentable: false,
//       canIncreaseIndent: false,
//       canDecreaseIndent: false,
//       indentLevelInPx: 0,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.TABLE,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNonIndentableResult)
//   })
//
//   it('should handle TEXT statement without indent_level property (taking into account minimum indent level)', () => {
//     const expectedNoIndentLevelResult: IndentLevelFeature = {
//       isIndentable: true,
//       canIncreaseIndent: true,
//       canDecreaseIndent: false,
//       indentLevelInPx: 0,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.TEXT,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNoIndentLevelResult)
//   })
//
//   it('should handle LIST statement without indent_level property (taking into account minimum indent level)', () => {
//     const expectedNoIndentLevelResult: IndentLevelFeature = {
//       isIndentable: true,
//       canIncreaseIndent: true,
//       canDecreaseIndent: false,
//       indentLevelInPx: 1 * INDENT_LEVEL_PX,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.UNORDERED_LIST,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNoIndentLevelResult)
//   })
//
//   it('should correctly prohibit increasing indent level', () => {
//     const expectedNoIncreaseIndentResult: IndentLevelFeature = {
//       isIndentable: true,
//       canIncreaseIndent: false,
//       canDecreaseIndent: true,
//       indentLevelInPx: MAX_INDENT_LEVEL * INDENT_LEVEL_PX,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.TEXT,
//       indent_level: MAX_INDENT_LEVEL,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNoIncreaseIndentResult)
//   })
//
//   it('should correctly prohibit decreasing indent level for TEXT statement (taking into account minimum indent level)', () => {
//     const expectedNoDecreaseIndentResult: IndentLevelFeature = {
//       isIndentable: true,
//       canIncreaseIndent: true,
//       canDecreaseIndent: false,
//       indentLevelInPx: 0,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.TEXT,
//       indent_level: 0,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNoDecreaseIndentResult)
//   })
//
//   it('should correctly prohibit decreasing indent level for LIST statement (taking into account minimum indent level)', () => {
//     const expectedNoDecreaseIndentResult: IndentLevelFeature = {
//       isIndentable: true,
//       canIncreaseIndent: true,
//       canDecreaseIndent: false,
//       indentLevelInPx: 1 * INDENT_LEVEL_PX,
//       increaseIndent: expect.any(Function),
//       decreaseIndent: expect.any(Function),
//       setIndentLevel: expect.any(Function),
//     }
//     const testStatement = {
//       type: StatementTypes.ORDERED_LIST,
//       indent_level: 1,
//     } as TemplateStatement
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current).toEqual(expectedNoDecreaseIndentResult)
//   })
//
//   it('should dispatch correct action when increaseIndent is called', () => {
//     const mockDispatch = jest.fn()
//     jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch)
//
//     const testStatement = createStatement('statement-1', 2)
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     result.current.increaseIndent()
//
//     expect(mockDispatch).toHaveBeenCalledWith(
//       setIndentLevel({
//         statementId: 'statement-1',
//         indentLevel: 3,
//       } as any)
//     )
//   })
//
//   it('should dispatch correct action when decreaseIndent is called', () => {
//     const mockDispatch = jest.fn()
//     jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch)
//
//     const testStatement = createStatement('statement-1', 2)
//
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     result.current.decreaseIndent()
//
//     expect(mockDispatch).toHaveBeenCalledWith(
//       setIndentLevel({
//         statementId: 'statement-1',
//         indentLevel: 1,
//       } as any)
//     )
//   })
//
//   it('should correctly calculate indent level in px', () => {
//     const testStatement = createStatement('statement-1', 2)
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current.indentLevelInPx).toBe(INDENT_LEVEL_PX * 2)
//   })
//
//   it('should return correct indent level in px for non-indentable statements', () => {
//     const testStatement = createStatement('statement-1', 2, StatementTypes.TABLE)
//     const { result } = renderHook(() => useIndentLevel(testStatement))
//
//     expect(result.current.indentLevelInPx).toBe(0)
//   })
// })
