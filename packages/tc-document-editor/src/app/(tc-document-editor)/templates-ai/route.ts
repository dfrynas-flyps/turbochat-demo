type Dependencies = {
    TEMPLATES_AI_API_URL: string;
    TEMPLATES_AI_API_KEY: string;
    TEMPLATES_AI_API_VERSION: string;
}

export const templatesAiProxyRouteHandlers = ({ TEMPLATES_AI_API_URL, TEMPLATES_AI_API_KEY, TEMPLATES_AI_API_VERSION }: Dependencies) => {

    async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
        try {
            const templateId = (await params).id
            const searchParams = new URL(request.url).searchParams.toString()
            const apiUrl = `${TEMPLATES_AI_API_URL}/api/${TEMPLATES_AI_API_VERSION}/templates/${templateId}?${searchParams}`

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-Access-Token': TEMPLATES_AI_API_KEY,
                },
            })

            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`)
            }

            const responseData = await response.json()

            return Response.json(responseData, { status: response.status })
        } catch (error: unknown) {
            return Response.json({ error: (error as Error).message }, { status: 500 })
        }
    }

    async function POST(request: Request) {
        try {
            const searchParams = new URL(request.url).searchParams.toString()
            const apiUrl = `${TEMPLATES_AI_API_URL}/api/${TEMPLATES_AI_API_VERSION}/templates?${searchParams}`

            // Clone the request to forward it
            const formData = await request.formData()

            // Forward the request to the Python API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-Access-Token': TEMPLATES_AI_API_KEY,
                },
                body: formData,
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`API responded with status ${response.status}: ${errorText}`)
            }

            const responseData = await response.json()
            return Response.json(responseData, { status: response.status })
        } catch (error: unknown) {
            return Response.json({ error: (error as Error).message }, { status: 500 })
        }
    }

    return { GET, POST }
}
