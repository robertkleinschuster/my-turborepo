export const sizes = new Map([
    ['iphone-14-pro-max', {width: 1290, height: 2796}],
    ['iphone-14-pro', {width: 1179, height: 2556}],
    ['iphone-12-pro-max', {width: 1284, height: 2778}],
    ['iphone-12', {width: 1170, height: 2532}],
    ['iphone-11-pro-max', {width: 1242, height: 2688}],
    ['iphone-11', {width: 828, height: 1792}],
    ['iphone-x', {width: 1125, height: 2436}],
    ['iphone-6-plus', {width: 1242, height: 2208}],
    ['iphone-6', {width: 750, height: 1334}],
    ['iphone-5', {width: 640, height: 1136}],
])

export function generateStartupImages(): { url: string, media: string }[] {
    const result: { url: string, media: string }[] = [];

    for (const [key, size] of sizes) {
        result.push({
            url: `splashscreen/${key}`,
            media: `screen and (device-width: ${size.width / 2}px) and (device-height: ${size.height / 2}px) and (orientation: portrait)`
        })
    }

    return result
}
