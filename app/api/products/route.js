import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../models/ProductList";

// export async function POST(req) {
//     await connectToDatabase();
//     let data = await req.json()
//     const product = await ProductList.create(data)

//     return Response.json(product);
// }

export async function GET(req) {
    console.log(req.url)
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    const category = searchParams.get('category')

    try {
        await connectToDatabase();
        const length = (await ProductList.find()).length

        if (category || search) {

            const products = await ProductList.find({ name: { $regex: search, $options: "i" }, category: { $regex: category, $options: "i" } })
                .skip((page - 1) * limit)
                .limit(limit).select("-ratings ")
            return Response.json({ success: true, products, length }, { status: 200 })
        } else {

            const products = await ProductList.find().skip((page - 1) * limit).limit(limit).select("-ratings ")
            return Response.json({ success: true, products, total: length }, { status: 200 })

        }


    } catch (error) {
        console.log("Error : ", error.message);

        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}