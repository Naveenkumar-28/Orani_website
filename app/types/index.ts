export type CartType = {
    imageUrl: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    stock: number,
    _id: string
}
export type WishItemsType = {
    _id: string,
    name: string,
    description: string,
    discountPrice: string,
    price: number,
    imageUrl: string,
    rating: number,
    stock: number,
    userRatings: number
}

export type ProductType = {
    imageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    rating: number,
    sold: number,
    stock: number,
    _id: string,
    userRatings: number
}
export type ProductSliderType = {
    imageUrl: string,
    discountPrice: number,
    name: string,
    price: number,
    rating: number,
    _id: string,
}


export type BlogType = {
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    commentsCount: number,
    formattedDate: string
}

export type SuggestionType = {
    _id: string,
    name: string,
    imageUrl: string,
    splittedName: string[]
}