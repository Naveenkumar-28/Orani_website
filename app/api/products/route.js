import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../models/ProductList";

// export async function POST(req) {
//     await connectToDatabase();
//     let data = await req.json()
//     const product = await ProductList.create(data)

//     return Response.json(product);
// }

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    const category = searchParams.get('category')

    console.log({ page, search, limit, category })
    try {
        await connectToDatabase();
        let query = {}
        if (search) query.name = { $regex: search, $options: "i" }
        if (category) query.category = { $regex: category, $options: "i" }

        const products = await ProductList.find(query)
            .skip((page - 1) * limit)
            .limit(limit).select("-ratings ")
        const total = await ProductList.countDocuments(query)
        return Response.json({ success: true, products, total }, { status: 200 })

    } catch (error) {
        console.log("Error : ", error.message);

        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}