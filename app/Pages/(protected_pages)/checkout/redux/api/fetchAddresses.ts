import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAddresses = createAsyncThunk('address/get', async ({ page = 1, limit = 5, refresh = false }: { page: number, limit: number, firstTimeLoading?: boolean, refresh?: boolean }, { rejectWithValue, getState }) => {
    const cacheKey = `Address_page_${page}`;
    const state = getState() as RootState
    const cache = state.Addresses.cache

    if (cache[cacheKey] && !refresh) {
        const { addresses, totalPage } = cache[cacheKey]
        return { addresses, totalPage, cacheKey };
    }
    try {
        const response = await api.get(`/address`, {
            params: {
                page, limit
            }
        })
        if (response.data.success) {
            console.log(response.data);
            const { addresses, totalPage } = response.data
            return { addresses, totalPage, cacheKey }
        }
        return rejectWithValue("Network failed!")
    } catch (error) {
        console.log({ error })
        return rejectWithValue("Network failed!")
    }
})
