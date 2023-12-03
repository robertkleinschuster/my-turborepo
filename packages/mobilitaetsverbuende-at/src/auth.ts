import {z} from "zod";

const TOKEN_ENDPOINT = "https://user.mobilitaetsverbuende.at/auth/realms/dbp-public/protocol/openid-connect/token"

export async function authorize(username: string, password: string): Promise<Token> {
    const body = new URLSearchParams();
    body.set('client_id', 'dbp-public-ui');
    body.set('grant_type', 'password');
    body.set('scope', 'openid');
    body.set('username', username);
    body.set('password', password);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    return Token.parse(await response.json())
}


const Token = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    refresh_expires_in: z.number(),
    refresh_token: z.string(),
    token_type: z.string(),
    id_token: z.string(),
    'not-before-policy': z.number(),
    session_state: z.string(),
    scope: z.string()
})

export type Token = z.infer<typeof Token>