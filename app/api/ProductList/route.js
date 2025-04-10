import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../models/ProductList";

// export async function POST(req) {
//     await connectToDatabase();
//     let data = await req.json()
//     const product = await ProductList.create(data)

//     return Response.json(product);
// }

export async function GET() {
    try {
        await connectToDatabase();

        const products = await ProductList.find()

        return Response.json({ success: true, products }, { status: 200 })
    } catch (error) {
        console.log("Error : ", error.message);

        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}