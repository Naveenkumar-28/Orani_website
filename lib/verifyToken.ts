import { NextRequest } from 'next/server';
import { verifyAccessToken } from './tokens';
import { JwtPayload } from 'jsonwebtoken';

export const verifyToken = async (req: NextRequest) => {
    const token = req.cookies.get('accessToken')?.value;

    if (!token) throw new Error('No token');

    try {
        const decoded = await verifyAccessToken(token) as JwtPayload
        const { _id, email, role } = decoded
        if (typeof decoded === 'object' && _id && email && role) {
            return { _id, email, role };
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Invalid token');
    }
};
