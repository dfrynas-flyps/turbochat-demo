import React, { useMemo } from 'react';
import type { Attachment } from 'ai';

type TemplatizeAttachmentButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  getIsVisible?: () => boolean;
  attachments: Attachment[];
};

export const TemplatizeAttachmentButton = ({
  onClick,
  children = null,
  className = '',
  getIsVisible,
  attachments,
}: TemplatizeAttachmentButtonProps) => {
  const isButtonVisible = useMemo(() => {
    if (typeof getIsVisible === 'function') {
      return getIsVisible();
    }

    if (attachments.length === 1) {
      return attachments.every((attachment) => {
        return (
          attachment.contentType === 'application/pdf' ||
          attachment.contentType ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );
      });
    }

    return false;
  }, [attachments, getIsVisible]);

  if (!isButtonVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={`rounded-full px-3 py-1.5 h-fit border dark:border-zinc-600 mr-1 text-xs h-auto font-medium ${className}`}
      onClick={onClick}
    >
      {children ?? 'Templatize attachment'}
    </button>
  );
};
