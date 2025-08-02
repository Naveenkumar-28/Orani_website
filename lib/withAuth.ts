import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './verifyToken';
import { User } from '@/models';

interface User {
    _id?: string;
    email?: string;
    role?: string;
}

type RouteContext = {
    params: any;
};



export function withAuth(handler: (req: NextRequest, context: RouteContext, user: User) => Promise<Response>) {
    return async function (req: NextRequest, context: RouteContext) {
        try {
            const user = await verifyToken(req);
            return await handler(req, context, user);
        } catch (error) {
            console.error('Server Error:', error);
            if (error instanceof Error && (error.message === 'No token' || error.message === 'Invalid token')) {
                return NextResponse.json({ error: error.message }, { status: 401 });
            }

            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
}
