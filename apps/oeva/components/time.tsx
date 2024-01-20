import {lightFormat} from "date-fns";

export default function Time({time, hideDate}: { time: Date | undefined | null, hideDate?: boolean }) {
    if (!time) {
        return <></>
    }
    const now = new Date();
    let format = 'HH:mm dd.MM.yyyy'
    if (hideDate || time.getDate() === now.getDate() && time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()) {
        format = 'HH:mm'
    }
    return <span className="whitespace-nowrap">{lightFormat(time, format)}</span>;
}