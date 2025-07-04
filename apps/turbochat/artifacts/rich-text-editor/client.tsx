import { Artifact } from "@/components/create-artifact";
import { RichTextEditor } from "@turbochat/tc-document-editor/client";

export const richTextEditorArtifact = new Artifact<"richTextEditor", unknown>({
	kind: "richTextEditor",
	description:
		"Artifact for: rich text editor, templatize docx/pdf document, document editor",
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
			<div style={{ maxWidth: "860px", margin: "0 auto" }}>
				<RichTextEditor documentId={documentId} onSaveContent={onSaveContent} />
			</div>
		);
	},
	actions: [],
	toolbar: [],
});
