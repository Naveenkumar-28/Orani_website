import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const ProductSlice = createSlice({
    initialState, name: "ProductLists",
    reducers: {
        addProductList: (state, action) => {
            return [...action.payload]
        }
    }
})

export const { addProductList } = ProductSlice.actions
export default ProductSlice.reducer