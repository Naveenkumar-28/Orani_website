import { BASE_URL } from "@/constants";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeProfilePic = createAsyncThunk('changeProfile/Pic', async ({ formData }: { formData: FormData }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const response = await api.post(`${BASE_URL}/changeProfile`, formData)
        if (response.data.success) {
            const { user } = response.data
            return fulfillWithValue({ user })
        }
    } catch (error) {
        console.log({ error })
        return rejectWithValue("Somthing went wrong!")
    }
})