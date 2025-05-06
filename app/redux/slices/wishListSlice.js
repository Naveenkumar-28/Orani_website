import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const setData = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('WishList', JSON.stringify(data))
    }
}

const wishList = createSlice({
    initialState, name: "WishList",

    reducers: {
        addWishList: (state, action) => {
            setData([...state, action.payload])
            return [...state, action.payload]
        },
        WishListIncrementQuantity: (state, action) => {


            const wishList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock)
                    }
                }
                return item
            })
            setData(wishList)
            return wishList
        },
        WishListDecrementQuantity: (state, action) => {
            const wishList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.max(item.quantity - 1, 1)
                    }
                }
                return item
            })
            setData(wishList)
            return wishList
        },
        WishListChangeQuantity: (state, action) => {
            const quantity = Number(action.payload.quantity)
            const wishList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.min(Math.max(quantity, 1), item.stock)
                    }
                }
                return item
            })
            setData(wishList)
            return wishList
        },
        WishListReset: (state) => {
            setData([])
            return []
        },
        WishListRemove: (state, action) => {
            const wishList = state.filter((item) => item._id != action.payload._id)
            setData(wishList)
            return wishList
        }
    }
})

export const { WishListChangeQuantity, WishListDecrementQuantity, WishListIncrementQuantity, WishListRemove, WishListReset, addWishList } = wishList.actions
export default wishList.reducer