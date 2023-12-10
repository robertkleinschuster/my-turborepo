import {ImageResponse} from 'next/og'
import {dkice} from "./dkice";
import {sizes} from "./sizes";

// Route segment config
export const runtime = 'edge'

export function GET(request, context: { params: { id: string } }): ImageResponse {
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
                    gap: "3rem",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
            >
                {dkice({ratio: size.width * 0.6 / 720})}
                <h1 style={{
                    backgroundColor: "#00000050",
                    borderRadius: "1rem",
                    padding: "1rem 2.5rem",
                }}>OeVA</h1>
            </div>
        ),
        {...size},
    )
}