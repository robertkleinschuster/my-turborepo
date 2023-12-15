import type {JSX} from "react";
import {notFound} from "next/navigation";
import prisma from "../../../../lib/prisma";
import {JourneyNavbar} from "./journey-navbar";
import {JourneyDetails} from "./journey-details";

export default async function Journey({params}: { params: { id: string } }): Promise<JSX.Element> {
    const journey = await prisma.journey.findUnique({
        include: {
            legs: true,
        },
        where: {
            id: params.id
        }
    })
    if (!journey) {
        notFound()
    }
    return <>
        <JourneyNavbar journey={journey}/>
        <JourneyDetails journey={journey}/>
    </>
}