import { connectToDatabase } from "@/lib/mongoDB";
import { ProductList } from "@/models";


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit') || '') || 10
    const category = searchParams.get('category')

    console.log({ search, limit, category })
    try {
        await connectToDatabase();

        const match = {} as { name: any, category: any }

        if (search) {
            match.name = { $regex: search, $options: "i" };
        }

        if (category) {
            match.category = { $regex: category, $options: "i" };
        }

        const products = await ProductList.aggregate([
            { $match: match },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    imageUrl: 1
                }
            },
            { $limit: limit }
        ]);

        const splittedProducts = products.map((product) => ({
            ...product,
            splittedName: product.name.split(new RegExp(`(${search})`, 'gi')), // Splitting name
        }))

        return Response.json({ message: "Suggestion fetched successfully", success: true, suggestionProducts: splittedProducts }, { status: 200 })

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: "Suggestion fetched failed" }, { status: 500 })
    }
}