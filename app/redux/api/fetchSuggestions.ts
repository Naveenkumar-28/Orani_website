import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


export const fetchSuggestions = createAsyncThunk('suggestion/fetchSuggestions', async ({ search, category = 'all', limit = 8 }: { search: string, category?: string, limit: number }, { getState, rejectWithValue }) => {

    const cacheKey = `suggestion_${search}_${category}`;
    const state = getState() as RootState
    const cache = state.suggestion.cache

    if (cache[cacheKey]) {
        return { data: cache[cacheKey], cacheKey };
    }

    try {
        const categoryParam = category !== 'all' && category !== '' ? category : '';

        const response = await axios.get(`${BASE_URL}/suggestion`, {
            params: {
                search,
                category: categoryParam,
                limit
            }
        });

        if (response.data.success) {
            const { suggestionProducts } = response.data
            return { data: suggestionProducts, cacheKey };
        } else {
            return rejectWithValue('Failed to fetch suggestions');
        }
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
}
);