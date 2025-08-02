import { connectToDatabase } from "@/lib/mongoDB";
import { ProductList } from "@/models";

export const GET = async (req: Request) => {

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '') || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit') || '') || 10
    const category = searchParams.get('category')

    console.log({ page, search, limit, category })
    try {
        await connectToDatabase();
        let query: any = {}
        if (search) query.name = { $regex: search, $options: "i" }
        if (category) query.category = { $regex: category, $options: "i" }

        const products = await ProductList.find(query)
            .select("-userRating -rating -sold")
            .skip((page - 1) * limit)
            .limit(limit)

        const totalCount = await ProductList.countDocuments(query)
        const totalPage = Math.ceil(totalCount / limit)
        return Response.json({ success: true, products, totalPage }, { status: 200 })

    } catch (error) {
        console.log("Error : ", (error as Error).message);

        return Response.json(
            { message: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}