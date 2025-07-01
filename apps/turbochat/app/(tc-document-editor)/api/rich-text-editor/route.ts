import { auth } from '@/app/(auth)/auth';
import { getDocumentById } from '@/lib/db/queries';
import { richTextEditorRouteHandlers } from '@turbochat/tc-document-editor/server'

export const { PUT, GET } = richTextEditorRouteHandlers({
    auth,
    getDocumentById
});

export const dynamic = 'force-dynamic'
