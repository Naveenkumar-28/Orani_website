import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ success: true, message: 'Logged out' })

    // Remove the cookies by setting maxAge to 0
    response.cookies.set('accessToken', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    })

    response.cookies.set('refreshToken', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    })

    return response
}