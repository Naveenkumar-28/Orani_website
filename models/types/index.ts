export type UserType = {
    _id: string,
    name: string,
    email: string,
    mobileNumber: number,
    password: string,
    imageUrl: null | string,
    orders: [],
    role: string,
    isVerified: boolean,
    verificationCode: number | null
}