import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "@/app/redux/store";
import { getWishListLocalStorage } from "../../utils";

export const fetchWishList = createAsyncThunk("wishlist/get", async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const products = getWishListLocalStorage() || []
    try {
        if (products.length == 0) return rejectWithValue("Your wishList is empty")
        const response = await axios.post(`${BASE_URL}/wish_list`, { products })
        if (response?.data?.success) {
            console.log(response?.data);
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