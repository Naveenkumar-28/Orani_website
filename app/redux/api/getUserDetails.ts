import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserdetails = createAsyncThunk('userDetails/get', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/user-info`, { skipAuthRedirect: true })
        if (response.data.success) {
            console.log(response.data);
            const { user } = response.data
            return { user }
        }
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
    }
}) 