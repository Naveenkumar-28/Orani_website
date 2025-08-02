import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const authLogin = createAsyncThunk('auth/login', async ({ data }: { data: { email: string, password: string } }, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data)
        if (response.data.success) {
            console.log(response.data);
            const { user } = response.data
            return fulfillWithValue({ user })
        }
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error?.response?.data || {})
        }
    }
})