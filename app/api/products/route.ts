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

        const [result] = await ProductList.aggregate([
            { $match: query },
            {
                $facet: {
                    products: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                description: 1,
                                imageUrl: 1,
                                price: 1,
                                discountPrice: 1,
                                stock: 1,
                                quantity: 1
                            }
                        }
                    ],
                    total: [
                        { $count: 'count' }
                    ]
                }
            }
        ])
        const products = result?.products || []
        const totalPage = Math.ceil((result?.total?.[0]?.count || 0) / limit)
        return Response.json({ success: true, products, totalPage }, { status: 200 })

    } catch (error) {
        const err = error as Error
        console.log(err.message);

        return Response.json(
            { message: "Products fetched failed", success: false, error: err.message },
            { status: 500 } // Internal Server Error
        )
    }
}