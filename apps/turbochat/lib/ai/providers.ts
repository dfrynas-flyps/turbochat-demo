import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { groq } from '@ai-sdk/groq';
import { xai } from '@ai-sdk/xai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic'
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';


const PROVIDERS = {
  test: customProvider({
    languageModels: {
      'chat-model': chatModel,
      'chat-model-reasoning': reasoningModel,
      'title-model': titleModel,
      'artifact-model': artifactModel,
    },
  }),

  anthropic: customProvider({
    languageModels: {
      'chat-model': anthropic('claude-3-5-sonnet-latest'),
      'chat-model-reasoning': wrapLanguageModel({
        model: anthropic('claude-3-5-sonnet-latest'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': anthropic('claude-3-5-sonnet-latest'),
      'artifact-model': anthropic('claude-3-5-sonnet-latest'),
    },
  }),

  openai: customProvider({
    languageModels: {
      'chat-model': openai('gpt-4o-mini'),
      'chat-model-reasoning': wrapLanguageModel({
        model: openai('gpt-4o-mini'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': openai('gpt-4o-mini'),
      'artifact-model': openai('gpt-4o-mini'),
    },
  }),

  groq: customProvider({
    languageModels: {
      'chat-model': groq('llama-3.3-70b-versatile'),
      'chat-model-reasoning': wrapLanguageModel({
        model: groq('llama-3.3-70b-versatile'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': groq('llama-3.3-70b-versatile'),
      'artifact-model': groq('llama-3.3-70b-versatile'),
    },
  }),

  xai: customProvider({
    languageModels: {
      'chat-model': xai('grok-2-latest'),
      'chat-model-reasoning': wrapLanguageModel({
        model: xai('grok-2-latest'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': xai('grok-2-latest'),
      'artifact-model': xai('grok-2-latest'),
    },
    imageModels: {
      'small-model': xai.image('grok-2-image'),
    },
  }),
}

const getProvider = () => {
  if (isTestEnvironment) {
    return PROVIDERS.test;
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return PROVIDERS.anthropic;
  }

  if (process.env.OPEN_AI_API_KEY) {
    return PROVIDERS.openai;
  }

  if (process.env.GROQ_API_KEY) {
    return PROVIDERS.groq;
  }

  return PROVIDERS.xai;
}

export const myProvider = getProvider();