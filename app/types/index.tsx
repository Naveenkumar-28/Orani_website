export type CartType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: string,
    quantity: number,
    ratings: [Object],
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
    ratings: [{
        comment: string,
        name: string,
        profileUrl: string,
        ratings: number,
        _id: string
    }],
    sold: number,
    stock: number,
    _id: string
}
export type ProductType = {
    ImageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: string,
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
    price: string;
    quantity: number;
    ratings: object[]; // or more specific if you know the shape
    sold: number;
    stock: number;
    _id: string;
}