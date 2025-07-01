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
