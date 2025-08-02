import { RootState } from "@/app/redux/store";
import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchBlogs = createAsyncThunk("fetchBlogs/get", async ({ page = 1, limit = 4, search }: { page?: number, limit?: number, search?: string, firstTimeLoding?: boolean }, { getState, rejectWithValue }) => {
    const cacheKey = `blogs_page-${page}_limit-${limit}_search-${search || ""}`;
    const state = getState() as RootState;
    const cachedData = state.BlogList.cache[cacheKey];
    // Check if data is already cached
    if (cachedData) {
        const { blogs, totalPage, recentBlogs, categoryList: category } = cachedData;
        return { blogs, totalPage, recentBlogs, category, cacheKey }
    }
    // If not cached, fetch from API
    try {
        const response = await axios.get(`${BASE_URL}/blogs`, {
            params: {
                page,
                limit,
                search
            }
        })

        if (response?.data?.success) {
            console.log(response?.data);
            const { blogs, totalPage, recentBlogs, category } = response.data
            return { blogs, totalPage, recentBlogs, category, cacheKey }
        }

    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
    }
})