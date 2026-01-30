import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaSingleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email?.toString().trim();
        const password = creds?.password?.toString();
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash || !user.isActive) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role as any };
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

type AppRole = "SUPERADMIN" | "ADMIN" | "USER";

export async function requireAuthOrRedirect(to = "/login") {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(to);
  return session;
}

export async function requireRoleOrRedirect(roles: AppRole[], to = "/403") {
  const session = await requireAuthOrRedirect("/login");
  const role = (session.user as any).role as AppRole;
  if (!roles.includes(role)) redirect(to);
  return session;
}