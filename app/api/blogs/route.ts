import { connectToDatabase } from "@/lib/mongoDB"
import { BlogList } from "@/models"


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '') || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit') || '') || 4

    try {
        await connectToDatabase()

        // build match stage
        const matchStage = search
            ? { category: { $regex: search, $options: "i" } }
            : {}

        const aggregationPipeline = [
            { $match: matchStage },
            { $sort: { createdAt: -1 as const } },
            {
                $facet: {
                    paginatedBlogs: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                title: 1,
                                content: 1,
                                category: 1,
                                imageUrl: 1,
                                description: 1,
                                commentsCount: { $size: "$comments" },
                                formattedDate: {
                                    $dateToString: { format: "%b %d %Y", date: "$createdAt" }
                                }
                            }
                        }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ],
                    ...(!search && {
                        categoryList: [
                            {
                                $group: {
                                    _id: "$category",
                                    count: { $sum: 1 }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    name: "$_id",
                                    count: 1
                                }
                            }
                        ],
                        recentBlogs: [
                            { $limit: 3 },
                            {
                                $project: {
                                    title: 1,
                                    content: 1,
                                    category: 1,
                                    imageUrl: 1,
                                    description: 1,
                                    commentsCount: { $size: "$comments" },
                                    formattedDate: {
                                        $dateToString: { format: "%b %d %Y", date: "$createdAt" }
                                    }
                                }
                            }
                        ]
                    })
                }
            }
        ]

        const result = await BlogList.aggregate(aggregationPipeline)
        const data = result[0]

        const totalPage = Math.ceil((data.totalCount[0]?.count || 0) / limit)

        return Response.json({
            success: true,
            blogs: data.paginatedBlogs,
            totalPage,
            ...(!search && {
                category: data.categoryList,
                recentBlogs: data.recentBlogs
            }),
            message: "Blogs fetched succussfully"
        }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({
            success: false,
            error: err.message,
            message: "Blogs fetched failed",
        }, { status: 500 })
    }
}
