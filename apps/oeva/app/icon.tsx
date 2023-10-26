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
                }}
            >
                <img alt="" src={icon} width="80%"/>
            </div>
        ),
        {...size}
    )
}