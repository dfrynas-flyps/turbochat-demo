CREATE TABLE IF NOT EXISTS "RichTextEditor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid,
	"json" json NOT NULL
);
