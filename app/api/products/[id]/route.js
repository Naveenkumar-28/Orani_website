import ProductList from '../../../../models/ProductList';
import { connectToDatabase } from "@/lib/mongoDB";

export async function GET(req, { params }) {

    try {
        await connectToDatabase();
        const data = await params
        const specificProduct = await ProductList.findById(data.id)
        if (!specificProduct) {
            return Response.json({ message: "This Product Not found" }, { status: 404 })
        }
        const productObj = specificProduct.toObject()
        const totalUserRatings = productObj.ratings.reduce((acc, curr) => acc + curr.ratings, 0)
        const totalReviewsLength = productObj.ratings.length || 0  // total reviews given by users
        const averageRating = Number((totalUserRatings / totalReviewsLength).toFixed(1))

        let relatedProducts = await ProductList.find({ category: { $regex: new RegExp(specificProduct.category, "i") } }).select("category ImageUrl price discountPrice name _id")
        if (relatedProducts) {

            relatedProducts = relatedProducts.filter((item) => String(item._id) != String(specificProduct._id)).splice(0, 9)
        }

        return Response.json({ success: true, specificProduct: { ...productObj, ratings: averageRating, totalReviewsLength }, relatedProducts }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json(
            { success: false, error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}