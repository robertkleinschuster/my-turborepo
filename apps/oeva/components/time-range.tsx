import Time from "./time";

export default function TimeRange({from, to}: {from: Date|undefined|null, to: Date|undefined|null}) {
    if (from && to && from.getTime() !== to.getTime()) {
        const sameDate = from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()
        return <span><Time time={from}/> - <Time time={to} hideDate={sameDate}/></span>
    }

    return <Time time={from ?? to}/>
}