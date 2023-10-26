import { createClient } from 'hafas-client'
import { profile as dbProfile } from 'hafas-client/p/db/index.js'

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query');

    if (!query) {
        return Response.json({error: 'Missing required parameter `query`.'}, {status: 400})
    }

    const userAgent = 'OeVA-App'
    
    const client = createClient(dbProfile, userAgent)

    
    if (!client.tripsByName) {
        throw new Error('Invalid hafas client')
    }

    return Response.json(await client.tripsByName(query, undefined))
}