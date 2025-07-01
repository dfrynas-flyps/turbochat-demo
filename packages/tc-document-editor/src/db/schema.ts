import type { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, json, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import type { EditorTypes } from "@wildfires-org/document-editor";


export const richTextEditor = pgTable('RichTextEditor', {
	id: uuid('id').primaryKey().notNull().defaultRandom(),
	documentId: uuid('documentId'),
	json: json('json').$type<EditorTypes.TemplateData>().notNull(),
});

export type RichTextEditor = InferSelectModel<typeof richTextEditor>;

/**
 * NOTE: Below definitions are copied from TurboChat core, 
 * just to provide full schema types for tc-document-editor integration
 */

export const user = pgTable('User', {
	id: uuid('id').primaryKey().notNull().defaultRandom(),
	email: varchar('email', { length: 64 }).notNull(),
	password: varchar('password', { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const document = pgTable(
	'Document',
	{
		id: uuid('id').notNull().defaultRandom(),
		createdAt: timestamp('createdAt').notNull(),
		title: text('title').notNull(),
		content: text('content'),
		kind: varchar('text', { enum: ['text', 'code', 'image', 'sheet', 'richTextEditor'] })
			.notNull()
			.default('text'),
		userId: uuid('userId')
			.notNull()
			.references(() => user.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.createdAt] }),
		};
	},
);

export type Document = InferSelectModel<typeof document>;