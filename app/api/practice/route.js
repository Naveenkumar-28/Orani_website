import { connectToDatabase } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(
    req
) {
    try {
        await connectToDatabase();

        return NextResponse.json(
            { message: "Successfully", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            {
                message: "Something went wrong!",
                error: error.message,
                success: false,
            },
            { status: 500 }
        );
    }
}