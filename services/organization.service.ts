import { Prisma } from '@/lib/prismaSingleton';

export const OrganizationService = {
	async list() {
		return Prisma.organization.findMany();
	},
};
