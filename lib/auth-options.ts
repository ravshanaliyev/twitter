import { AuthOptions } from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from './mongoose';
import User from '@/database/user.model';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }: any) {
            await connectToDatabase()
            const isExistUser = await User.findOne({ email: session.user.email })
            if (!isExistUser) {
                const newUser = await User.create({ email: session.user.email, name: session.user.name, profileImage: session.user.image })
                session.currentuser = newUser
            }
            session.currentuser = isExistUser
            return session
        }
    },
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET! },
    secret: process.env.NEXTAUTH_SECRET!,
}