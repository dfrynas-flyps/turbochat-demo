/**
 * Type definitions for tc-document-editor
 */

import type { EditorTypes } from "@wildfires-org/document-editor";

// Re-export EditorTypes for consumer packages
export type { EditorTypes };

export const DocumentEditorTools = {
	documentEditorList: "documentEditorList",
	documentEditorView: "documentEditorView",
	documentEditorCreate: "documentEditorCreate",
} as const;

// Document editor types
export interface DocumentEditorDocument {
	id: string;
	userId: string;
	chatId: string;
	title: string;
	content: EditorTypes.TemplateData;
	originalFileName: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface DocumentEditorCreateInput {
	title: string;
	initialContent?: string;
}
