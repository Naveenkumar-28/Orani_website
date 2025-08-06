import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AddressFormType } from "../../types";

export const editAddress = createAsyncThunk('address/edit', async ({ _id, address }: { _id: string, address: AddressFormType }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/address/${_id}`, address)
        if (response.data.success) {
            console.log(response.data);
            const { address } = response.data
            return { address }
        }
        return rejectWithValue("Address edit failed!")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data || "Address edit failed!")
        }
        return rejectWithValue("Address edit failed!")
    }
})
