import { TemplateData } from '../../../types/editor';
/**
 * Initialize the IndexedDB database for templates
 * @returns Promise that resolves when the database is ready
 */
export declare const initTemplateDB: () => Promise<IDBDatabase>;
/**
 * Save a template to IndexedDB
 * @param template The template to save
 * @returns Promise that resolves when the template is saved
 */
export declare const saveTemplate: (template: TemplateData) => Promise<void>;
/**
 * Fetch a template by ID from IndexedDB
 * @param id The ID of the template to fetch
 * @returns Promise that resolves with the template or null if not found
 */
export declare const fetchTemplateById: (id: string) => Promise<TemplateData | null>;
/**
 * Fetch all templates from IndexedDB
 * @returns Promise that resolves with an array of templates
 */
export declare const fetchAllTemplates: () => Promise<TemplateData[]>;
/**
 * Delete a template from IndexedDB
 * @param id The ID of the template to delete
 * @returns Promise that resolves when the template is deleted
 */
export declare const deleteTemplate: (id: string) => Promise<void>;
/**
 * Search templates by name
 * @param query The search query
 * @returns Promise that resolves with an array of matching templates
 */
export declare const searchTemplatesByName: (query: string) => Promise<TemplateData[]>;
//# sourceMappingURL=templateDB.d.ts.map