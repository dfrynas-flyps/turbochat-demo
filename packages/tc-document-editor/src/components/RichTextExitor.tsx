'use client';

import React, { useEffect, useMemo } from 'react';
import { EditorContainer, setApiAdapter } from '@wildfires-org/document-editor';
import { TurboChatApiAdapter } from '../TurboChatApiAdapter';

type RichTextEditorType = {
  documentId: string;
  onSaveContent: (updatedContent: string, debounce: boolean) => void;
  isPreviewMode?: boolean;
};

export const RichTextEditor: React.FC<RichTextEditorType> = ({
  documentId,
  onSaveContent,
  isPreviewMode = false,
}) => {
  const apiAdapter = useMemo(() => {
    if (documentId) {
      return new TurboChatApiAdapter({
        documentId,
        baseUrl: window.location.origin,
      });
    }
  }, [documentId]);

  useEffect(() => {
    if (apiAdapter) {
      setApiAdapter(apiAdapter);
    }
  }, [apiAdapter]);

  if (!apiAdapter) {
    return null;
  }

  return <EditorContainer id={documentId} isPreviewMode={isPreviewMode} />;
};
