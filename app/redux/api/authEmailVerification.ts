import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const authEmailverify = createAsyncThunk('auth/emailverify', async ({ data }: { data: { code: string, email: string } }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/emailverify`, data)
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
