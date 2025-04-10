// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoDB";
import path from "path";
import fs from "fs/promises";

// Helper to parse FormData
async function parseFormData(req: Request) {
    try {
        console.log(req);

        const boundary = req.headers.get("content-type")?.split("boundary=")?.[1];
        if (!boundary) throw new Error("Invalid form data");

        const formData = await req.formData();
        const file = formData.get("file") as Blob | null;

        if (!file) throw new Error("No file uploaded");

        return file;
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

// POST Request Handler
export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const file = await parseFormData(req) as File

        // Save the file
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public", "hero")

        await fs.mkdir(uploadDir, { recursive: true }); // Ensure folder exists

        const uniqueName = `bg-${Date.now()}${path.extname(file?.name)}`;
        const filePath = path.join(uploadDir, uniqueName);

        await fs.writeFile(filePath, buffer);

        return Response.json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
        return Response.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
