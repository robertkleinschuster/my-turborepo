"use server"

import type {Journey, JourneyLeg} from "../../../lib/prisma";
import prisma from "../../../lib/prisma";

export async function create(appId: string, name: string): Promise<Journey> {
    return prisma.journey.create({
        data: {
            appId,
            name,
        }
    });
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

export async function addLeg(journeyId: string, name: string): Promise<JourneyLeg> {
    return prisma.journeyLeg.create({
        data: {
            journeyId,
            name,
        }
    })
}