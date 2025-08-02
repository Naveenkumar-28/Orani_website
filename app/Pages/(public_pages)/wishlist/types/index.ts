export type WishListType = {
    imageUrl: string,
    category: string,
    description: string,
    discountPrice: number,
    name: string,
    price: number,
    quantity: number,
    sold: number,
    stock: number,
    _id: string,
    rating: number,
    userRatings: number
}
export type CartType = {
    imageUrl: string,
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


export interface WishListItem {
    _id: string;
}

export type WishInitialStateType = {
    wishList: WishListType[],
    isLoading: boolean,
    isError: string | null,
    localStorageWishList: WishListItem[],
    isSignedIn: boolean,
    isSkeletonLoading: boolean
}