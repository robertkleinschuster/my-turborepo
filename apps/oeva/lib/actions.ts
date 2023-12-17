"use server"

import type {Journey, JourneyLeg, WithLegs} from "./prisma";
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
        }
    })
}

export async function loadJourney(id: string): Promise<Journey<WithLegs>> {
    return prisma.journey.findUniqueOrThrow({
        include: {
            legs: true,
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

export async function createLeg(journeyId: string, name: string): Promise<JourneyLeg> {
    return prisma.journeyLeg.create({
        data: {
            journeyId,
            name,
        }
    })
}