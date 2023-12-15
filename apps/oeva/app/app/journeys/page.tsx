import type {JSX} from "react";
import prisma from "../../../lib/prisma";
import {JourneyList} from "./journey-list";

export default async function Journey({searchParams}: {searchParams: {appId: string|undefined}}): Promise<JSX.Element> {
    const journeys = await prisma.journey.findMany({
        include: {legs: true},
        where: {
            appId: searchParams.appId
        }
    })

    return <JourneyList journeys={journeys}/>
}