import { Extension } from '@tiptap/core';
import { editorHtmlToStatementText, formatStatementText } from '../../helpers/parseTemplateStatements';
import { deleteStatement, setActiveStatement, updateAndSaveSection, updateStatement } from '../../redux';
import { selectActiveSectionId, selectActiveStatement, selectPreviousStatement, selectProjectData, selectSectionById, selectStatementById, selectVariableRegistry, } from '../../redux/selectors';
import reduxStore from '../../redux/store';
import { StatementTypes, isListStatement } from '../../types/editor';
export const getEditorsCurrentNodeLength = (editor) => {
    const { state } = editor;
    const { selection } = state;
    const { from } = selection;
    // Find the current node
    const resolvedPos = state.doc.resolve(from);
    const currentNode = resolvedPos.parent;
    return currentNode.content.size;
};
const changeStatementTypeToText = (activeStatementId) => {
    reduxStore.dispatch(updateStatement({
        id: activeStatementId,
        updatePayload: {
            type: StatementTypes.TEXT,
            _triggerUpdate: true,
            _focusPositionFromContentEnd: -1,
        },
    }));
};
const concatWithPreviousAndDeleteCurrentStatement = (activeStatementId, previousStatement, focusPositionFromContentEnd) => {
    const currentStatement = selectStatementById(reduxStore.getState(), activeStatementId);
    reduxStore.dispatch(updateStatement({
        id: previousStatement.id,
        updatePayload: {
            text: editorHtmlToStatementText(`${previousStatement.text} ${currentStatement?.text}`),
            _triggerUpdate: true,
            _focusPositionFromContentEnd: focusPositionFromContentEnd,
        },
    }));
    reduxStore.dispatch(setActiveStatement({ id: previousStatement.id }));
    reduxStore.dispatch(deleteStatement({ id: activeStatementId }));
};
const concatStatementWithSection = (activeStatementId, activeStatementText, activeSection, focusPositionFromContentEnd) => {
    reduxStore.dispatch(setActiveStatement(null));
    reduxStore.dispatch(updateAndSaveSection({
        id: activeSection.id,
        newValues: {
            name: editorHtmlToStatementText(`${activeSection.name} ${activeStatementText}`),
            _triggerUpdate: true,
            _focusPositionFromContentEnd: focusPositionFromContentEnd,
        },
    }));
    reduxStore.dispatch(deleteStatement({ id: activeStatementId }));
};
const BackspaceExtension = Extension.create({
    name: 'backspace',
    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                if (!editor.state.selection.empty) {
                    return false;
                }
                const activeStatement = selectActiveStatement(reduxStore.getState());
                const activeSectionId = selectActiveSectionId(reduxStore.getState());
                if (!activeStatement || !activeSectionId) {
                    return false;
                }
                const { id: activeStatementId } = activeStatement;
                const currentStatement = selectStatementById(reduxStore.getState(), activeStatementId);
                const activeSection = selectSectionById(reduxStore.getState(), activeSectionId);
                if (!currentStatement || !activeSection) {
                    return false;
                }
                if (editor.state.selection.from === 1) {
                    if (isListStatement(currentStatement)) {
                        changeStatementTypeToText(currentStatement.id);
                        return true;
                    }
                    let currentNodeLength = getEditorsCurrentNodeLength(editor);
                    const activeStatementText = editor.getHTML();
                    const previousStatement = selectPreviousStatement(reduxStore.getState(), activeStatementId);
                    if (!previousStatement) {
                        concatStatementWithSection(currentStatement.id, activeStatementText, activeSection, currentNodeLength);
                        return true;
                    }
                    else if (currentStatement.type === StatementTypes.TEXT) {
                        if (![StatementTypes.LIST, StatementTypes.IMAGE, StatementTypes.TABLE].includes(previousStatement.type)) {
                            if (currentStatement.turnOffVariables && !previousStatement?.turnOffVariables) {
                                const variableRegistry = selectVariableRegistry(reduxStore.getState());
                                const projectData = selectProjectData(reduxStore.getState());
                                editor?.commands.setContent(formatStatementText({
                                    statement: currentStatement,
                                    sectionId: activeSection.id,
                                    variableRegistry,
                                    projectData,
                                    variableOutput: 'editable',
                                }));
                                currentNodeLength = getEditorsCurrentNodeLength(editor);
                            }
                            concatWithPreviousAndDeleteCurrentStatement(currentStatement.id, previousStatement, currentNodeLength);
                        }
                        return true;
                    }
                }
                if (editor.isEmpty && editor.isFocused) {
                    reduxStore.dispatch(deleteStatement({ id: currentStatement.id }));
                    return true;
                }
                return false;
            },
        };
    },
});
export default BackspaceExtension;
//# sourceMappingURL=BackspaceExtension.js.map