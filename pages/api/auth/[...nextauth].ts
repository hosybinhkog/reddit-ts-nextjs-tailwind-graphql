import NextAuth from "next-auth/next";
import RedditProvider from "next-auth/providers/reddit";

export default NextAuth({
  providers: [
    //@ts-ignore
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
  ],
});
