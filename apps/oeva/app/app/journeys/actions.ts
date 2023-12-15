"use server"

import type {Journey, JourneyLeg} from "../../../lib/prisma";
import prisma from "../../../lib/prisma";

export async function create(appId: string): Promise<Journey> {
    return prisma.journey.create({
        data: {
            appId,
            name: 'Test',
        }
    });
}

export async function addLeg(journeyId: string): Promise<JourneyLeg> {
    return prisma.journeyLeg.create({
        data: {
            journeyId,
            name: 'Test leg',
        }
    })
}