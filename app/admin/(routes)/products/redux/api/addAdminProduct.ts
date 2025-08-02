import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddAdminProducts = createAsyncThunk('AdminProducts/add', async (form: FormData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/admin/products/upload`, form)
        if (response?.data?.success) {
            console.log("products/getAdminProduct", response.data);
            return;
        }
        return rejectWithValue('Product upload failed!')
    } catch (error) {
        console.log((error as Error).message)
        return rejectWithValue((error as Error).message || 'Product upload failed!')
    }
})