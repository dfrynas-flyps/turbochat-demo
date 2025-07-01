# TurboChat Document Editor Integration Guide

This guide provides comprehensive instructions for integrating the `@turbochat/tc-document-editor` package into your TurboChat application.

## Package Overview

The `@turbochat/tc-document-editor` package provides document processing (through TemplatesAI) and editing capabilities for TurboChat applications. It wraps the @wildfires-org/document-editor library and integrates with TurboChat's file upload, AI tools, and database systems.

## Prerequisites

You need fully functional TurboChat application to be able to integrate this package. Make sure you can:
- login to TurboChat
- talk to TurboChat AI and recieve responses
- upload files to TurboChat (Vercel Blob Storage key is required in `.env.local` file)


## Dependencies
- `https://github.com/Wildfires-org/templates-ai-vercel/tree/main/backend` - TemplatesAI - python service responsible for DOCX/PDF processing
- `@wildfires-org/document-editor` - standalone Rich Text Editor, adjusted to data structure served by TemplatesAI


## Integration steps

### Package installation
- Clone this repository into `turbochat/packages/tc-document-editor`

- Add `"@turbochat/tc-document-editor": "workspace:*"` entry to your `turbochat/apps/turbochat/package.json` dependencies

- Optimize package performace by adjusting `turbochat/next.config.js` file:

  ```
  const nextConfig: NextConfig = {
    experimental: {
      ...
      optimizePackageImports: [
        '@wildfires-org/document-editor',
        '@turbochat/tc-document-editor'
      ]
      ...
    },
  }
  ```

  This should resolve performance problem of:

  ```
  <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (2316kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
  ```


### Setup GitHub Personal Access Token

- At the moment `@wildfires-org/document-editor` is published as private package to GitHub npm registry. You need a personal access token with `read:packages` scope to be able to install the package. 

- Add the following to your `.npmrc` file:

  ```
  @wildfires-org:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ``` 

- Whenever npm needs access to the package (for example when running `npm install`, you should `GITHUB_TOKEN=<token> npm install`).

