import prisma from "@services/prisma"
import { DataAPIPayload } from "@services/data/types";

export const getPlatforms = ({ payload, session }: DataAPIPayload) => {
    return prisma.platform.findMany();
}
