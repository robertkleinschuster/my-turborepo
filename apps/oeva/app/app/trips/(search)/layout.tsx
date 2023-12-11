import type {JSX, ReactNode} from "react";
import { getClient } from "../../../../client/client";
import Filter from "../../../../components/filter";
import NavSearchbar from "../../../../components/nav-searchbar";
import Scroll from "../../../../components/scroll";

export default function Layout({ children }: {children: ReactNode}): JSX.Element {
    const client = getClient()

    return <>
        <NavSearchbar title="Fahrten" />
        <Filter products={client.profile.products}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}