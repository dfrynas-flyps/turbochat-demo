import { ApiAdapter, type ApiAdapterTypes, type EditorTypes, isDataReady } from "@wildfires-org/document-editor";

type AdapterConfig = {
    baseUrl: string;
    documentId: string;
};

export class TurboChatApiAdapter extends ApiAdapter {
    private documentId: string;
    private baseUrl?: string;

    constructor(config: AdapterConfig) {
        super();
        this.documentId = config.documentId;
        this.baseUrl = config.baseUrl ?? '';
    }

    createTemplate = async (file: File, options: ApiAdapterTypes.CreateTemplateOptions): Promise<EditorTypes.TemplateData> => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            // Build URL with query parameters
            const params = new URLSearchParams({
                name: options.name,
                ce: 'fuel_break',
                process: 'ce',
            })
            if (options?.useCache !== undefined) {
                params.append('use_cache', options.useCache.toString())
            }

            const url = `${this.baseUrl}/api/templates-ai${params.toString() ? `?${params.toString()}` : ''}`

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Template creation failed: ${response.statusText}`)
            }

            const data = await response.json()

            if (!data.id) {
                throw new Error('Template ID not found in response')
            }

            const readyDoc = await this.pollTemplate(data.id)

            return readyDoc
        } catch (error) {
            console.error('Error creating template:', error)
            throw error
        }
    }

    pollTemplate = async (id: string, interval = 5000, maxWaitTimeSeconds = 0): Promise<EditorTypes.TemplateData> => {
        let waitTime = 0;
        while (true) {
            try {
                // Use the correct API endpoint structure based on the Next.js app router configuration
                // The route is defined at src/app/api/proxy/[id]/route.ts
                const response = await fetch(`${this.baseUrl}/api/templates-ai/${id}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch template: ${response.statusText}`)
                }

                const data: EditorTypes.TemplateData = await response.json()

                if (isDataReady(data)) {
                    return data
                }

                waitTime += interval;
                if (maxWaitTimeSeconds > 0 && waitTime > maxWaitTimeSeconds * 1000) {
                    throw new Error('Template processing timed out')
                }

                console.log(`Template ${id} not ready, waiting ${waitTime / 1000} seconds`)

                // Wait before the next attempt
                await new Promise((resolve) => setTimeout(resolve, interval))
            } catch (error) {
                console.error('Error polling template:', error)
                throw error
            }
        }
    }

    fetchData = async (): Promise<EditorTypes.TemplateData> => {
        try {
            const request = await fetch(`${this.baseUrl}/api/rich-text-editor?documentId=${this.documentId}`)

            if (!request.ok) {
                throw new Error(`Failed to fetch template: ${request.statusText}`)
            }

            const data: EditorTypes.TemplateData = await request.json()

            return data
        } catch (error) {
            console.error("Error fetching template data:", error);
            throw error;
        }
    };

    saveData = async ({ data }: { data: EditorTypes.TemplateData }): Promise<EditorTypes.TemplateData> => {
        try {
            const request = await fetch(`${this.baseUrl}/api/rich-text-editor`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ documentId: this.documentId, templateData: data }),
            })

            if (!request.ok) {
                throw new Error(`Failed to save template: ${request.statusText}`)
            }

            const savedData: EditorTypes.TemplateData = await request.json()

            return savedData
        } catch (error) {
            console.error("Error saving template data:", error);
            throw error;
        }
    };

    getPrompts = async () => { return { prompts: { templatize: [], classify: [], classifyImage: [], actionHintLogic: [] } } };
    setPrompts = async ({ prompts }: { prompts: Record<string, EditorTypes.Prompt[]> }) => { return { prompts } };
    fetchAllTemplates = async (): Promise<EditorTypes.TemplateData[]> => [];
    deleteTemplate = async (id: string): Promise<void> => { };
}
