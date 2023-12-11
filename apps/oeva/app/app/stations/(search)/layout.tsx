import React from "react";
import NavSearchbar from "../../../../components/nav-searchbar";
import Scroll from "../../../../components/scroll";

export default function Layout({children}: {children: React.ReactNode}): React.JSX.Element {
    return <>
        <NavSearchbar title="Stationen"/>
        <Scroll>
            {children}
        </Scroll>
    </>
}