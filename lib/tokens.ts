import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY!;

export const createAccessToken = (payload: object) => {
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("Missing ACCESS_TOKEN_SECRET");
    }
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (payload: object) => {
    if (!REFRESH_TOKEN_SECRET) {
        throw new Error("Missing REFRESH_TOKEN_SECRET");
    }
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string) => {
    if (!REFRESH_TOKEN_SECRET) {
        throw new Error("Missing REFRESH_TOKEN_SECRET");
    }
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
export const verifyAccessToken = async (token: string) => {
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("Missing ACCESS_TOKEN_SECRET");
    }
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};
