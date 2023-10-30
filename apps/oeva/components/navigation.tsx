"use client"

import Link from 'next/link';
import { Tabbar, TabbarLink } from 'konsta/react';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation(): React.JSX.Element {
    const pathname = usePathname()
    return <Tabbar className='relative'>
        {/* <TabbarLink active={pathname === '/app/favorites'} label="Favoriten" linkProps={{ href: '/favorites', component: Link }} />*/}
        <TabbarLink active={pathname.startsWith('/app/trips')} label="Fahrten" linkProps={{ href: '/app/trips', component: Link }} />
        <TabbarLink active={pathname.startsWith('/app/stations')} label="Stationen" linkProps={{ href: '/app/stations', component: Link }} />
    </Tabbar>

}