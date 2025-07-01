import type { ApiAdapterTypes, EditorTypes } from '@wildfires-org/document-editor';
import { sampleData } from './sampleData';

export class SimpleApiAdapter implements ApiAdapterTypes.IApiAdapter {
  private template = { ...sampleData };

  hasImageUpload(): this is never {
    return false as const;
  }

  hasVariableAutocomplete(): this is never {
    return false as const;
  }

  async createTemplate(): Promise<EditorTypes.TemplateData> {
    return this.template;
  }

  async fetchAllTemplates(): Promise<EditorTypes.TemplateData[]> {
    return [this.template];
  }

  async deleteTemplate(): Promise<void> {
    return;
  }

  async fetchData(): Promise<EditorTypes.TemplateData> {
    return this.template;
  }

  async saveData({ data }: { id: string; data: EditorTypes.TemplateData }): Promise<EditorTypes.TemplateData> {
    this.template = data;
    return data;
  }

  async getPrompts(): Promise<{ prompts: Record<EditorTypes.PromptTypes, EditorTypes.Prompt[]> }> {
    return { prompts: { classify: [], templatize: [], classifyImage: [], actionHintLogic: [] } };
  }

  async setPrompts(params: { prompts: Record<EditorTypes.PromptTypes, EditorTypes.Prompt[]> }): Promise<{ prompts: Record<EditorTypes.PromptTypes, EditorTypes.Prompt[]> }> {
    return params;
  }
}
