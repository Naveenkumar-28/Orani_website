import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const OrderList = createSlice({
    initialState, name: "OrderList",
    reducers: {
        addOrderList: (state, action) => {
            return [...state, action.payload]
        }
    }
})

export const { addOrderList } = OrderList.actions
export default OrderList.reducer