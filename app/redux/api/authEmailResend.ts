import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const authEmailResend = createAsyncThunk('auth/resend', async ({ email }: { email: string }, { rejectWithValue, fulfillWithValue }) => {
    try {
        const data = { email }
        const response = await axios.post(`${BASE_URL}/auth/resend`, data)
        if (response.data.success) {
            return fulfillWithValue(response.data)
        }
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error?.response?.data)
        }
    }
})