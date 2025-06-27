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

const getProvider = () => {
  if (isTestEnvironment) {
    return customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return customProvider({
      languageModels: {
        'chat-model': anthropic('claude-3-5-sonnet-latest'),
        'chat-model-reasoning': wrapLanguageModel({
          model: anthropic('claude-3-5-sonnet-latest'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': anthropic('claude-3-5-sonnet-latest'),
        'artifact-model': anthropic('claude-3-5-sonnet-latest'),
      },
      // imageModels: {
      //   'small-model': xai.image('grok-2-image'),
      // },
    })
  }

  if (process.env.OPEN_AI_API_KEY) {
    return customProvider({
      languageModels: {
        'chat-model': openai('gpt-4o-mini'),
        'chat-model-reasoning': wrapLanguageModel({
          model: openai('gpt-4o-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai('gpt-4o-mini'),
        'artifact-model': openai('gpt-4o-mini'),
      },
      // imageModels: {
      //   'small-model': xai.image('grok-2-image'),
      // },
    })
  }

  if (process.env.GROQ_API_KEY) {
    return customProvider({
      languageModels: {
        'chat-model': groq('llama-3.3-70b-versatile'),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq('llama-3.3-70b-versatile'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': groq('llama-3.3-70b-versatile'),
        'artifact-model': groq('llama-3.3-70b-versatile'),
      },
      // imageModels: {
      //   'small-model': xai.image('grok-2-image'),
      // },
    })
  }

  if (process.env.XAI_API_KEY) {
    return customProvider({
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
    })
  }
}


export const myProvider = getProvider();