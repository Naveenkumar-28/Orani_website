import { createSlice } from "@reduxjs/toolkit";
import { fetchProductSliders } from "../api";
import { ProductSliderType } from "@/app/types";


type initialStateType = {
    isError: null | string;
    isLoading: boolean;
    topRatedProducts: ProductSliderType[];
    bestReviewedProducts: ProductSliderType[];
    latestProducts: ProductSliderType[];
};

const initialState: initialStateType = {
    isError: null,
    isLoading: false,
    topRatedProducts: [],
    bestReviewedProducts: [],
    latestProducts: [],
};

const productSliderListSlice = createSlice({
    name: "product_sliders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductSliders.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(fetchProductSliders.fulfilled, (state, action) => {
                const { bestReviewedProducts, latestProducts, topRatedProducts } = action.payload
                state.isLoading = false;
                state.topRatedProducts = topRatedProducts;
                state.bestReviewedProducts = bestReviewedProducts;
                state.latestProducts = latestProducts;
            })
            .addCase(fetchProductSliders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string || "product slider list fetched failed"
            });
    },
});

export const productSliderListReducer = productSliderListSlice.reducer;
