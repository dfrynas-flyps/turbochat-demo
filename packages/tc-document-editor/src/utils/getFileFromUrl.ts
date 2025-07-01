/**
 * Fetches a file from a URL and returns it as a File object
 * @param fileUrl - The URL to fetch the file from
 * @param fileName - The name to assign to the file
 * @returns Promise<File> - The file object created from the fetched blob
 * @throws Error if the fetch fails or the response is not ok
 */
export async function getFileFromUrl(fileUrl: string, fileName: string): Promise<File> {
    try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();

        // Try to detect MIME type from response headers, fallback to blob type
        const contentType = response.headers.get('content-type') || blob.type || 'application/octet-stream';

        // Create and return the File object
        return new File([blob], fileName, {
            type: contentType,
            lastModified: Date.now()
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching file from URL: ${error.message}`);
        }
        throw new Error('Unknown error occurred while fetching file');
    }
}