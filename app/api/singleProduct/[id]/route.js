import ProductList from '../../../../models/ProductList';
import { connectToDatabase } from "@/lib/mongoDB";

export async function GET(req, { params }) {

    try {
        await connectToDatabase();

        const data = await params
        const singleProduct = await ProductList.findById(data.id)
        if (!singleProduct) {
            return Response.json({ message: "This Product Not found" }, { status: 404 })
        }
        let relatedProducts = await ProductList.find({ category: { $regex: new RegExp(singleProduct.category, "i") } }).select("category ImageUrl price discountPrice name _id")
        if (relatedProducts) {

            relatedProducts = relatedProducts.filter((item) => String(item._id) != String(singleProduct._id)).slice(0, 4)
        }


        return Response.json({ singleProduct, relatedProducts }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 } // Internal Server Error
        )
    }
}