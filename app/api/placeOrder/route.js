import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "@/models/ProductList";


export async function POST() {
    try {
        await connectToDatabase();

        const ProductLists = await ProductList.find();
        return Response.json(ProductLists, { status: 200 })
    } catch (error) {
        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}