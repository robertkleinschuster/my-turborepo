/* eslint-disable @next/next/no-img-element -- must be img for vercel/satori */
import { ImageResponse } from 'next/server'
import dkice from "!url-loader?limit=200000!./dkice-stroke.png"

// Route segment config
export const runtime = 'edge'

export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 48, height: 48 },
            id: 'small',
        },
        {
            contentType: 'image/png',
            size: { width: 72, height: 72 },
            id: 'medium',
        },
        {
            contentType: 'image/png',
            size: { width: 192, height: 192 },
            id: '192x192',
        },
        {
            contentType: 'image/png',
            size: { width: 512, height: 512 },
            id: '512x512',
        },
    ]
}

export const contentType = 'image/png'

const icon = dkice as unknown as string

export default function Icon({ id }): ImageResponse {

    let size = {};
    for (const image of generateImageMetadata()) {
        if (image.id === id) {
            size = image.size
        }
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img alt="" src={icon} style={{filter: "drop-shadow(3px 3px 3px #222)"}}/>
            </div>
        ),
        { ...size }
    )
}