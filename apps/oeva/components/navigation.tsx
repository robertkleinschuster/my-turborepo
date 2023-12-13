"use client"

import Link from 'next/link';
import {Tabbar, TabbarLink} from 'konsta/react';
import React from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';

export default function Navigation(): React.JSX.Element {
    const segment = useSelectedLayoutSegment()

    return <Tabbar className='relative'>
        {/* <TabbarLink active={pathname === '/app/favorites'} label="Favoriten" linkProps={{ href: '/favorites', component: Link }} />*/}
        <TabbarLink active={segment === 'home'} label="Home"
                    linkProps={{href: '/app/home', component: Link}}/>
        <TabbarLink active={segment === 'trips'} label="Fahrten"
                    linkProps={{href: '/app/trips', component: Link}}/>
        <TabbarLink active={segment === 'stations'} label="Stationen"
                    linkProps={{href: '/app/stations', component: Link}}/>
    </Tabbar>
}