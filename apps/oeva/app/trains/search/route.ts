import { createClient } from 'hafas-client'
import { profile as dbProfile } from 'hafas-client/p/db/index.js'

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url)
    
    if (!searchParams.get('query')) {
        return Response.json({error: 'Missing required parameter `query`.'}, {status: 400})
    }

    const userAgent = 'OeVA-App'
    
    const client = createClient(dbProfile, userAgent)
    return Response.json(await client.tripsByName(searchParams.get('query'), undefined))
}