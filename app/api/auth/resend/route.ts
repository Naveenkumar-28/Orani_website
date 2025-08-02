import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models";
import { sendEmailVerificationCode } from "@/templates";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        const { email } = await req.json()
        if (!email) return Response.json({ success: false, message: 'Please provide email address' }, { status: 400 })
        const currentUser = await User.findOne({ email })
        if (!currentUser) return Response.json({ success: false, message: "This email address not found" }, { status: 404 });
        if (currentUser.isVerified && currentUser.verificationCode == null) return Response.json({ success: false, message: "Your email already verified" }, { status: 400 });

        const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
        console.log(randomSixDigit)

        currentUser.verificationCode = randomSixDigit

        await currentUser.save()

        const data = {
            userName: currentUser.name,
            verificationCode: randomSixDigit,
            email: currentUser.email
        }
        await sendEmailVerificationCode(data);

        return Response.json({ success: true, message: "Email verification Code send successfully" }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: 'Somthing went wrong!' }, { status: 500 })
    }

}