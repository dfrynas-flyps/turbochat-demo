import { templatesAiProxyRouteHandlers } from "@turbochat/tc-document-editor/server"

const TEMPLATES_AI_API_URL = process.env.TEMPLATES_AI_API_URL as string
const TEMPLATES_AI_API_KEY = process.env.TEMPLATES_AI_API_KEY as string
const TEMPLATES_AI_API_VERSION = process.env.TEMPLATES_AI_API_VERSION as string

export const { GET } = templatesAiProxyRouteHandlers({
    TEMPLATES_AI_API_URL,
    TEMPLATES_AI_API_KEY,
    TEMPLATES_AI_API_VERSION
})

export const dynamic = 'force-dynamic'
