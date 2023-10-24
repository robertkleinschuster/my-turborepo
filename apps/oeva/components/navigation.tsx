"use client"

import Link from 'next/link';
import { Tabbar, TabbarLink } from 'konsta/react';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation(): React.JSX.Element {
    const pathname = usePathname()
    return <Tabbar className='relative'>
        <TabbarLink active={pathname === '/favorites'} label="Favoriten" linkProps={{ href: '/favorites', component: Link }} />
        <TabbarLink active={pathname === '/trains'} label="Züge" linkProps={{ href: '/trains', component: Link }} />
        <TabbarLink active={pathname === '/stations'} label="Stations" linkProps={{ href: '/stations', component: Link }} />
    </Tabbar>

}