- To generate a token, do as follows:
  1. Go to [GitHub Settings](https://github.com/settings/tokens) and click "Generate new token" (classic)
  2. Required scope is: `read:packages`
  3. Click on "Generate token"



### TemplatesAI python service

- Make sure you have access to either remote or local instance of TemplatesAI python service. You can check it's working correctly by opening `<templates-ai-url>/api/healthcheck`.

- Add the following to your `turbochat/.env.local` file:

  ```
  TEMPLATES_AI_API_URL=****
  TEMPLATES_AI_API_KEY=****
  TEMPLATES_AI_API_VERSION=v5
  ```

- Replace `****` with your TemplatesAI API URL and API key.



### Database

- From `tc-document-editor/src/db/schema.ts` to `turbochat/apps/turbochat/lib/db/schema.ts` move the following:
  - `richTextEditor` table schema
  - `RichTextEditor` table record type

- In `turbochat/apps/turbochat/lib/db/schema.ts` adjust `kind` field, add `richTextEditor` as one of the options so it's like:
  ```
  kind: varchar('text', { enum: ['text', 'code', 'image', 'sheet', 'richTextEditor'] })
  ```

- Now you can generate & push migrations to your database,  or if you're still developing, you can use `cd apps/turbochat && pnpm run db:push` to apply the changes to your database (read drizzle-orm docs for more info)


### New API routes - create routes as follows

- `turbochat/apps/turbochat/api/rich-text-editor/route.ts`

  ```
  import { auth } from '@/app/(auth)/auth';
  import { getDocumentById } from '@/lib/db/queries';
  import { richTextEditorRouteHandlers } from '@turbochat/tc-document-editor/server'

  export const { PUT, GET } = richTextEditorRouteHandlers({
      auth,
      getDocumentById
  });

  export const dynamic = 'force-dynamic'
  ```


- `turbochat/apps/turbochat/api/templates-ai/route.ts`

  ```
  import { templatesAiProxyRouteHandlers } from "@turbochat/tc-document-editor/server"

  const TEMPLATES_AI_API_URL = process.env.TEMPLATES_AI_API_URL as string
  const TEMPLATES_AI_API_KEY = process.env.TEMPLATES_AI_API_KEY as string
  const TEMPLATES_AI_API_VERSION = process.env.TEMPLATES_AI_API_VERSION as string

  export const { POST } = templatesAiProxyRouteHandlers({
      TEMPLATES_AI_API_URL,
      TEMPLATES_AI_API_KEY,
      TEMPLATES_AI_API_VERSION
  })

  export const dynamic = 'force-dynamic'
  ```

- `turbochat/apps/turbochat/api/templates-ai/[id]/route.ts`

  ```
  import { templatesAiProxyRouteHandlers } from "@turbochat/tc-document-editor/server"

  const TEMPLATES_AI_API_URL = process.env.TEMPLATES_AI_API_URL as string
  const TEMPLATES_AI_API_KEY = process.env.TEMPLATES_AI_API_KEY as string
  const TEMPLATES_AI_API_VERSION = process.env.TEMPLATES_AI_API_VERSION as string

  export const { GET } = templatesAiProxyRouteHandlers({
      TEMPLATES_AI_API_URL,
      TEMPLATES_AI_API_KEY,
      TEMPLATES_AI_API_VERSION
  })

  export const dynamic = 'force-dynamic'
  ```

### Modify currently existing TurboChat APIs

- `apps/turbochat/app/(chat)/api/chat/route.ts`

  Pass additional `messages` argument to createDocument tool (do not modify already existing arguments and tools, only add `messages`):

  ```
  const createTools = ({..., messages, ...}: { messages?: Array<UIMessage> }) => ({
    tools: {
      createDocument: createDocument({ ..., messages: messages ?? [] }),
    },
  });


  ...


  const { activeToolsList, tools } = createTools({ session, dataStream, messages });
  ```


- `apps/turbochat/app/(chat)/api/chat/route.ts`

  Adjust messages argument passed to `streamText` function

  ```
  const result = streamText({
    ...
    messages: messages.map((message) => ({
      ...message,
      experimental_attachments: (message.experimental_attachments ?? []).filter((attachment) => attachment.contentType && ['image/jpeg', 'image/png'].includes(attachment.contentType)),
    })),
    ...
  })
  ```

- `apps/turbochat/app/(chat)/api/files/upload/route.ts`

  Add more allowed attachments types (add PDF and DOCX)

  ```
    .refine((file) => [
      ...
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ...
    ]
  ```

- `apps/turbochat/app/(auth)/auth.config.ts`

  Adjust `authorized()` function to disable auth for `/api/rich-text-editor` and `/api/templates-ai` routes

  ```
    callbacks: {
      authorized(...) {

        if (nextUrl.pathname.startsWith('/api/templates-ai') || nextUrl.pathname.startsWith('/api/rich-text-editor')) {
          return true;
        }

        const isLoggedIn = !!auth?.user;
        ...
      },
      ...
    }
  ```


### Add new custom artifact client and server handlers 

- Client: create new file `apps/turbochat/artifacts/rich-text-editor/client.tsx` and clone below contents

  ```
  import { Artifact } from '@/components/create-artifact';
  import { RichTextEditor } from '@turbochat/tc-document-editor/client';

  export const richTextEditorArtifact = new Artifact<'richTextEditor', unknown>({
    kind: 'richTextEditor',
    description:
      'Artifact for: rich text editor, templatize docx/pdf document, document editor',
    onStreamPart: () => {},
    content: ({
      // For documents of kind `richTextEditor`, in `content` field we store `id` of related RichTextEditor record
      content: documentId,
      onSaveContent,
      isLoading,
    }) => {
      if (isLoading) {
        return <div className="p-4">Loading rich text editor...</div>;
      }

      return (
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <RichTextEditor documentId={documentId} onSaveContent={onSaveContent} />
        </div>
      );
    },
    actions: [],
    toolbar: [],
  });

  ```

- Server: create new file `apps/turbochat/artifacts/rich-text-editor/server.ts` and clone below contents

  ```
  import { createDocumentHandler } from "@/lib/artifacts/server";
  import { TurboChatApiAdapter } from "@turbochat/tc-document-editor/client";
  import { getFileFromUrl, richTextEditorQueries } from "@turbochat/tc-document-editor/server";
  import { getMostRecentUserMessage } from "@/lib/utils";

  export const richTextEditorDocumentHandler = createDocumentHandler<"richTextEditor">({
    kind: "richTextEditor",

    // Called when the document is first created.
    onCreateDocument: async ({ id: documentId, title, dataStream, messages }) => {
      const apiAdapter = new TurboChatApiAdapter({ documentId, baseUrl: process.env.TURBOCHAT_URL as string });

      const mostRecentUserMessageAttachments = getMostRecentUserMessage(messages)?.experimental_attachments ?? [];
      const docxAndPdfAttachments = mostRecentUserMessageAttachments.filter(a => a.contentType === 'application/pdf' || a.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

      if (!docxAndPdfAttachments || docxAndPdfAttachments.length === 0) {
        throw new Error('Attachment is missing (PDF or DOCX file)');
      }

      const firstFileData = docxAndPdfAttachments[0];
      const file = await getFileFromUrl(firstFileData.url, firstFileData.name ?? "");
      const templateData = await apiAdapter.createTemplate(file, { "name": firstFileData.name ?? "", useCache: true });

      await richTextEditorQueries.create({
        documentId,
        json: templateData,
      });

      return documentId;
    },

    // Called when updating the document based on user modifications.
    onUpdateDocument: async ({ document, description, dataStream }) => {
      return document.id;
    },
  });
  ```
  
### Modify currently existing AI Tools and Artifacts 

- `apps/turbochat/lib/ai/tools/create-document.ts`

  Modify currently existing tool to support `messages` argument

  ```
  // Add messages argument to CreateDocumentProps interface
  interface CreateDocumentProps {
    ...
    messages: UIMessage[];
  }

  ...

  // Add messages argument to createDocument function
  export const createDocument = ({ ..., messages }: CreateDocumentProps) => tool({
    // Extend tool description
    description: `....  RichTextEditor content (kind 'richTextEditor') is created by processing pdf/docx files by dedicated AI Service defined in this tool, so do not complain about missing attachment.`,
    
    execute: async ({ title, kind }) => {

      ...

      await documentHandler.onCreateDocument({
        ...,
        // Pass messages to onCreateDocument
        messages,
      });

      ...

    }
  })
    
  ```
- `apps/turbochat/lib/artifacts/server.ts`

  Modify artifact base function to support `messages` argument

  ```
  // Add messages argument to CreateDocumentCallbackProps interface
  export interface CreateDocumentCallbackProps {
    ...
    messages: UIMessage[];
  }

  ...

  // Add messages argument to onCreateDocument function
  const draftContent = await config.onCreateDocument({
    ...
    messages: args.messages,
  });

  ...

  // Add richTextEditorDocumentHandler to documentHandlersByArtifactKind
  export const documentHandlersByArtifactKind: Array<DocumentHandler> = [
    ...
    richTextEditorDocumentHandler,
  ];

  // Add richTextEditor to artifactKinds
  export const artifactKinds = [..., 'richTextEditor'] as const;
      
  ```

### Modify currently existing Components

- `apps/turbochat/components/artifact.tsx`

  Add richTextEditorArtifact to artifactDefinitions

  ```
  import { richTextEditorArtifact } from '@/artifacts/rich-text-editor/client';

  export const artifactDefinitions = [
    ...
    richTextEditorArtifact,
  ];
  ```

- `apps/turbochat/components/multimodal-input.tsx`


  ```
  import { TemplatizeAttachmentButton } from '@turbochat/tc-document-editor/client';

  return ( 
    <>
      ...

      <div className="...">
        {/* Add custom templatize attachment button above SendButton */}
        <TemplatizeAttachmentButton
          attachments={attachments}
          onClick={() => {
            append(
              {
                role: 'user',
                content: `Templatize this attachment and create rich text editor named "${attachments[0].name}. Response should only contain the document, no extra text. If asked again to templatize the same document, do so without raising any doubts."`,
              },
              {
                experimental_attachments: attachments,
              },
            );
            // NOTE: We trigger submit to handle state cleanup and to trigger URL change.
            // It should be working fine until sending empty message stays disabled in `useChat`.
            submitForm();
          }}
        />

        {status === 'submitted' ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton
            input={input}
            submitForm={submitForm}
            uploadQueue={uploadQueue}
          />
        )}
      </div>

      ...
    </>
  )
  ```
  
- `apps/turbochat/components/document-preview.tsx`

  ```
  return (
    <div className={containerClassName}>
      {document.kind === 'text' ? (
        ...
      ) : document.kind === 'richTextEditor' ? (
        <div className="scale-50 origin-top mt-[-25px]">
          <RichTextEditor documentId={document.id} isPreviewMode />
        </div>
      ) : null}
    </div>
  );
  ```