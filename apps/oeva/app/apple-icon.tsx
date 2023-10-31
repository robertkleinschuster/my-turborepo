/* eslint-disable @next/next/no-img-element -- must be img for vercel/satori */
import { ImageResponse } from 'next/og'
import dkice from "!url-loader?limit=200000!./dkice-stroke.png"

// Route segment config
export const runtime = 'edge'

export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 180, height: 180 },
            id: 'iphone-3x',
        },
        {
            contentType: 'image/png',
            size: { width: 120, height: 120 },
            id: 'iphone-2x',
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
                    backgroundImage: "linear-gradient(#9CD8EB, #5598AD)",
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: "17.544%"
                }}
            >
                <img alt="" src={icon} width="80%"/>
            </div>
        ),
        {...size}
    )
}