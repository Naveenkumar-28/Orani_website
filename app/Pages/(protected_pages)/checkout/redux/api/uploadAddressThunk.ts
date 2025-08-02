import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AddressFormType } from "../../types";

export const uploadAddressThunk = createAsyncThunk('address/upload', async ({ address }: { address: AddressFormType }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/address`, address)
        if (response.data.success) {
            console.log(response.data);
            return;
        }
        return rejectWithValue("Address upload failed!")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data || "Address upload failed!")
        }
        return rejectWithValue("Address upload failed!")
    }
})
