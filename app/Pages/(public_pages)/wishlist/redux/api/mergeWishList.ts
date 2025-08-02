import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getWishListLocalStorage } from "../../utils";

export const mergeWishList = createAsyncThunk('wishlist/merge', async (_, { rejectWithValue }) => {
    const wishProducts = getWishListLocalStorage() || []
    try {
        if (wishProducts.length == 0) return rejectWithValue("Your wishlist is empty")
        const response = await api.post(`/wish_list/merge`, { productIds: wishProducts })
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
