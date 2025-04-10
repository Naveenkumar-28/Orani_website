import { connectToDatabase } from "../../../lib/mongoDB";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { clerkId, email, name, image } = body;

        await connectToDatabase()

        const existing = await User.findOne({ clerkId });
        if (!existing) {
            const newUser = await User.create({ clerkId, email, name, image });
            return NextResponse.json({ success: true, message: "User created", user: newUser });
        }
        return NextResponse.json({ success: true, message: "User created", user: existing });

    } catch (err) {
        console.error("Error saving user:", err);
        return NextResponse.json({ message: "Error saving user" }, { status: 500 });
    }
}
