import api from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const deleteAdminProduct = createAsyncThunk('AdminProduct/delete', async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/admin/products/${id}`)

        if (response?.data?.success) {
            return;
        }
        return rejectWithValue('Product remove failed')
    }
    catch (error) {
        console.log((error as Error).message)
        return rejectWithValue((error as Error).message || 'Product remove failed')
    }
})
