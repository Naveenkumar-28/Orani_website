import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getDbWishList = createAsyncThunk('wishlist/GetDataBase', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/wish_list/getDb`)
        if (response.data.success) {
            console.log(response.data);
            const { products } = response.data
            return { products }
        }
        return rejectWithValue("Somthing went wrong!")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
        return rejectWithValue("Somthing went wrong!")
    }
})