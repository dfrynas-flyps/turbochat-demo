import { v4 as uuid } from 'uuid';
import { Extension } from '@tiptap/core';
import { getEditorDetailsBasedOnCursorPosition } from '../../helpers/editor';
import { editorHtmlToStatementText } from '../../helpers/parseTemplateStatements';
import { addNewStatement, renameSection } from '../../redux';
import { selectActiveSectionId, selectData, selectStatementById } from '../../redux/selectors';
import reduxStore from '../../redux/store';
import { StatementTypes } from '../../types/editor';
// I faced once with lack of beforeCursorJSON, it is strange, there should be something, but maybe it was caused by some broken section.
const DEFAULT_HEADING_LEVEL = 2;
const SectionEnterExtension = Extension.create({
    name: 'SectionEnterExtension',
    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const data = selectData(reduxStore.getState());
                const activeSectionId = selectActiveSectionId(reduxStore.getState());
                if (!activeSectionId) {
                    return false;
                }
                const { isCursorAtTheBeginning, isCursorAtTheEnd, beforeCursorHtml, afterCursorHtml, beforeCursorJSON } = getEditorDetailsBasedOnCursorPosition(editor);
                if (isCursorAtTheBeginning) {
                    reduxStore.dispatch(renameSection({ id: activeSectionId, newName: '' }));
                    editor.commands.setContent('');
                    reduxStore.dispatch(addNewStatement({
                        id: uuid(),
                        type: StatementTypes.TEXT,
                        text: editorHtmlToStatementText(afterCursorHtml),
                        mode: 'append',
                    }));
                    return true;
                }
                if (isCursorAtTheEnd) {
                    reduxStore.dispatch(addNewStatement({ id: uuid(), type: StatementTypes.TEXT, mode: 'append' }));
                    return true;
                }
                const activeLevel = beforeCursorJSON[0]?.attrs?.level || DEFAULT_HEADING_LEVEL;
                const activeSectionData = data?.sections.find((section) => section.id === activeSectionId);
                const activeStatementId = activeSectionData?.statements[0]?.id;
                if (!activeStatementId) {
                    return false;
                }
                const activeStatementData = selectStatementById(reduxStore.getState(), activeStatementId);
                reduxStore.dispatch(renameSection({
                    id: activeSectionId,
                    newName: editorHtmlToStatementText(beforeCursorHtml),
                }));
                editor.commands.setContent(beforeCursorJSON);
                editor.commands.updateAttributes('heading', { level: activeLevel });
                reduxStore.dispatch(addNewStatement({
                    id: uuid(),
                    type: activeStatementData?.type || StatementTypes.TEXT,
                    text: editorHtmlToStatementText(afterCursorHtml),
                    mode: 'append',
                }));
                return true;
            },
        };
    },
});
export default SectionEnterExtension;
//# sourceMappingURL=SectionEnterExtension.js.map