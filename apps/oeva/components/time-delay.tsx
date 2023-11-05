import { isEqual } from "date-fns";
import Time from "./time";

export default function TimeDelay({ planned, prognosed, label, delay }: { planned: Date | null, prognosed: Date | null, label: string, delay: number | undefined }): React.JSX.Element {
    if (planned && prognosed) {
        if (isEqual(planned, prognosed)) {
            return <span>{label}<Time time={planned} /></span>
        }
        if (delay !== undefined) {

            return <span>{label}<span className="line-through"><Time time={planned} /></span> <span className="font-bold"><Time time={prognosed} /> (+{delay / 60})</span></span>
        }

        return <span>{label}<span className="line-through"><Time time={planned} /></span> <Time time={prognosed} /></span>
    }
    if (prognosed) {
        return <span>{label}<Time time={prognosed} /></span>
    }
    if (planned) {
        return <span>{label}<Time time={planned} /></span>
    }
    return <></>;
}