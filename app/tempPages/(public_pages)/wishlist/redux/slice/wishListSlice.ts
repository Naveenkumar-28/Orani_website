import { createSlice } from "@reduxjs/toolkit"
import { WishInitialStateType } from "../../types"
import { getWishListLocalStorage, setWishListToLocalStorage } from "../../utils"
import { addWish, fetchWishList, getDbWishList, mergeWishList, removeWish } from "../api"



const initialState: WishInitialStateType = {
    wishList: [],
    isLoading: false,
    isError: null,
    localStorageWishList: [],
    isSignedIn: false,
    isSkeletonLoading: false
}

const wishList = createSlice({
    initialState,
    name: "WishList",
    reducers: {
        setTolocalStorageWishList: (state) => {
            state.localStorageWishList = getWishListLocalStorage()
        },
        addWishList: (state, action) => {
            const { _id } = action.payload
            state.localStorageWishList.push({ _id })
            setWishListToLocalStorage(state.localStorageWishList)
        },
        updateWishListIsSignIn: (state, action) => {
            state.isSignedIn = action.payload
        },
        wishListReset: (state) => {
            state.wishList = []
            state.localStorageWishList = []
            state.isError = null
            state.isLoading = false
            state.isSkeletonLoading = false
            setWishListToLocalStorage([])
        },

        wishListRemove: (state, action) => {

            state.wishList = state.wishList.filter((item) => item._id !== action.payload._id)
            state.localStorageWishList = state.localStorageWishList.filter((item) => item._id !== action.payload._id)

            if (!state.isSignedIn) {
                setWishListToLocalStorage(state.localStorageWishList)
            }
        }
    },
    extraReducers(builder) {
        //local wish fetch
        builder.addCase(fetchWishList.pending, (state, action) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.isError = null
        })
        builder.addCase(fetchWishList.fulfilled, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            const { products } = action.payload
            state.isLoading = false
            state.wishList = products
            syncLocalWishItems(state)
        })
        builder.addCase(fetchWishList.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //local wish merge with db cart
        builder.addCase(mergeWishList.pending, (state, action) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.wishList = []
            state.isError = null
            state.localStorageWishList = []
        })
        builder.addCase(mergeWishList.fulfilled, (state, action) => {
            const { products } = action.payload
            state.isSkeletonLoading = false
            state.isLoading = false
            state.wishList = []
            state.localStorageWishList = products
            setWishListToLocalStorage([])
        })
        builder.addCase(mergeWishList.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //db wish
        builder.addCase(getDbWishList.pending, (state, action) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.wishList = []
            state.isError = null
        })
        builder.addCase(getDbWishList.fulfilled, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            const { products } = action.payload
            state.wishList = products
            syncLocalWishItems(state)
        })
        builder.addCase(getDbWishList.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //db wish remove
        builder.addCase(removeWish.pending, (state) => {
            state.isSkeletonLoading = false
            state.isLoading = true
            state.isError = null
        })
        builder.addCase(removeWish.fulfilled, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            if (!state.isSignedIn) return
            const { _id } = action.meta.arg
            state.wishList = state.wishList.filter((p) => p._id !== _id)
            syncLocalWishItems(state)
        })
        builder.addCase(removeWish.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //db wish add
        builder.addCase(addWish.pending, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = true
            state.isError = null
        })
        builder.addCase(addWish.fulfilled, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            if (!action.payload?.product) return;
            const { product } = action.payload;
            state.wishList.push(product)
            syncLocalWishItems(state)
        })
        builder.addCase(addWish.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
    },
})

const syncLocalWishItems = (state: WishInitialStateType) => {
    state.localStorageWishList = state.wishList.map((item) => ({ _id: item._id }))
    if (!state.isSignedIn) {
        setWishListToLocalStorage(state.localStorageWishList)
    }
}

export const { wishListRemove, wishListReset, addWishList, setTolocalStorageWishList, updateWishListIsSignIn } = wishList.actions
export const wishListReducer = wishList.reducer