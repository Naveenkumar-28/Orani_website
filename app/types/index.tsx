export type CartType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    ratings: [Object],
    sold: number,
    stock: number,
    _id: string
}
export type WishListType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    sold: number,
    stock: number,
    _id: string
}
export type ProductListType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    ratings: number,
    sold: number,
    stock: number,
    _id: string,
    totalReviewsLength: number
}
export type ProductType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    ratings: [Object],
    sold: number,
    stock: number,
    _id: string
}

export interface Product {
    ImageUrl: string;
    category: string;
    description: string;
    discountPrice: number;
    name: string;
    price: number;
    quantity: number;
    ratings: object[]; // or more specific if you know the shape
    sold: number;
    stock: number;
    _id: string;
}

export type BlogType = {
    _id: string,
    name: string,
    description: string,
    imageUrl: string,
    category: string,
    comments: number,
    createdAt: number,
    __v?: number
}