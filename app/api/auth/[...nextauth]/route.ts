import NextAuth from 'next-auth';
import { Auth } from '@/lib/auth';

const handler = NextAuth(Auth);

export { handler as GET, handler as POST };
