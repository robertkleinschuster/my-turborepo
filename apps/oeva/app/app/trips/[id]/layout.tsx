import type {JSX, ReactNode} from "react";
import Scroll from "../../../../components/scroll"
import TripNavbarData from "./navbar-data"


export default function Layout({children, params}: { children: ReactNode, params: { id: string } }): JSX.Element {
    return <>
        <TripNavbarData id={params.id}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}