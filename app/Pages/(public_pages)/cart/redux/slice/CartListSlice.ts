import { createSlice } from "@reduxjs/toolkit"
import { addCart, fetchCartList, getDbCartList, mergeCartList, removeCart } from "../api"
import { initialStateType } from "../../types"
import { getCartLocalStoreList, setCartListToLocalStorage } from "../../utils"

const initialState: initialStateType = {
    cartList: [],
    isSkeletonLoading: false,
    isLoading: false,
    isError: null,
    localStorageCartList: [],
    isSignedIn: false
}

const CartListSlice = createSlice({
    initialState,
    name: "CartList",
    reducers: {
        setTolocalStorageCartList: (state) => {
            state.localStorageCartList = getCartLocalStoreList()
        },
        addCartList: (state, action) => {
            const { _id, quantity = 1 } = action.payload
            state.localStorageCartList.push({ _id, quantity })
            setCartListToLocalStorage(state.localStorageCartList)
        },
        updateCartListIsSignIn: (state, action) => {
            state.isSignedIn = action.payload
        },
        incrementQuantity: (state, action) => {
            const updatedWishList = state.cartList.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock)
                    }
                }
                return item
            })
            state.cartList = updatedWishList
            syncLocalCart(state)
        },
        decrementQuantity: (state, action) => {
            const updatedWishList = state.cartList
                .map((item) => {
                    if (item._id == action.payload._id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                    return item
                })
                .filter((product) => product.quantity != 0)

            state.cartList = updatedWishList
            syncLocalCart(state)
        },
        changeQuantity: (state, action) => {
            const { quantity, _id } = action.payload
            const updatedWishList = state.cartList.map((item) => {
                if (item._id == _id) {
                    return {
                        ...item,
                        quantity: Math.min(Math.max(Number(quantity) || 1, 1), item.stock)
                    }
                }
                return item
            })
            state.cartList = updatedWishList
            syncLocalCart(state)
        },
        CartReset: (state) => {
            state.cartList = []
            state.localStorageCartList = []
            state.isError = null
            state.isLoading = false
            state.isSkeletonLoading = false
            setCartListToLocalStorage([])
        },
        CartRemove: (state, action) => {
            const filteredList = state.cartList.filter((item) => item._id != action.payload._id)
            state.cartList = filteredList
            syncLocalCart(state)
        }
    },
    extraReducers(builder) {
        //local cart fetch
        builder.addCase(fetchCartList.pending, (state, action) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.isError = null
        })
        builder.addCase(fetchCartList.fulfilled, (state, action) => {
            const { products } = action.payload
            state.isSkeletonLoading = false
            state.isLoading = false
            state.cartList = products
            syncLocalCart(state)
        })
        builder.addCase(fetchCartList.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //local cart merge with db cart
        builder.addCase(mergeCartList.pending, (state) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.cartList = []
            state.isError = null
            state.localStorageCartList = []
        })
        builder.addCase(mergeCartList.fulfilled, (state, action) => {
            const { products } = action.payload
            state.isLoading = false
            state.isSkeletonLoading = false
            state.cartList = []
            state.localStorageCartList = products
            setCartListToLocalStorage([])
        })
        builder.addCase(mergeCartList.rejected, (state, action) => {
            state.isLoading = false
            state.isSkeletonLoading = false
            state.isError = action.payload as string
        })
        //db cart
        builder.addCase(getDbCartList.pending, (state, action) => {
            state.isSkeletonLoading = true
            state.isLoading = false
            state.cartList = []
            state.isError = null
        })
        builder.addCase(getDbCartList.fulfilled, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            const { products } = action.payload
            state.cartList = products
            syncLocalCart(state)
        })
        builder.addCase(getDbCartList.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //db cart remove
        builder.addCase(removeCart.pending, (state) => {
            state.isSkeletonLoading = false
            state.isLoading = true
            state.isError = null
        })
        builder.addCase(removeCart.fulfilled, (state, action) => {
            const { _id } = action.meta.arg
            state.isSkeletonLoading = false
            state.isLoading = false
            state.cartList = state.cartList.filter((p) => p._id !== _id)
            syncLocalCart(state)
        })
        builder.addCase(removeCart.rejected, (state, action) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.isError = action.payload as string
        })
        //db cart add
        builder.addCase(addCart.pending, (state, action) => {
            state.isLoading = true
            state.isSkeletonLoading = false
            state.isError = null
        })
        builder.addCase(addCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSkeletonLoading = false
            if (!action.payload?.product) return;
            const { product } = action.payload
            state.cartList.unshift(product)
            syncLocalCart(state)
        })
        builder.addCase(addCart.rejected, (state, action) => {
            state.isLoading = false
            state.isSkeletonLoading = false
            state.isError = action.payload as string
        })
    },
})

const syncLocalCart = (state: initialStateType) => {
    state.localStorageCartList = state.cartList.map((item) => ({ _id: item._id, quantity: item.quantity }))
    if (!state.isSignedIn) {
        setCartListToLocalStorage(state.localStorageCartList)
    }
}


export const {
    CartRemove,
    CartReset,
    addCartList,
    changeQuantity,
    decrementQuantity,
    incrementQuantity,
    setTolocalStorageCartList,
    updateCartListIsSignIn
} = CartListSlice.actions

export const cartListReducer = CartListSlice.reducer