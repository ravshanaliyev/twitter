"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"

export async function getUserById(userId: string) {
    try {
        await connectToDatabase()
        const user = await User.findById(userId)
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
        }
        return filteredUser
    } catch (error) {
        throw error
    }
}