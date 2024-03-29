import type {JSX, ReactNode} from "react";
import type {ClientCodeParameter} from "../../../../../client/client";
import {getClient} from "../../../../../client/client";
import Filter from "../../../../../components/filter";
import NavSearchbar from "../../../../../components/nav-searchbar";
import Scroll from "../../../../../components/scroll";

export default function Layout({children, params}: {
    children: ReactNode,
    params: { client: ClientCodeParameter }
}): JSX.Element {
    const client = getClient(params.client)

    return <>
        <NavSearchbar client={client.code} title="Fahrten"/>
        <Filter groups={client.productGroups} modes={client.modes}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}