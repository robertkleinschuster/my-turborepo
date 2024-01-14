import {format} from "date-fns";

export function formatInputDatetimeLocal(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm")
}

export function formatInputDate(date: Date): string {
    return format(date, "yyyy-MM-dd")
}