import { createClient } from 'hafas-client'
import { profile as stvProfile } from 'hafas-client/p/stv/index.js'

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    if (!query) {
        return Response.json({error: 'Missing required parameter `query`.'}, {status: 400})
    }

    const userAgent = 'OeVA-App'
    
    const client = createClient(stvProfile, userAgent)
    return Response.json(await client.locations(query, undefined))
}