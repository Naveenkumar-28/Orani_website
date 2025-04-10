import path, { join, resolve } from "path";
import { writeFile } from "fs/promises";
import { connectToDatabase } from "../../../../../lib/mongoDB";
import ProductList from "../../../../../models/ProductList";

export async function POST(req) {
    try {
        await connectToDatabase();

        // Get form data
        const formData = await req.formData();
        // Convert FormData to an object
        const data = {};

        formData.forEach((value, key) => {
            if (key != 'file') {

                data[key] = value;
            }
        });

        const file = formData.get('file');

        if (!file) {
            return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400 });
        }

        // Check file size (in bytes)
        const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes
        const fileSize = file.size;

        if (fileSize > MAX_SIZE) {
            return new Response(
                JSON.stringify({ message: "Image size exceeds the 1MB limit" }),
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()

        const buffer = Buffer.from(bytes);

        // Save the file to /public/uploads
        const uploadDir = resolve(process.cwd(), "public/featured");
        const fileName = Date.now() + path.extname(file.name)
        const filePath = join(uploadDir, fileName);

        // // Write file
        await writeFile(filePath, buffer)

        const newData = { ...data, ImageUrl: join("/featured", fileName) }

        const product = await ProductList.create(newData)

        return Response.json({ success: true, message: "File uploaded successfully", product }, { status: 201 });
    } catch (error) {
        console.error("Error uploading file:", error);
        return new Response(JSON.stringify({ message: "File upload failed ", error: error.message }), { status: 500 });
    }
}
