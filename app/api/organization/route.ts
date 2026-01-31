import { OrganizationService } from '@/services/organization.service';
import { NextResponse } from 'next/server';
import { RequireAuthOrRedirect } from '@/lib/auth';

export async function GET() {
	await RequireAuthOrRedirect();

	const organization = await OrganizationService.list();
	return NextResponse.json(organization);
}
