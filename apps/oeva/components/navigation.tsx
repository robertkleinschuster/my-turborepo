"use client"

import Link from 'next/link';
import {Tabbar, TabbarLink} from 'konsta/react';
import React from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import {useJourneyPlanner} from "../store/journey-planner";
import useStore from "../hooks/use-store";

export default function Navigation(): React.JSX.Element {
    const segment = useSelectedLayoutSegment()
    const planning = useStore(useJourneyPlanner, state => state.journey)
    return <Tabbar className='relative'>
        {/* <TabbarLink active={pathname === '/app/favorites'} label="Favoriten" linkProps={{ href: '/favorites', component: Link }} />*/}
        <TabbarLink active={segment === 'home'} label="Home"
                    linkProps={{href: '/app/home', component: Link}}/>
        {planning ? <TabbarLink active={segment === 'journeys'} label="Reiseplanung"
                                linkProps={{href: `/app/journeys/${planning.id}`, component: Link}}/> : null}
        <TabbarLink active={segment === 'trips'} label="Fahrten"
                    linkProps={{href: '/app/trips', component: Link}}/>
        <TabbarLink active={segment === 'stations'} label="Stationen"
                    linkProps={{href: '/app/stations', component: Link}}/>
    </Tabbar>
}