"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    Navbar,
    Searchbar,
    List,
    ListItem,
    Block,
} from 'konsta/react';
import Scroll from '../../../components/scroll';

const queryChanged = Symbol('queryChanged');

export default function Stations(): React.JSX.Element {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState<{ name: string }[]>([])
    const previousController = useRef<AbortController>();

    const handleSearch = (e: Event) => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };
    const handleClear = () => {
        setSearchQuery('');
    };

    useEffect(() => {
        if (previousController.current) {
            previousController.current.abort(queryChanged);
        }
        const controller = new AbortController()
        const signal = controller.signal
        previousController.current = controller;

        if (searchQuery) {
            fetch(`/app/stations/search?query=${searchQuery}`, { signal })
                .then(r => r.json())
                .then(setItems)
                .catch(e => {
                    if (signal.reason !== queryChanged) {
                        throw e
                    }
                })
        } else {
            setItems([])
        }
    }, [searchQuery])

    return (
        <>
            <Navbar
                subnavbar={
                    <Searchbar
                        disableButton
                        disableButtonText="Cancel"
                        onClear={handleClear}
                        onInput={handleSearch}
                        value={searchQuery}
                    />
                }
                title="Stations"

            />
            <Scroll>
                {items.length === 0 ? (
                    <Block className="text-center">Nothing found</Block>
                ) : (
                    <List inset strong>
                        {items.map(item => <ListItem key={item.name} title={item.name} />)}
                    </List>
                )}
            </Scroll>
        </>
    );
}