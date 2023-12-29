"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth-options"

export async function getUserById(userId: string) {
    try {
        await connectToDatabase()
        const user = await User.findById(userId)
        const { currentuser }: any = await getServerSession(authOptions);
        const filteredUser = {
            _id: user._id,
            name: user.name,
            username: user.username,
            profileImage: user.profileImage,
            coverImage: user.coverImage,
            email: user.email,
            bio: user.bio,
            location: user.location,
            createdAt: user.createdAt,
            followers: user.followers?.length || 0,
            following: user.following?.length || 0,
            isFollowing: user.followers?.includes(currentuser?._id) || false
        }
        return filteredUser
    } catch (error) {
        throw error
    }
}