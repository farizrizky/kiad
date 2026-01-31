import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma } from '@/lib/prismaSingleton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export const Auth: NextAuthOptions = {
	adapter: PrismaAdapter(Prisma),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(creds) {
				const email = creds?.email?.toString().trim();
				const password = creds?.password?.toString();
				if (!email || !password) return null;

				const user = await Prisma.user.findUnique({ where: { email } });
				if (!user || !user.passwordHash || !user.isActive) return null;

				const ok = await bcrypt.compare(password, user.passwordHash);
				if (!ok) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role as any,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = (user as any).id;
				token.role = (user as any).role;
			}
			return token;
		},
		async session({ session, token }) {
			(session.user as any).id = token.id;
			(session.user as any).role = token.role;
			return session;
		},
	},
};

type AppRole = 'SUPERADMIN' | 'ADMIN' | 'USER';

export async function RequireAuthOrRedirect(to = '/login') {
	const session = await getServerSession(Auth);
	if (!session?.user) redirect(to);
	return session;
}

export async function RequireRoleOrRedirect(roles: AppRole[], to = '/403') {
	const session = await RequireAuthOrRedirect('/login');
	const role = (session.user as any).role as AppRole;
	if (!roles.includes(role)) redirect(to);
	return session;
}
