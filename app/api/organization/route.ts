import { OrganizationService } from "@/services/organization.service"; 
import { NextResponse } from "next/server";
import { requireAuthOrRedirect } from "@/lib/auth";

export async function GET() {
    await requireAuthOrRedirect();

    const organization = await OrganizationService.list();
    return NextResponse.json(organization);
}
