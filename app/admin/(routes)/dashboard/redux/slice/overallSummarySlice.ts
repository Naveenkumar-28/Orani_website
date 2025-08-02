import { createSlice } from "@reduxjs/toolkit"
import { getOverallSummary } from "../api";

type topSoldProductsType = {
    name: string,
    imageUrl: string,
    price: number,
    discountPrice: number | null,
    _id: string,
    sold: number
}

type OrderSummary = {
    totalOrders: number,
    totalRevenue: number,
    totalUsers: number,
    ordersSummaryData: {
        months: string[],
        revenueData: number[],
        ordersData: number[],
        avgRevenueData: number[]
    },
    topSoldProducts: topSoldProductsType[],
    recentOrders: any[],
    reviewBreakdown: reviewBreakdownType[]
}

type reviewBreakdownType = {
    rating: number,
    count: number
}

type initialStateType = {
    loading: boolean;
    error: string | null;
    data: OrderSummary | null
}

const initialState: initialStateType = {
    loading: false,
    error: null,
    data: null

};

const OverallSummarySlice = createSlice({
    initialState, name: "OverallSummary",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOverallSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOverallSummary.fulfilled, (state, action) => {
                console.log('payload', action.payload);
                state.loading = false;
                state.data = action.payload.data

            })
            .addCase(getOverallSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export const { } = OverallSummarySlice.actions
export const OverallSummaryReducer = OverallSummarySlice.reducer