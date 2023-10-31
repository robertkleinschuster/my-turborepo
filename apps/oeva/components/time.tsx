export default function Time({time, hideDate}: {time: Date|undefined|null, hideDate?: boolean}) {
    if (!time) {
        return <></>
    }
    const now = new Date();
    if (time.getDate() !== now.getDate() || time.getMonth() !== now.getMonth() || time.getFullYear() !== now.getFullYear()) {
        return <span className="whitespace-nowrap">{time.toLocaleString(['de'], { timeStyle: 'short', dateStyle: hideDate ? undefined : 'short'})}</span>;
    }

    return <span className="whitespace-nowrap">{time.toLocaleTimeString(['de'], { timeStyle: 'short'})}</span>;
}