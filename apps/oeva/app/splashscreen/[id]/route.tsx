/* eslint-disable @next/next/no-img-element -- must be img for vercel/satori */
import { ImageResponse } from 'next/server'
import dkice from "!url-loader?limit=200000!../../dkice-stroke.png"

// Route segment config
export const runtime = 'edge'

const sizes = new Map([
    ['iphone-12-pro-max', { width: 428, height: 926 }]
])

const icon = dkice as unknown as string

export function GET(request, context: {params: {id: string}}): ImageResponse {

    const size = sizes.get(context.params.id);
    if (!size) {
        return new Response(null, {status: 404})
    }

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundImage: "linear-gradient(#9CD8EB, #5598AD)",
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
            >
                <img alt="" src={icon} width="60%" />
            </div>
        ),
        {...size},
    )
}