/**
 * Returns an array of statement IDs that are part of the same paragraph as the given statement.
 *
 * @param statementId The ID of the statement to get the paragraph statement IDs for.
 * @param data The template data to get the paragraph statement IDs from.
 * @returns An array of statement IDs that are part of the same paragraph as the given statement.
 */
export const getParagraphStatementIds = (statementId, data) => {
    if (!data) {
        return [];
    }
    for (const section of data.sections) {
        const statementIndex = section.statements.findIndex((statement) => statement.id === statementId);
        if (statementIndex === -1) {
            continue;
        }
        const targetType = section.statements[statementIndex].type;
        const paragraphStart = findParagraphStart(section.statements, statementIndex, targetType);
        const paragraphEnd = findParagraphEnd(section.statements, statementIndex, targetType);
        return section.statements.slice(paragraphStart, paragraphEnd + 1).map((statement) => statement.id);
    }
    return [];
};
const findParagraphStart = (statements, startIndex, targetType) => {
    let paragraphStartIndex = startIndex;
    while (paragraphStartIndex > 0 &&
        statements[paragraphStartIndex - 1].type === targetType &&
        !statements[paragraphStartIndex - 1].last_statement) {
        paragraphStartIndex--;
    }
    return paragraphStartIndex;
};
const findParagraphEnd = (statements, startIndex, targetType) => {
    let paragraphEndIndex = startIndex;
    while (paragraphEndIndex < statements.length - 1 &&
        !statements[paragraphEndIndex].last_statement &&
        statements[paragraphEndIndex + 1].type === targetType) {
        paragraphEndIndex++;
    }
    return paragraphEndIndex;
};
//# sourceMappingURL=getParagraphStatementIds.js.map