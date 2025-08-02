import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk('get/orders', async ({ limit = 9, page = 1, refresh = false }: { limit?: number, page: number, refresh?: boolean }, { rejectWithValue, getState }) => {
    const cacheKey = `orders-${page}`;
    const state = getState() as RootState
    const cachedData = state.OrderList.cache[cacheKey];
    if (cachedData && !refresh) {
        const { orders, totalPage } = cachedData
        return { orders, totalPage, cacheKey }
    }

    try {
        const response = await api.get(`/orders`,
            {
                params: {
                    page, limit
                }
            })
        if (response.data.success) {
            console.log(response.data);
            const { orders, totalPage } = response.data
            return { orders, totalPage, cacheKey }
        }
        return rejectWithValue("Order fetching failed")
    } catch (error) {
        console.log({ error: (error as Error).message })
        return rejectWithValue((error as Error).message || "Order fetching failed")
    }
}) 