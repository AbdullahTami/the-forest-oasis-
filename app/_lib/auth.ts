import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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
    authorized({ auth }: { auth: any }) {
      return !!auth?.user;
    },
    // async signIn({ user, account, profile }) {
    async signIn({ user }: any) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    // async session({ session, user }) {},
    async session({ session }: any) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
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
