import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchProductSliders = createAsyncThunk('productSlider/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/sliders`)
        if (response?.data?.success) {
            const { topRatedProducts, bestReviewedProducts, latestProducts } = response.data;
            return { topRatedProducts, bestReviewedProducts, latestProducts }
        }
        return rejectWithValue("Somthing went wrong")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error?.response?.data?.message || "Somthing went wrong")
        }
        return rejectWithValue("Somthing went wrong")
    }
})