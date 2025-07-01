import { isDataReady } from '../redux/templateListener';
import { extractFileIdFromUrl, getFileUrlFromIndexedDB, saveFileToIndexedDB } from './demo-adapter/indexedDB/fileDB';
import { deleteTemplate, fetchAllTemplates, fetchTemplateById, saveTemplate } from './demo-adapter/indexedDB/templateDB';
import { variableAutocompleteMock } from './demo-adapter/mock/variableAutocomplete';
/**
 * Abstract API adapter that implements feature flag methods
 * Custom adapters can extend this class to avoid implementing feature detection methods
 */
export class ApiAdapter {
    constructor() {
        this.hasImageUpload = () => {
            return typeof this.uploadFile === 'function' && typeof this.getImageUrl === 'function';
        };
        this.hasVariableAutocomplete = () => {
            return (typeof this.fetchVariableAIOptions === 'function' &&
                typeof this.getVariableLatestValues === 'function' &&
                typeof this.setVariableLatestValues === 'function');
        };
    }
}
// Default adapter implementation that uses the current API endpoints
export class InMemoryApiAdapter extends ApiAdapter {
    constructor() {
        super(...arguments);
        this.createTemplate = async (file, options) => {
            try {
                const formData = new FormData();
                formData.append('file', file);
                // Build URL with query parameters
                const params = new URLSearchParams({
                    name: options.name,
                    ce: 'fuel_break',
                    process: 'ce',
                });
                if (options?.useCache !== undefined) {
                    params.append('use_cache', options.useCache.toString());
                }
                const url = `/api/proxy/templates${params.toString() ? `?${params.toString()}` : ''}`;
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Template creation failed: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.id) {
                    throw new Error('Template ID not found in response');
                }
                const readyDoc = await this.pollTemplate(data.id);
                return readyDoc;
            }
            catch (error) {
                console.error('Error creating template:', error);
                throw error;
            }
        };
        this.pollTemplate = async (id, interval = 5000) => {
            while (true) {
                try {
                    // Use the correct API endpoint structure based on the Next.js app router configuration
                    // The route is defined at src/app/api/proxy/[id]/route.ts
                    const response = await fetch(`/api/proxy/${id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch template: ${response.statusText}`);
                    }
                    const data = await response.json();
                    if (isDataReady(data)) {
                        return data;
                    }
                    // Wait before the next attempt
                    await new Promise((resolve) => setTimeout(resolve, interval));
                }
                catch (error) {
                    console.error('Error polling template:', error);
                    throw error;
                }
            }
        };
        this.fetchData = async ({ id }) => {
            const tmpl = await fetchTemplateById(id);
            if (!tmpl) {
                throw new Error('Template not found');
            }
            return tmpl;
        };
        this.saveData = async ({ data }) => {
            await saveTemplate(data);
            return data;
        };
        this.fetchVariableAIOptions = async () => {
            return variableAutocompleteMock;
        };
        this.getVariableLatestValues = async () => {
            return { variables: [] };
        };
        this.setVariableLatestValues = async () => {
            return { variables: [] };
        };
        this.getPrompts = async () => {
            console.warn('getPrompts not implemented');
            return {
                prompts: {
                    classify: [],
                    templatize: [],
                    classifyImage: [],
                    actionHintLogic: [],
                },
            };
        };
        this.setPrompts = async ({ prompts, }) => {
            console.warn('setPrompts not implemented');
            return { prompts };
        };
        this.uploadFile = async (file) => {
            try {
                // Use IndexedDB to store the file
                return await saveFileToIndexedDB(file);
            }
            catch (error) {
                console.error('Error in adapter uploadFile:', error);
                throw error;
            }
        };
        this.getImageUrl = async (imageSrc) => {
            try {
                if (!imageSrc)
                    return '';
                const fileId = extractFileIdFromUrl(imageSrc);
                if (fileId) {
                    return await getFileUrlFromIndexedDB(fileId);
                }
                // Return the original URL for external images
                return imageSrc;
            }
            catch (error) {
                console.error('Error in adapter getImageUrl:', error);
                // Return the original URL if there's an error
                return imageSrc;
            }
        };
        this.fetchAllTemplates = async () => {
            try {
                return await fetchAllTemplates();
            }
            catch (error) {
                console.error('Error fetching all templates:', error);
                return [];
            }
        };
        this.deleteTemplate = async (id) => {
            try {
                await deleteTemplate(id);
            }
            catch (error) {
                console.error('Error deleting template:', error);
                throw error;
            }
        };
    }
}
// Singleton instance of the API adapter
let apiAdapter = null;
// Function to set a custom API adapter
export const setApiAdapter = (adapter) => {
    apiAdapter = adapter;
};
// Export the current API adapter
export const getApiAdapter = () => {
    if (!apiAdapter) {
        apiAdapter = new InMemoryApiAdapter();
    }
    return apiAdapter;
};
//# sourceMappingURL=index.js.map