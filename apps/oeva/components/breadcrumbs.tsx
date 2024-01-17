"use client"

import {
    Breadcrumbs as KonstaBreadcrumbs,
    BreadcrumbsCollapsed,
    BreadcrumbsItem,
    BreadcrumbsSeparator,
    Icon, Link,
    Popover,
    Toolbar
} from "konsta/react"
import type {JSX} from "react";
import { useEffect, useState} from "react";
import {House} from "framework7-icons/react"
import dynamic from "next/dynamic";
import {useBreadcrumbs} from "../hooks/use-breadcrumbs";
import {useNavigation, usePrefetch} from "../hooks/use-navigation";
import Scroll from "./scroll";
import {HistoryList} from "./history-list";

const Breadcrumbs = dynamic(() => Promise.resolve((): JSX.Element => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const nav = useNavigation()
    const prefetch = usePrefetch()
    const items = useBreadcrumbs();


    useEffect(() => {
        prefetch.home()
        for (const item of items) {
            prefetch.push_breadcrumb(item)
        }
    }, [prefetch, items]);

    return <Toolbar>
        <KonstaBreadcrumbs>
            <BreadcrumbsItem>
                <Link onClick={() => {
                    nav.home();
                }}>
                    <Icon ios={<House/>}/>
                </Link>
            </BreadcrumbsItem>

            {items.length > 1 ?
                <>
                    <BreadcrumbsSeparator/>

                    <BreadcrumbsItem>
                        <Link onClick={() => {
                            nav.push_breadcrumb(items[0]);
                        }}>
                            <span className="truncate">{items[0].title}</span>
                        </Link>
                    </BreadcrumbsItem>

                    {items.length > 2 ?
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

                </>
                : null}

            {items.length ?
                <>
                    <BreadcrumbsSeparator/>
                    <BreadcrumbsItem active>
                        <span className="truncate">{items[items.length - 1].title}</span>
                    </BreadcrumbsItem>
                </>
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
                <HistoryList breadcrumbs details items={items.length > 1 ? items.slice(1, items.length - 1) : []} nested
                             onClick={() => {
                                 setPopoverOpened(false)
                             }}
                />
            </Scroll>
        </Popover>
    </Toolbar>
}), {ssr: false})

export {Breadcrumbs}