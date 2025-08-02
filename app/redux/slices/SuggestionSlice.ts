import { createSlice } from '@reduxjs/toolkit'
import { fetchSuggestions } from '../api';
import { SuggestionType } from '@/app/types';

interface SuggestionState {
    suggestions: SuggestionType[];
    loading: boolean;
    error: string | null;
    cache: Record<string, SuggestionType[]>;
}

const initialState: SuggestionState = {
    suggestions: [],
    loading: false,
    error: null,
    cache: {},
}

const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState,
    reducers: {
        clearSuggestions: (state) => {
            state.suggestions = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSuggestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.loading = false;
                const { data, cacheKey } = action.payload as { data: any[], cacheKey: string }
                state.suggestions = data;
                state.cache[cacheKey] = data;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSuggestions } = suggestionSlice.actions;
export const suggestionReducer = suggestionSlice.reducer;
