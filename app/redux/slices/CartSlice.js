import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const setData = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('CartList', JSON.stringify(data))
    }
}

const CartSlice = createSlice({
    initialState, name: "CartList",
    reducers: {
        addCartList: (state, action) => {
            setData([...state, action.payload])
            return [...state, action.payload]
        },
        CartIncrementQuantity: (state, action) => {


            const cartList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock)
                    }
                }
                return item
            })
            setData(cartList)
            return cartList
        },
        CartDecrementQuantity: (state, action) => {
            const cartList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.max(item.quantity - 1, 1)
                    }
                }
                return item
            })
            setData(cartList)
            return cartList
        },
        CartChangeQuantity: (state, action) => {
            const quantity = Number(action.payload.quantity)
            const cartList = state.map((item) => {
                if (item._id == action.payload._id) {
                    return {
                        ...item,
                        quantity: Math.min(Math.max(quantity, 1), item.stock)
                    }
                }
                return item
            })
            setData(cartList)
            return cartList
        },
        CartReset: (state) => {
            setData([])
            return []
        },
        CartRemove: (state, action) => {
            const cartList = state.filter((item) => item._id != action.payload._id)
            setData(cartList)
            return cartList
        }
    }
})

export const { CartDecrementQuantity, CartIncrementQuantity, CartChangeQuantity, CartReset, addCartList, CartRemove } = CartSlice.actions
export default CartSlice.reducer