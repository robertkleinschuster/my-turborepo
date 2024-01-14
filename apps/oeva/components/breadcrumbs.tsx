"use client"

import {
    Breadcrumbs as KonstaBreadcrumbs,
    BreadcrumbsCollapsed,
    BreadcrumbsItem,
    BreadcrumbsSeparator, Icon,
    List, ListItem, Popover, Toolbar
} from "konsta/react"
import type {JSX} from "react";
import {useState} from "react";
import {House} from "framework7-icons/react"
import {useSearchParams} from "next/navigation";
import {useHistory} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import Scroll from "./scroll";
import Time from "./time";

export function Breadcrumbs(): JSX.Element {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const filterBreadcrumbs = useHistory(h => h.filterBreadcrumbs)
    const navigation = useNavigation()
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
                <List nested>
                    {items.map(item =>
                        <ListItem
                            header={<Time time={item.when ? new Date(item.when) : null}/>}
                            key={item.sequence}
                            link
                            onClick={() => {
                                setPopoverOpened(false)
                                navigation.history(item)
                            }}
                            title={item.title}
                        />
                    )}
                </List>
            </Scroll>
        </Popover>
    </Toolbar>
}