import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { ExtendedUserType } from "./types";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: any }): boolean {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }): Promise<boolean> {
      try {
        if (user.email && user.name) {
          const existingGuest = await getGuest(user.email);
          if (!existingGuest)
            await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }): Promise<Session> {
      if (session.user) {
        const guest = await getGuest(session.user.email);
        (session.user as ExtendedUserType).guestId = guest.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
export const {
  signIn,
  signOut,
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);
