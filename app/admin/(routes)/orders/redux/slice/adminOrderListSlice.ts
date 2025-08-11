import { OrderType } from "@/app/admin/types";
import { createSlice } from "@reduxjs/toolkit"
import { getOrders, updateOrderStatus } from "../api";

type orderData = {
    total: number, new: number, delivered: number, cancelled: number
}

type OrdersState = {
    orders: OrderType[];
    totalPage: number;
    isLoading: boolean;
    loader: boolean;
    loadingSkeleton: boolean;
    error: string | null;
    page: number;
    ordersData: orderData,
    cache: Record<string, cacheType>
}
type cacheType = {
    orders: OrderType[];
    totalPage: number;
    ordersData: orderData,
}

const initialState: OrdersState = {
    orders: [],
    totalPage: 0,
    isLoading: false,
    loader: false,
    loadingSkeleton: false,
    error: null,
    page: 1,
    ordersData: { total: 0, new: 0, delivered: 0, cancelled: 0 },
    cache: {}
}

const AdminOrderList = createSlice({
    initialState, name: "adminOrderList",
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getOrders.pending, (state, action) => {
                const { firstTimeLoad, changePage, filtering } = action.meta.arg
                state.loader = !!changePage
                state.isLoading = !!filtering
                state.loadingSkeleton = !!firstTimeLoad
                state.error = null
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                const { page } = action.meta.arg
                const { orders, totalPage, cacheKey, ordersData } = action.payload
                state.loader = false
                state.isLoading = false
                state.loadingSkeleton = false

                if ((page || 1) == 1) {
                    state.ordersData = ordersData
                    state.orders = orders
                } else {
                    const result = [...state.orders, ...orders]
                    const duplicateRemoved = Array.from(new Map(result.map(item => [item?._id, item])).values())
                    state.orders = duplicateRemoved
                }
                state.totalPage = totalPage
                state.page = page || 1
                state.cache[cacheKey] = { orders, ordersData, totalPage }
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loader = false
                state.isLoading = false
                state.loadingSkeleton = false
                state.error = action.payload as string
            })
            .addCase(updateOrderStatus.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const { updatedOrder } = action.payload
                state.isLoading = false
                const orderStatus = updatedOrder.orderStatus
                state.orders = state.orders.map((order) => {
                    return order._id == updatedOrder._id ? { ...order, orderStatus } : order
                })

                Object.keys(state.cache).forEach((cacheKey) => {
                    const cacheOrders = state.cache[cacheKey]
                    if (!cacheOrders) return
                    cacheOrders.orders = cacheOrders.orders.map((item) => item._id == updatedOrder._id ? { ...item, orderStatus } : item)
                })
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { } = AdminOrderList.actions
export const AdminOrderListReducer = AdminOrderList.reducer