import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type getOrdersProps = {
    firstTimeLoad?: boolean;
    changePage?: boolean;
    filtering?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

// Async thunk for fetching orders
export const getOrders = createAsyncThunk('adminOrderList/get', async ({ page = 1, limit = 9, search = '', status = 'all', firstTimeLoad = false }: getOrdersProps, { rejectWithValue, getState }) => {
    const cacheKey = `order_page-${page}_limit-${limit}_category-${status || ''}_search-${search || ''}`
    const state = getState() as RootState
    const cacheData = state.AdminOrders.cache[cacheKey]
    if (cacheData && !firstTimeLoad) {
        const { orders, totalPage, ordersData } = cacheData
        return { orders, totalPage, ordersData, cacheKey }
    }
    try {
        const response = await api.get(`/admin/orders`, {
            params: {
                page,
                limit,
                status: status == 'all' ? '' : status,
                search
            }
        })
        if (response.data.success) {
            console.log(response.data);

            const { totalPage, orders, ordersData } = response.data
            return { orders, totalPage, ordersData, cacheKey }
        }
        return rejectWithValue("Order fetched failed!")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Order fetched failed!")
        }
        return rejectWithValue("Order fetched failed!")
    }
})

// Async thunk for update Order Status 
export const updateOrderStatus = createAsyncThunk('adminOrderList/status/update', async ({ id, status }: { id: string, status: string }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/admin/orders/${id}`, { status })
        if (response.data.success) {
            console.log(response.data);

            const { updatedOrder } = response.data
            return { updatedOrder }
        }
        return rejectWithValue("Order status update failed")
    } catch (error) {
        console.log({ error: (error as Error).message })
        return rejectWithValue((error as Error).message || "Order status update failed")
    }
})