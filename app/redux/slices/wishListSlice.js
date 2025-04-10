import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const wishList = createSlice({
    initialState, name: "WishList",
    reducers: {
        addWishList: (state, action) => {
            return [...state, action.payload]
        },

        WishListReset: (state) => {
            return []
        }
    }
})

export const { WishListReset, addWishList } = wishList.actions
export default wishList.reducer