import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import {compare, hash} from 'bcrypt'
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const { email, password } = await request.json()
        const isExistUser = await User.findOne({email})
        if(!isExistUser){
            return NextResponse.json({ error: "Email does not exist" }, { status: 400 })
        }
        const isPasswordValid = await compare(password, isExistUser.password)
        if(!isPasswordValid){
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        return NextResponse.json({success: true, user: isExistUser})
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 400 })
    }
}