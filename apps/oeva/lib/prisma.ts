import type { Prisma} from '@prisma/client';
import {PrismaClient} from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports -- suppress
let prisma: PrismaClient;

// eslint-disable-next-line turbo/no-undeclared-env-vars -- suppress
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma as PrismaClient;
}

export default prisma;

export type Journey<T extends Prisma.JourneyDefaultArgs = Prisma.JourneyDefaultArgs> = Prisma.JourneyGetPayload<T>
export type JourneyLeg<T extends Prisma.JourneyLegDefaultArgs = Prisma.JourneyLegDefaultArgs> = Prisma.JourneyLegGetPayload<T>

// eslint-disable-next-line -- suppress
export type WithLegs = {
    include: {
        legs: true
    }
}