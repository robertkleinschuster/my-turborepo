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
import {useSearchParams} from "next/navigation";
import {useHistory} from "../store/history";
import Scroll from "./scroll";
import {HistoryList} from "./history-list";

export function Breadcrumbs(): JSX.Element {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const filterBreadcrumbs = useHistory(h => h.filterBreadcrumbs)
    const params = useSearchParams()
    const historySequence = params.get('sequence')
    const historyRoot = params.get('root')

    if (historySequence === '' || historySequence === null || historyRoot === '' || historyRoot === null) {
        return <></>
    }

    const items = filterBreadcrumbs(Number.parseInt(historySequence), Number.parseInt(historyRoot));

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
                <HistoryList items={items} nested onClick={() => {
                    setPopoverOpened(false)
                }}/>
            </Scroll>
        </Popover>
    </Toolbar>
}