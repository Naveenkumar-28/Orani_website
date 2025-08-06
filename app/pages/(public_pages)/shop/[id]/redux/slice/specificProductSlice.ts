import { createSlice } from "@reduxjs/toolkit";
import { fetchSpecificProduct } from "../api";
import { ProductType } from "@/app/types";

type initialStateType = { specificProduct: ProductType | null, relatedProducts: ProductType[], isLoading: boolean, isError: string | null }

export const initialState: initialStateType = {
    isLoading: false as boolean,
    isError: null,
    specificProduct: null,
    relatedProducts: []
}

const specificProductSlice = createSlice({
    initialState,
    name: 'specificProduct',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSpecificProduct.pending, (state, action) => {
            state.isLoading = true
            state.isError = null
            state.specificProduct = null
        }),
            builder.addCase(fetchSpecificProduct.fulfilled, (state, action) => {
                const { relatedProducts, specificProduct } = action.payload as { relatedProducts: ProductType[], specificProduct: ProductType }
                state.isLoading = false
                state.relatedProducts = relatedProducts || []
                state.specificProduct = specificProduct || {}

            }),
            builder.addCase(fetchSpecificProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload as string
            })
    },
})

export const { } = specificProductSlice.actions
export const specificProductReducer = specificProductSlice.reducer