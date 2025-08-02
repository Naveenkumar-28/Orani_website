
import { createSlice } from "@reduxjs/toolkit"
import { fetchProductList } from "../api"
import { ProductType } from "../../types"

type objItems = {
    totalPage: number,
    products: ProductType[]
}

const initialState = {
    isLoading: false,
    isError: null as string | null,
    products: [] as ProductType[],
    page: 1,
    totalPage: 0,
    cache: {} as Record<string, objItems>
}

const ProductSlice = createSlice({
    initialState, name: "ProductList",
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProductList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            const { products, totalPage, cacheKey } = action.payload as { products: ProductType[], totalPage: number, cacheKey: string }
            console.log({ products, totalPage, cacheKey });
            const { page } = action.meta.arg
            state.isLoading = false
            state.products = products
            state.totalPage = totalPage
            state.page = page
            state.cache[cacheKey] = { products, totalPage };

        })
        builder.addCase(fetchProductList.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload as string
        })
    },

})

export const { } = ProductSlice.actions
export const ProductReducer = ProductSlice.reducer