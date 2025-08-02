import { ProductType } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit"
import { AddAdminProducts, deleteAdminProduct, getAdminProducts, updateAdminProduct } from "../api";

interface ProductState {
    isSkeletonLoding: boolean;
    products: ProductType[];
    isLoading: boolean;
    error: string | null;
    totalPage: number;
    page: number;
    isFiltering: boolean;
    cache: Record<string, cacheType>
}
interface cacheType {
    totalPage: number;
    products: ProductType[]
}

const initialState: ProductState = {
    isSkeletonLoding: false,
    products: [],
    isFiltering: false,
    isLoading: false,
    error: null,
    totalPage: 0,
    page: 1,
    cache: {}
};


const adminProductSlice = createSlice({
    initialState, name: "AdminProducts",
    reducers: {
        resetAdminProducts: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminProducts.pending, (state, action) => {
                const { isFiltering } = action.meta.arg
                state.isFiltering = !!isFiltering
                state.isSkeletonLoding = !!!isFiltering;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                const { page } = action.meta.arg
                const { products, totalPage, cacheKey } = action.payload
                state.isSkeletonLoding = false;
                state.isFiltering = false
                state.isLoading = false;
                state.products = products
                state.totalPage = totalPage
                state.page = page || 1
                state.cache[cacheKey] = { products, totalPage }
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.isSkeletonLoding = false;
                state.isFiltering = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(AddAdminProducts.pending, (state) => {
                state.isSkeletonLoding = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(AddAdminProducts.fulfilled, () => {
                return initialState
            })
            .addCase(AddAdminProducts.rejected, (state, action) => {
                state.isSkeletonLoding = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateAdminProduct.pending, (state) => {
                state.isSkeletonLoding = false
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateAdminProduct.fulfilled, (state, action) => {
                const { updatedProduct } = action.payload
                state.isSkeletonLoding = false
                state.isLoading = false;
                state.products = state.products.map((product) => {
                    return product._id === updatedProduct._id ? updatedProduct : product
                })
                // Update in all cached pages
                Object.keys(state.cache)
                    .forEach((cacheKey) => {
                        const cached = state.cache[cacheKey];
                        if (cached?.products) {
                            cached.products = cached.products.map((item) =>
                                item._id === updatedProduct._id ? updatedProduct : item
                            );
                        }
                    });
            })
            .addCase(updateAdminProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSkeletonLoding = false
                state.error = action.payload as string;
            })
            .addCase(deleteAdminProduct.pending, (state) => {
                state.isSkeletonLoding = false
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAdminProduct.fulfilled, () => {
                return initialState
            })
            .addCase(deleteAdminProduct.rejected, (state, action) => {
                state.isSkeletonLoding = false
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
})

export const { resetAdminProducts } = adminProductSlice.actions
export const adminProductReducer = adminProductSlice.reducer