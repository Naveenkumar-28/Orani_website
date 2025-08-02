import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/logout`)
        if (response.data.success) {
            console.log(response.data);
            return fulfillWithValue("logout successfully")
        }
    } catch (error) {
        console.log({ error })
        return rejectWithValue("logout faild")
    }
})