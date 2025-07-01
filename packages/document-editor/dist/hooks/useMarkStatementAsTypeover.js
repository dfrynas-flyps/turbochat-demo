import { useCallback } from 'react';
import sanitizeHtml from 'sanitize-html';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { formatStatementText } from '../helpers/parseTemplateStatements';
import { typeoverStatement } from '../redux';
import { selectData, selectProjectData, selectVariableRegistry } from '../redux/selectors';
export const useMarkStatementAsTypeover = () => {
    const dispatch = useAppDispatch();
    const projectData = useAppSelector(selectProjectData);
    const templateData = useAppSelector(selectData);
    const variableRegistry = useAppSelector(selectVariableRegistry);
    const getSectionByStatementId = useCallback((statementId) => {
        return templateData?.sections.find((section) => {
            const allStatementIds = section.statements.map((statement) => statement.id);
            return allStatementIds.includes(statementId);
        });
    }, [templateData]);
    const markTemplateAsTypeover = useCallback((statement) => {
        const section = getSectionByStatementId(statement.id);
        if (!section) {
            throw new Error(`Section not found for statement: ${statement.id}`);
        }
        const text = formatStatementText({
            statement,
            sectionId: section.id,
            variableRegistry,
            projectData,
            variableOutput: 'value',
        });
        const sanitizedText = sanitizeHtml(text, { allowedTags: [] });
        dispatch(typeoverStatement({
            id: statement.id,
            text: sanitizedText,
            typeoverMode: true,
        }));
    }, [variableRegistry, dispatch, getSectionByStatementId, projectData]);
    return markTemplateAsTypeover;
};
//# sourceMappingURL=useMarkStatementAsTypeover.js.map