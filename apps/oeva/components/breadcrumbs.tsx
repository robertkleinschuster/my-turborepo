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
import {useState} from "react";
import {House} from "framework7-icons/react"
import dynamic from "next/dynamic";
import {useBreadcrumbs} from "../hooks/use-breadcrumbs";
import {useNavigation} from "../hooks/use-navigation";
import Scroll from "./scroll";
import {HistoryList} from "./history-list";
import {HistoryItemTitle} from "./history-item-title";

const Breadcrumbs = dynamic(() => Promise.resolve((): JSX.Element => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const nav = useNavigation()
    const items = useBreadcrumbs();

    return <Toolbar>
        <KonstaBreadcrumbs>
            <BreadcrumbsItem className="!overflow-visible">
                <Link onClick={() => {
                    nav.home();
                }}>
                    <Icon ios={<House/>}/>
                </Link>
            </BreadcrumbsItem>

            {items.length > 1 ?
                <>
                    <BreadcrumbsSeparator/>

                    <BreadcrumbsItem className="!overflow-visible">
                        <Link onClick={() => {
                            nav.push_breadcrumb(items[0]);
                        }}>
                            <HistoryItemTitle item={items[0]}/>
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
                    <BreadcrumbsItem active className="!overflow-auto no-scrollbar">
                        <HistoryItemTitle item={items[items.length - 1]}/>
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
            style={{display: popoverOpened ? 'block' : 'none'}}
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