import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const authRegister = createAsyncThunk('auth/register', async ({ data }: { data: { name: string, email: string, password: string } }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data)
        if (response.data.success) {
            return;
        }
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error?.response?.data?.message || "Somthing went wrong!")
        }
    }
})
