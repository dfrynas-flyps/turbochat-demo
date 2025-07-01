import type { Session } from 'next-auth';
import type { EditorTypes } from '@wildfires-org/document-editor';

import { richTextEditorQueries } from '../../../db/queries';
import type { Document } from '../../../db/schema'

type Dependencies = {
    auth: () => Promise<Session | null>
    getDocumentById: ({ id }: { id: string }) => Promise<Document>
}

export const richTextEditorRouteHandlers = ({ auth, getDocumentById }: Dependencies) => {

    async function GET(request: Request) {
        const session = await auth();

        if (!session || !session.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const documentId = searchParams.get('documentId');

        if (!documentId) {
            return new Response('Document ID is required', { status: 400 });
        }

        try {
            const document = await getDocumentById({ id: documentId });

            if (!document) {
                return new Response('Document not found', { status: 404 });
            }

            if (document.userId !== session.user.id) {
                return new Response('Unauthorized', { status: 401 });
            }

            // Get rich text editor data
            const richTextEditorRecord = await richTextEditorQueries.getByDocumentId({ documentId });

            if (!richTextEditorRecord) {
                return new Response('Rich text editor data not found', { status: 404 });
            }

            return Response.json(richTextEditorRecord.json);
        } catch (error) {
            console.error('Failed to fetch rich text editor data:', error);
            return new Response('Internal Server Error', { status: 500 });
        }
    }

    async function PUT(request: Request) {
        const session = await auth();

        if (!session || !session.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        try {
            const body = await request.json();
            const { documentId, templateData } = body;

            if (!documentId || !templateData) {
                return new Response('Document ID and template data are required', { status: 400 });
            }

            // Verify document ownership
            const document = await getDocumentById({ id: documentId });

            if (!document) {
                return new Response('Document not found', { status: 404 });
            }

            if (document.userId !== session.user.id) {
                return new Response('Unauthorized', { status: 401 });
            }

            await richTextEditorQueries.updateByDocumentId({
                documentId,
                json: templateData as EditorTypes.TemplateData,
            });

            return Response.json(templateData);
        } catch (error) {
            console.error('Failed to update rich text editor data:', error);
            return new Response('Internal Server Error', { status: 500 });
        }
    }

    return { PUT, GET }

} 