"use client"

import {
    Breadcrumbs as KonstaBreadcrumbs,
    BreadcrumbsCollapsed,
    BreadcrumbsItem,
    BreadcrumbsSeparator,
    Icon,
    Popover,
    Toolbar
} from "konsta/react"
import type {JSX} from "react";
import {useState} from "react";
import {House} from "framework7-icons/react"
import dynamic from "next/dynamic";
import {useBreadcrumbs} from "../hooks/use-breadcrumbs";
import Scroll from "./scroll";
import {HistoryList} from "./history-list";

const Breadcrumbs = dynamic(() => Promise.resolve((): JSX.Element => {
    const [popoverOpened, setPopoverOpened] = useState(false);

    const items = useBreadcrumbs();
    if (!items.length) {
        return <></>
    }

    return <Toolbar className="!pb-0">
        <KonstaBreadcrumbs>
            <BreadcrumbsItem>
                <Icon ios={<House/>}/>
            </BreadcrumbsItem>
            {items.length && items.length > 1 ?
                <>
                    <BreadcrumbsSeparator/>
                    <BreadcrumbsCollapsed
                        className="breadcrumbs"
                        onClick={() => {
                            setPopoverOpened(true)
                        }}
                    />
                </>
                : null}

            <BreadcrumbsSeparator/>
            {items.length ?
                <BreadcrumbsItem active>
                    {items[items.length - 1].title}
                </BreadcrumbsItem>
                : null}

        </KonstaBreadcrumbs>
        <Popover
            className="breadcrumbs-popover"
            onBackdropClick={() => {
                setPopoverOpened(false)
            }}
            opened={popoverOpened}
            target=".breadcrumbs"
        >
            <Scroll className="max-h-[50vh]">
                <HistoryList breadcrumbs items={items} nested onClick={() => {
                    setPopoverOpened(false)
                }}/>
            </Scroll>
        </Popover>
    </Toolbar>
}), {ssr: false})

export {Breadcrumbs}