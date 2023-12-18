import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const { username, email, password, name } = await request.json()
        User.create({ username, email, password, name })
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 400 })
    }
}