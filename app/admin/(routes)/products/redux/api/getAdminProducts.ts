import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type getProductsProps = {
    page?: number,
    limit?: number,
    category?: string,
    search?: string,
    isFiltering?: boolean
}

export const getAdminProducts = createAsyncThunk('AdminProducts/get', async ({ page = 1, limit = 9, category = 'all', search = '' }: getProductsProps, { rejectWithValue, getState }) => {

    const cacheKey = `product_page-${page}_limit-${limit}_category-${category || ''}_search-${search || ''}`
    const state = getState() as RootState
    const cacheData = state.AdminProducts.cache[cacheKey]
    if (cacheData) {
        const { products, totalPage } = cacheData
        return { totalPage, products, cacheKey }
    }
    try {
        const response = await api.get(`/admin/products`, {
            params: {
                page, search, limit, category: category != 'all' ? category : ''
            }
        })

        if (response?.data?.success) {
            console.log("products/getAdminProduct", response.data);
            const { totalPage, products } = response.data

            return {
                totalPage,
                products,
                cacheKey
            }
        }
        return rejectWithValue('Products fetched failed!')
    } catch (error) {
        console.log((error as Error).message)
        return rejectWithValue((error as Error).message || 'Products fetched failed!')
    }
})
