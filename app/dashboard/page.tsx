import { RequireAuthOrRedirect } from '@/lib/auth';

export default async function DashboardPage() {
	await RequireAuthOrRedirect();
	return <h1>Dashboard Page</h1>;
}
