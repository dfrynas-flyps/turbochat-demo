import { TemplateData, TemplateStatement } from '../types/editor';
/**
 * Returns an array of statement IDs that are part of the same paragraph as the given statement.
 *
 * @param statementId The ID of the statement to get the paragraph statement IDs for.
 * @param data The template data to get the paragraph statement IDs from.
 * @returns An array of statement IDs that are part of the same paragraph as the given statement.
 */
export declare const getParagraphStatementIds: (statementId: TemplateStatement["id"], data: TemplateData | null) => Array<TemplateStatement["id"]>;
//# sourceMappingURL=getParagraphStatementIds.d.ts.map