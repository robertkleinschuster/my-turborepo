import {lightFormat} from "date-fns";
import type {HistoryItem} from "../store/history";

export function historyToText(items: HistoryItem[]): string {
    const lines: string[] = []

    if (items.length > 1) {
        const heading = historyHeading(items);
        lines.push(heading)
        lines.push('')
    }

    for (const item of items) {
        lines.push(`• ${title(item)}`)
        lines.push(info(item))
    }

    return lines.join("\n")
}


export function historyHeading(items: HistoryItem[]): string {
    return `Fahrt von ${title(items[0])} nach ${title(items[items.length - 1])}`
}

function info(item: HistoryItem): string {
    let result = ''
    if (item.previous?.type === 'trip' || item.previous?.type === 'station') {
        if (item.info?.when) {
            const when = new Date(item.info.when as string)
            const time = lightFormat(when, 'HH:mm dd.MM.yyyy')
            result += `  ${item.type === 'trip' ? "Ab" : "An"}. ${time} ${title(item)}`
        }
    }

    if (item.previous?.title && item.next?.title && result) {
        if (item.type === 'trip') {
            result += '\n  ⧖'
        } else {
            result += '\n  ➔'
        }
    }

    if (item.next?.type === 'trip' || item.next?.type === 'station') {
        if (item.next.info?.when) {
            const when = new Date(item.next.info.when as string)
            const time = lightFormat(when, 'HH:mm dd.MM.yyyy')
            result += `  ${item.type === 'trip' ? "An" : "Ab"}. ${time} ${title(item.next)}`
        }
    }

    return result
}

function title(item: HistoryItem): string {
    if (item.type === 'trip' && typeof item.info?.line === 'string') {
        if (typeof item.info.direction === 'string') {
            return `${item.info.line} ${item.info.direction}`
        } else if (typeof item.info.provenance === 'string') {
            return `${item.info.line} von ${item.info.provenance}`
        } else if (typeof item.info.destination === 'string') {
            return `${item.info.line} ${item.info.destination}`
        }
    }

    return item.title
}
