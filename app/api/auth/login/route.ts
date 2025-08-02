import { User } from "@/models";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongoDB";
import { createAccessToken, createRefreshToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        const { email, password } = await req.json()

        if (!email) return Response.json({ success: false, message: 'Please provide email field', field: 'email' }, { status: 400 })
        if (!password) return Response.json({ success: false, message: 'Please provide password field', field: 'password' }, { status: 400 })
        const currentUser = await User.findOne({ email })
        if (!currentUser) return Response.json({ success: false, message: "Your email address doesn't exist", field: 'email' }, { status: 404 });
        if (!currentUser.isVerified) {
            const user = await User.findByIdAndDelete({ _id: currentUser._id })
            console.log({ user })
            return Response.json({ success: false, message: "User doesn't exist" }, { status: 404 });
        }

        const isMatched = await bcrypt.compare(password, currentUser.password)
        if (!isMatched) return Response.json({ success: false, message: "Password doesn't match", field: 'password' }, { status: 400 });

        const accessToken = createAccessToken({ email, _id: currentUser._id, role: currentUser.role });
        const refreshToken = createRefreshToken({ _id: currentUser._id });

        (await cookies()).set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // path: '/api/auth/refreshtoken',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        (await cookies()).set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // path: '/',
            maxAge: 60 * 15,
        });

        const { _id, name, role, imageUrl } = currentUser
        const user = { _id, name, email, role, imageUrl }
        return Response.json({ success: true, message: 'Login successfully!', accessToken, user }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: 'Somthing went wrong!', error }, { status: 500 })
    }
}