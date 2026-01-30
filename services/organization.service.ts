import { prisma } from "@/lib/prismaSingleton";

export const OrganizationService = {
    async list(){
        return prisma.organization.findMany();
    },

  
}