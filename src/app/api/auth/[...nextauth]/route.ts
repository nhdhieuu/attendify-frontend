import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
        // ...add more providers here
    ],
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST};
