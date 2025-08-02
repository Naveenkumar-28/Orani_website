import { ProductRating, ProductList } from "@/models";

export const updateProductAverageRating = async (productId: string) => {
    const ratings = await ProductRating.find({ product: productId })
    console.log({ ratings });
    if (!ratings.length) {
        return await ProductList.findByIdAndUpdate(productId, { rating: null });
    }
    const total = ratings.reduce((sum, r) => sum + r.rating, 0)
    const average = total / ratings.length
    await ProductList.findByIdAndUpdate(productId, {
        rating: parseFloat(average.toFixed(1)), // e.g., 4.5
    });
}