import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
