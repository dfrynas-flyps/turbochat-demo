import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { richTextEditor } from "./schema";
import { eq } from "drizzle-orm";
import type { EditorTypes } from "@wildfires-org/document-editor";

const getDbClient = () => {
	if (!process.env.POSTGRES_URL) {
		throw new Error("POSTGRES_URL environment variable is not defined");
	}

	const client = postgres(process.env.POSTGRES_URL);
	return drizzle(client);
};

export const db = getDbClient();


export const richTextEditorQueries = {
	async create({
		documentId,
		json,
	}: {
		documentId: string | null;
		json: EditorTypes.TemplateData;
	}) {
		try {
			return await db
				.insert(richTextEditor)
				.values({ documentId, json })
				.returning();
		} catch (error) {
			console.error('Failed to save rich text editor in database');
			throw error;
		}
	},

	async getById({ id }: { id: string }) {
		try {
			const [result] = await db
				.select()
				.from(richTextEditor)
				.where(eq(richTextEditor.id, id))
				.limit(1);

			return result;
		} catch (error) {
			console.error('Failed to get rich text editor by id from database');
			throw error;
		}
	},

	async getByDocumentId({
		documentId
	}: {
		documentId: string
	}) {
		try {
			const [result] = await db
				.select()
				.from(richTextEditor)
				.where(eq(richTextEditor.documentId, documentId))
				.limit(1);

			return result;
		} catch (error) {
			console.error('Failed to get rich text editor by document id from database');
			throw error;
		}
	},

	async update({
		id,
		json,
	}: {
		id: string;
		json: EditorTypes.TemplateData;
	}) {
		try {
			return await db
				.update(richTextEditor)
				.set({ json })
				.where(eq(richTextEditor.id, id))
				.returning();
		} catch (error) {
			console.error('Failed to update rich text editor by id in database');
			throw error;
		}
	},

	async updateByDocumentId({
		documentId,
		json,
	}: {
		documentId: string;
		json: EditorTypes.TemplateData;
	}) {
		try {
			return await db
				.update(richTextEditor)
				.set({ json })
				.where(eq(richTextEditor.documentId, documentId))
				.returning();
		} catch (error) {
			console.error('Failed to update rich text editor by document id in database');
			throw error;
		}
	},

	async deleteById({ id }: { id: string }) {
		try {
			return await db
				.delete(richTextEditor)
				.where(eq(richTextEditor.id, id))
				.returning();
		} catch (error) {
			console.error('Failed to delete rich text editor by id from database');
			throw error;
		}
	},

	async deleteByDocumentId({
		documentId
	}: {
		documentId: string
	}) {
		try {
			return await db
				.delete(richTextEditor)
				.where(eq(richTextEditor.documentId, documentId))
				.returning();
		} catch (error) {
			console.error('Failed to delete rich text editor by document id from database');
			throw error;
		}
	},

	async getAll() {
		try {
			return await db.select().from(richTextEditor);
		} catch (error) {
			console.error('Failed to get rich text editors from database');
			throw error;
		}
	}
};
