import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


type updateProductsType = {
    id: string,
    form: FormData
}


export const updateAdminProduct = createAsyncThunk('AdminProduct/update', async ({ id, form }: updateProductsType, { rejectWithValue }) => {

    try {
        const response = await api.patch(`/admin/products/${id}`, form)
        console.log('AdminProductList/updateProducts', response?.data);
        if (response?.data?.success) {
            const { updatedProduct } = response.data
            return { updatedProduct }
        }
        return rejectWithValue('Product update failed!')
    }
    catch (error) {
        console.log((error as Error).message)
        return rejectWithValue((error as Error).message || 'Product update failed!')
    }
})
