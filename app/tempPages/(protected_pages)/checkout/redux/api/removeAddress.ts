import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeAddress = createAsyncThunk('address/remove', async ({ _id }: { _id: string }, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/address/${_id}`)
        if (response.data.success) {
            console.log(response.data);
            return;
        }
        return rejectWithValue("Address remove failed!")
    } catch (error) {
        console.log({ error })
        return rejectWithValue("Address remove failed!")
    }
})
