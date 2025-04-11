import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../../../models/ProductList";
import { unlink } from "fs/promises";
import { join, resolve } from "path";
import path from "path";
import { writeFile } from "fs/promises";


export async function DELETE(req, { params }) {
    try {
        const data = await params
        if (!data.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 404 })
        const { id } = data
        await connectToDatabase()
        const product = await ProductList.findByIdAndDelete(id)
        if (!product) return Response.json({ success: false, message: "Product not found!" }, { status: 404 })
        const RemoveDir = resolve(process.cwd(), join("public", product?.ImageUrl));
        await unlink(RemoveDir)

        return Response.json({ success: true, message: "Successfully Removed" }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json({ success: false, message: error.message }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        const data = await params

        if (!data.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 404 })
        const { id } = data
        await connectToDatabase()

        // Get form data
        const formData = await req.formData();

        // Convert FormData to an object
        const updateData = {};

        formData.forEach((value, key) => {
            if (key != 'file') {

                updateData[key] = value;
            }
        });

        const file = formData.get('file');

        if (file) {

            // Check file size (in bytes)
            const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes
            const fileSize = file.size;

            if (fileSize > MAX_SIZE) {
                return new Response(
                    JSON.stringify({ success: false, message: "Image size exceeds the 1MB limit" }),
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

            // Write file
            await writeFile(filePath, buffer)

            const product = await ProductList.findById(id)
            if (!product) return Response.json({ success: false, message: "Product not found" }, { status: 404 })
            // console.log(product?.ImageUrl);

            //Remove Previous Image
            const RemoveDir = resolve(process.cwd(), join("public", product?.ImageUrl));
            await unlink(RemoveDir)


            const updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                { ...updateData, ImageUrl: join("/featured", fileName) },
                { new: true } // Return the updated document
            );

            if (!updatedProduct) return Response.json({ success: false, message: "Product not found" }, { status: 404 })

        } else {

            const updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                updateData,
                { new: true } // Return the updated document
            );

            if (!updatedProduct) return Response.json({ success: false, message: "Product not found" }, { status: 404 })
            // console.log("Updated Product", updatedProduct)

        }
        return Response.json({ success: true, message: "Product updated successfully" }, { status: 200 })

    } catch (error) {
        console.log(error.message);

        return Response.json({ success: false, message: error.message }, { status: 500 })
    }
}
