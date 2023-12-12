import {JSX, ReactNode} from "react";
import Scroll from "../../../components/scroll";
import {HistoryNavbar} from "./history-navbar";

export default function Layout({children}: {children: ReactNode}): JSX.Element
{
    return <>
        <HistoryNavbar></HistoryNavbar>
        <Scroll>
            {children}
        </Scroll>
    </>
}