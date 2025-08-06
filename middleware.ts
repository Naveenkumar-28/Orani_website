import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);

const getrefreshToken = async (request: NextRequest) => {
    const url = request.nextUrl.clone();
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {
            method: 'GET',
            headers: {
                cookie: cookieHeader
            }
        });
        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data.accessToken;
            const role = data.role
            const localhost = request.headers.get('host')?.startsWith('localhost')
            const res = NextResponse.next();

            res.cookies.set('accessToken', newAccessToken, {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production' && !localhost,
                sameSite: 'lax',
                maxAge: 60 * 15,
            });

            const path = url.pathname;

            if (path.startsWith('/admin') && role !== 'admin') {
                url.pathname = '/pages';
                return NextResponse.redirect(url);
            }
            if (path.startsWith('/pages') && role !== 'user') {
                url.pathname = '/admin/dashboard';
                return NextResponse.redirect(url);
            }
            return res;
        } else {
            url.pathname = '/auth/login';
            return NextResponse.redirect(url);
        }
    } catch {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const url = request.nextUrl.clone();

    if (!accessToken) {
        if (!refreshToken) {
            url.pathname = '/auth/login';
            return NextResponse.redirect(url);
        }

        // Try refresh token API
        return await getrefreshToken(request)
    }

    // Verify access token and role based redirect
    try {
        const { payload } = await jwtVerify(accessToken, accessSecret) as any;

        const path = url.pathname;
        if (path.startsWith('/admin') && payload.role !== 'admin') {
            url.pathname = '/pages';
            return NextResponse.redirect(url);
        }
        if (path.startsWith('/pages') && payload.role !== 'user') {
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();

    } catch {
        // Token expired or invalid, try refresh token
        if (refreshToken) {
            return await getrefreshToken(request)
        }

        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
}


export const config = {
    matcher: ['/admin/:path*', '/pages/orders', '/pages/checkout'],
};

