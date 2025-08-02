import { createSlice } from "@reduxjs/toolkit"
import { fetchOrders } from "../api/fetchOrders"
import { OrderType } from "../../types"


type initialStateType = {
    orders: OrderType[],
    isLoading: boolean,
    isLoadingSkeleton: boolean,
    totalPage: number,
    page: number,
    isError: string | null,
    cache: Record<string, cacheType>
}
type cacheType = {
    totalPage: number,
    orders: OrderType[]
}


const initialState: initialStateType = {
    orders: [],
    isLoading: false,
    isLoadingSkeleton: false,
    totalPage: 0,
    page: 1,
    isError: null,
    cache: {}
}

const OrderList = createSlice({
    initialState, name: "OrderList",
    reducers: {
        resetOrders: (state) => {
            state.orders = []
            state.isLoading = false
            state.isLoadingSkeleton = false
            state.totalPage = 0
            state.page = 1
            state.isError = null
            state.cache = {}
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state, action) => {
            const { page } = action.meta.arg
            state.isLoading = (page || 1) > 1 ? true : false
            state.isLoadingSkeleton = (page || 1) == 1 ? true : false
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            const { orders, totalPage, cacheKey } = action.payload
            const { page } = action.meta.arg
            state.isLoading = false
            state.isLoadingSkeleton = false
            const result = (page || 1) == 1 ? orders : [...state.orders, ...orders]
            const dubilicateCheck = Array.from(new Map(result.map((item: OrderType) => [item._id, item])).values())
            state.orders = dubilicateCheck as OrderType[]
            state.totalPage = totalPage
            state.page = page || 1
            state.cache[cacheKey] = {
                totalPage,
                orders
            }
        })
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false
            state.isLoadingSkeleton = false
            state.isError = action.payload as string
        })
    },
})

export const { resetOrders } = OrderList.actions
export const orderListReducer = OrderList.reducer