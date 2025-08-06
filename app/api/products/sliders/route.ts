import { connectToDatabase } from "@/lib/mongoDB";
import { ProductList } from "@/models";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '') || 9
    try {
        await connectToDatabase();

        const [products] = await ProductList.aggregate([
            {
                $project: {
                    name: 1,
                    price: 1,
                    discountPrice: 1,
                    imageUrl: 1,
                    rating: 1,
                    createdAt: 1,
                    userRatingsCount: { $size: "$userRatings" },
                },
            },
            {
                $facet: {
                    latestProducts: [
                        { $sort: { createdAt: -1 } },
                        { $limit: limit }
                    ],
                    topRatedProducts: [
                        { $sort: { rating: -1 } },
                        { $limit: limit }
                    ],
                    bestReviewedProducts: [
                        { $sort: { userRatingsCount: -1 } },
                        { $limit: limit }
                    ]
                }
            }
        ]);

        const { latestProducts, topRatedProducts, bestReviewedProducts } = products;

        return Response.json({ success: true, message: "Product sliders fetched successfully", topRatedProducts, bestReviewedProducts, latestProducts }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json(
            { success: false, message: "Product sliders fetched failed", error: err.message },
            { status: 500 } // Internal Server Error
        )
    }
}