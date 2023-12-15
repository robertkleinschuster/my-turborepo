import type {JSX} from "react";
import {notFound} from "next/navigation";
import prisma from "../../../../lib/prisma";
import {JourneyList} from "./journey-list";

export default async function Journey({searchParams}: {
    searchParams: { appId: string | undefined }
}): Promise<JSX.Element> {
    if (!searchParams.appId) {
        notFound()
    }

    const journeys = await prisma.journey.findMany({
        include: {legs: true},
        where: {
            appId: decodeURIComponent(searchParams.appId)
        }
    })

    return <JourneyList journeys={journeys}/>
}