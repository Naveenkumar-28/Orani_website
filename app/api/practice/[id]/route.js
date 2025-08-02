// import { connectToDatabase } from "@/lib/mongoDB"
// import { User, ProductRating, ProductList } from "@/models";
// import { NextResponse } from "next/server";

// export async function POST(req: Request, { params }: { params: { id: string } }) {

//     try {
//         await connectToDatabase()
//         const { id } = params
//         console.log(id);

//         // const data = await req.json()
//         // const user = await User.findById("681efd7744cca52be7234c7a")
//         // console.log(user);

//         // const product = await ProductList.findOne({ _id: param.id })
//         // console.log(product);

//         // const ratings = data.map((r: any) => {
//         //     return {
//         //         product: product._id,
//         //         user: user._id,
//         //         rating: r.ratings,
//         //         comment: r.comment
//         //     }
//         // })

//         // const rating = await ProductRating.insertMany(ratings);
//         // const rating = await ProductRating.find({ product: product._id });




//         // await Product.findByIdAndUpdate(productId, {
//         //     $push: { userRatings: rating._id }
//         // });
//         // const ratingId = rating.map((r) => r._id)
//         // product.userRatings = [...ratingId]

//         // await product.save()
//         // await updateProductAverageRating(product._id)



//         // const newProduct = await ProductList.create({
//         //     name: product.name.toLowerCase(),
//         //     price: product.price,
//         //     imageUrl: product.imageUrl,
//         //     category: product.category.toLowerCase(),
//         //     quantity: 1,
//         //     description: product.description,
//         //     stock: product.stock,
//         //     sold: product.sold,
//         //     discountPrice: product.discountPrice
//         // })

//         return NextResponse.json({ message: "Successfully", success: true }, { status: 200 })
//     } catch (error) {
//         console.log((error as Error).message);
//         return NextResponse.json({ message: "Something went wrong!", error: (error as Error).message, success: false }, { status: 500 })
//     }
// }

import { connectToDatabase } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(
    req,
    { params }
) {
    try {
        await connectToDatabase();
        const { id } = params;
        console.log(id);

        return NextResponse.json(
            { message: "Successfully", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            {
                message: "Something went wrong!",
                error: error.message,
                success: false,
            },
            { status: 500 }
        );
    }
}
