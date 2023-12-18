"use server"

import type {Journey, JourneyLeg, JourneyLegCreate, WithLegs} from "./prisma";
import prisma from "./prisma";

export async function createJourney(appId: string, name: string): Promise<Journey> {
    return prisma.journey.create({
        data: {
            appId,
            name,
        }
    });
}

export async function loadJourneys(appId: string): Promise<Journey[]> {
    return prisma.journey.findMany({
        where: {
            appId
        },
        orderBy: [
            {
                createdAt: 'desc'
            },
        ]
    })
}

export async function loadJourney(id: string): Promise<Journey<WithLegs>> {
    return prisma.journey.findUniqueOrThrow({
        include: {
            legs: {
                orderBy: [
                    {
                        timeStart: 'asc',
                    },
                    {
                        createdAt: 'asc'
                    },
                ]
            },
        },
        where: {
            id
        }
    })
}

export async function loadLegs(journeyId: string): Promise<JourneyLeg[]> {
    return prisma.journeyLeg.findMany({
        where: {
            journeyId
        }
    })
}

export async function deleteJourney(journeyIds: string[]): Promise<void> {
    await prisma.journey.deleteMany({
        where: {
            id: {
                in: journeyIds
            }
        }
    })
}


export async function deleteLeg(legIds: string[]): Promise<void> {
    await prisma.journeyLeg.deleteMany({
        where: {
            id: {
                in: legIds
            }
        }
    })
}

export async function createLeg(leg: JourneyLegCreate): Promise<JourneyLeg> {
    return prisma.journeyLeg.create({
        data: leg
    })
}