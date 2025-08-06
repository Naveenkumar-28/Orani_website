import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { GenerateRandomSixDigit } from "@/utils";
import { sendEmailVerificationCode } from "@/templates";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password }: { name: string, email: string, password: string } = await req.json();

        if (!name || !email || !password) {
            const field = !name ? 'name' : !email ? 'email' : 'password';
            return Response.json({ success: false, message: `Please provide ${field} field`, field }, { status: 400 });
        }

        if (password.length < 8) return Response.json({ success: false, message: 'Password must be at least 8 characters', field: 'password' }, { status: 400 });
        if (password.length > 10) return Response.json({ success: false, message: 'Password must be maximum 10 characters', field: 'password' }, { status: 400 });

        await connectToDatabase();

        const randomSixDigit = GenerateRandomSixDigit();
        let user = await User.findOne({ email });

        if (user) {
            if (user.isVerified) {
                return Response.json({ success: false, message: "User already exists" }, { status: 400 });
            }
            // update existing unverified user
            user.password = await bcrypt.hash(password, 10);
            user.name = name;
            user.verificationCode = randomSixDigit;
            await user.save();
        } else {
            user = new User({
                name,
                email,
                password: await bcrypt.hash(password, 10),
                verificationCode: randomSixDigit,
            });
            await user.save();
        }

        const data = {
            userName: user.name,
            verificationCode: randomSixDigit,
            email: user.email
        }

        await sendEmailVerificationCode(data);

        return Response.json({ success: true, message: "Email verification code sent successfully" }, { status: 200 });

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: "Email verification code sent failed" }, { status: 500 });
    }
}
