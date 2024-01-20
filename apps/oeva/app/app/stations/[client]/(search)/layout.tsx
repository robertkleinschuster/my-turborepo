import React from "react";
import NavSearchbar from "../../../../../components/nav-searchbar";
import Scroll from "../../../../../components/scroll";
import type {ClientCodeParameter} from "../../../../../client/client-code";
import {getClient} from "../../../../../client/client";

export default function Layout({children, params}: {children: React.ReactNode, params: {client: ClientCodeParameter}}): React.JSX.Element {
    const client = getClient(params.client)
    return <>
        <NavSearchbar client={client.code} title="Stationen"/>
        <Scroll>
            {children}
        </Scroll>
    </>
}