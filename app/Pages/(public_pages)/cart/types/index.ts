import { CartType } from "@/app/types"
export interface initialStateType {
    cartList: CartType[]
    isLoading: boolean
    isError: string | null
    localStorageCartList: cartItems[]
    isSignedIn: boolean
    isSkeletonLoading: boolean
}

export type cartItems = {
    _id: string, quantity: number
}