"use client"

import {
    Breadcrumbs as KonstaBreadcrumbs,
    BreadcrumbsCollapsed,
    BreadcrumbsItem,
    BreadcrumbsSeparator,
    Link, List, ListItem, Popover, Toolbar
} from "konsta/react"
import {useState} from "react";
import {useHistory} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import useStore from "../hooks/use-store";
import Scroll from "./scroll";
import Time from "./time";

export function Breadcrumbs() {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const items = useStore(useHistory, h => h.breadcrumbs)
    const navigation = useNavigation()

    return <Toolbar>
        <KonstaBreadcrumbs>
            <BreadcrumbsItem>
                <Link onClick={() => {
                    navigation.home()
                }}>Home</Link>
            </BreadcrumbsItem>
            {items?.length && items.length > 1 ?
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
            {items?.length ?
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
            <Scroll className="max-h-[90vh]">
                <List nested>
                    {items?.map(item =>
                        <ListItem
                            header={<Time time={item.when ? new Date(item.when) : null}/>}
                            key={`${item.id}-${item.added}`}
                            link
                            onClick={() => {
                                setPopoverOpened(false)
                                navigation.breadcrumb(item)
                            }}
                            title={item.title}
                        />
                    )}
                </List>
            </Scroll>

        </Popover>
    </Toolbar>
}