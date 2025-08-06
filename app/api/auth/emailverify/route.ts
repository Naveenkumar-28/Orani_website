import { connectToDatabase } from "@/lib/mongoDB";
import { createAccessToken, createRefreshToken } from "@/lib/tokens";
import { User } from "@/models";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        connectToDatabase()
        const { email: emailAddress, code } = await req.json()
        if (!code) return Response.json({ success: false, message: 'Please fill email verification code' }, { status: 400 })
        if (!emailAddress) return Response.json({ success: false, message: 'Please fill email field' }, { status: 400 })
        const currentUser = await User.findOne({ email: emailAddress })
        if (!currentUser) return Response.json({ success: false, message: "Your email address not found" }, { status: 404 });
        if (currentUser.isVerified && currentUser.verificationCode == null) return Response.json({ success: false, message: "Your email already verified" }, { status: 400 });
        if (currentUser.verificationCode != code) return Response.json({ success: false, message: "Your email verification code incorrect" }, { status: 400 })

        currentUser.verificationCode = null
        currentUser.isVerified = true
        await currentUser.save()
        const { _id, name, imageUrl, email, role } = currentUser
        const user = { _id, name, imageUrl, email, role }
        const accessToken = createAccessToken({ email, _id: currentUser._id, role: currentUser.role });
        const refreshToken = createRefreshToken({ _id: currentUser._id });

        const localhost = req.headers.get('host')?.startsWith('localhost');

        (await cookies()).set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' && !localhost,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        (await cookies()).set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' && !localhost,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 15,
        });

        return NextResponse.json({ success: true, user, message: 'Email verification successfully' }, { status: 201 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'Email verification failed', error: err.message }, { status: 500 })
    }

}
