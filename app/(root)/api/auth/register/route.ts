import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const {searchParams} = new URL(request.url)
        const step = searchParams.get('step')
        if(step === "1"){
            const {email} = await request.json()
            const isExistUser = await User.findOne({email}) 
            if(isExistUser){
                return NextResponse.json({ error: "Email already exists" }, { status: 400 })
            }
            return NextResponse.json({success: true})
        }else if(step === "2"){
            const {username, email, password, name} = await request.json()
            const isExistUserName = await User.findOne({username})
            if(isExistUserName){
                return NextResponse.json({ error: "Username already exists" }, { status: 400 })
            }
            const hashedPassword = await hash(password, 10)
            const user = await User.create({username, email, password: hashedPassword, name})
            return NextResponse.json({success: true, user})
        }
        const { username, email, password, name } = await request.json()
        User.create({ username, email, password, name })
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 400 })
    }
}