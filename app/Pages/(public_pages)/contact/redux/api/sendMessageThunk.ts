import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { contactUsType } from "../../types";
import { BASE_URL } from "@/constants";

export const sendMessageThunk = createAsyncThunk('contactUs/Send', async ({ data }: { data: contactUsType }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/send_message`, data)
        if (response.data.success) {
            console.log(response.data);
            return;
        }
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Message send failed!")
        }
    }
})