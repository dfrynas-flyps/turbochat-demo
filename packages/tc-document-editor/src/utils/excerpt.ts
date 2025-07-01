import type { EditorTypes } from "@wildfires-org/document-editor";

export function generateExcerpt(content: EditorTypes.TemplateData): string {
	if (!content.sections || content.sections.length === 0) {
		return "No content available";
	}

	// Get text from the first section's statements
	const firstSection = content.sections[0];
	const excerptParts: string[] = [];

	if (firstSection.statements && firstSection.statements.length > 0) {
		for (const statement of firstSection.statements) {
			if (statement.text) {
				// Remove HTML tags and get plain text
				const plainText = statement.text.replace(/<[^>]*>/g, "").trim();
				if (plainText) {
					excerptParts.push(plainText);
				}
			}
			// Stop after we have enough text (approximately 200 characters)
			if (excerptParts.join(" ").length > 150) {
				break;
			}
		}
	}

	let excerpt = excerptParts.join(" ");

	// Truncate to 200 characters if needed
	if (excerpt.length > 200) {
		excerpt = `${excerpt.substring(0, 197)}...`;
	}

	return excerpt || "No preview available";
}
