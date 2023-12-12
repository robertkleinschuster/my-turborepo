"use client"

import {Block, Button, Navbar} from 'konsta/react';
import type {JSX} from "react";
import {useRouter} from "next/navigation";

export default function Home(): JSX.Element {
    const router = useRouter()
    return (
        <>
            <Navbar title="OeVA"/>
            <Block className="flex justify-center items-center">
                <Button className="w-auto" onClick={() => {
                    router.replace('/app/stations')
                }} large>Start</Button>
            </Block>
        </>
    );
}
