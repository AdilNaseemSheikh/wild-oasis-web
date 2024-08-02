import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      // this authorized needs to return true of false. True means authorized
      // this authorized will only be called when user hits /account route cuz that is specified in middleware.js

      return !!auth?.user; // !! to convert any value to bolean
    },

    async signIn({ user, account, profile }) {
      // this is a, sort of, middlewar. It runs after the user has clicked on signin button and before he is actually signed in

      try {
        const existingGuest = await getGuest(user.email);
        console.log("existing guest--->", user);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true; // returning true means everything went well
      } catch (error) {
        return false; // something went wrong so the user was not logged in
      }
    },

    async session({ session, user }) {
      // the session we get from calling auth() do not have the id of user.
      // Here we can attach that id to the session that auth function returns.
      // It is called after signin callback written above, and everytime before auth function is called.
      // auth() will return whetever we return from this callback and the session it receives is the
      // exact same session that auth() returns. So, we return {...session, ourCustomProperty: it's value} so that

      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;
      // this enhanced session will be return from auth() now
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
