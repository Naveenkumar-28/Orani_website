import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOverallSummary = createAsyncThunk('OverallSummary/fetchData', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/overall_summary`)
        if (response?.data?.success) {
            console.log("Overall summary", response.data);
            return response.data
        }
        return rejectWithValue('Somthing went wrong!')
    } catch (error) {
        console.log((error as Error).message)
        return rejectWithValue('Somthing went wrong!')
    }
})