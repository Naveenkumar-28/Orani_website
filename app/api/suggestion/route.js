import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../models/ProductList";


export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    const category = searchParams.get('category')

    console.log({ search, limit, category })
    try {
        await connectToDatabase();
        let query = {}
        if (search) query.name = { $regex: search, $options: "i" }
        if (category) query.category = { $regex: category, $options: "i" }

        const suggestionProducts = await ProductList.find(query).limit(limit).select("_id name ImageUrl")
        const splittedProducts = suggestionProducts.map((product) => {
            const productObj = product.toObject() // Converting Mongoose document to plain object for easy manipulation. 
            return {
                ...productObj,
                splittedName: productObj.name.split(new RegExp(`(${search})`, 'gi')), // Splitting name
            }
        })
        return Response.json({ success: true, suggestionProducts: splittedProducts }, { status: 200 })

    } catch (error) {
        console.log("Error : ", error.message);

        return Response.json(
            { success: false, error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}