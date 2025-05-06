import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../models/ProductList";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit')) || 9
    try {
        await connectToDatabase();

        const products = await ProductList.find().sort({ createdAt: -1 }).select('_id name price ImageUrl stock ratings discountPrice quantity description')

        let latestProducts = products.slice(0, limit).map((product) => {
            const productObj = product.toObject()
            return {
                name: productObj.name,
                ImageUrl: productObj.ImageUrl,
                _id: productObj._id,
                price: productObj.price,
                stock: productObj.stock,
                discountPrice: productObj.discountPrice,
                quantity: productObj.quantity,
                description: productObj.description
            }
        })

        const newList = products.map((product) => {
            const productObj = product.toObject()
            const total = productObj?.ratings?.reduce((acc, value) => {
                return (acc + value.ratings)
            }, 0)
            return { ...productObj, ratings: Number((total / productObj?.ratings?.length).toFixed(1)) }
        })
        const topRatedProducts = newList.sort((a, b) => b?.ratings - a?.ratings).slice(0, limit)


        const list = products.map((product) => {
            const productObj = product.toObject()
            return { ...productObj, ratings: productObj?.ratings?.length }
        })
        const bestReviewedProducts = list.sort((a, b) => b?.ratings - a?.ratings).slice(0, limit)

        return Response.json({ success: true, topRatedProducts, bestReviewedProducts, latestProducts }, { status: 200 })
    } catch (error) {
        console.log("Error : ", error.message);

        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}