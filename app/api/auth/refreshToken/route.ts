import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { User } from '@/models';
import { connectToDatabase } from '@/lib/mongoDB';
import { createAccessToken, verifyRefreshToken } from '@/lib/tokens';

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    try {
        connectToDatabase()
        const payload = verifyRefreshToken(refreshToken) as any;
        const CurrentUser = await User.findById(payload._id)
        if (!CurrentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }
        const newAccessToken = createAccessToken({ email: CurrentUser.email, _id: CurrentUser._id, role: CurrentUser.role });

        (await cookies()).set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 15,
        });

        return NextResponse.json({ success: true, accessToken: newAccessToken, role: CurrentUser.role });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
}
