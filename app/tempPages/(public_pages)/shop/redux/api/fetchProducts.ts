import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchProductList = createAsyncThunk("products/get", async ({ page = 1, limit = 9, categorySelect = 'all' }: { page: number, limit: number, categorySelect?: string }, { rejectWithValue, getState }) => {

    const cacheKey = `products_category=${categorySelect}_page=${page}`;
    const state = getState() as RootState
    const cache = state.ProductList.cache


    if (cache[cacheKey]) {
        const { products, totalPage } = cache[cacheKey]
        return { products, totalPage, cacheKey };
    }

    const categoryParam = categorySelect !== 'all' && categorySelect !== '' ? categorySelect : '';

    try {
        const response = await api.get(`/products`, {
            params: {
                page,
                limit,
                category: categoryParam
            }
        })

        if (response?.data?.success) {
            console.log("priductList", response?.data);
            const { products, totalPage } = response.data
            return { products, totalPage, cacheKey }
        }

    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
    }
})