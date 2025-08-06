import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchSpecificProduct = createAsyncThunk("specificProduct/get", async ({ id }: { id: string }, { rejectWithValue }) => {

    try {
        const response = await api.get(`/products/${id}`)
        if (response.data.success) {
            console.log("specificProduct", response.data);
            const { relatedProducts, specificProduct } = response.data
            return { relatedProducts, specificProduct }
        }

    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
    }
})