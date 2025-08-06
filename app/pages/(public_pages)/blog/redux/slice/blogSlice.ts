import { createSlice } from "@reduxjs/toolkit"
import { BlogType } from "../../types"
import { fetchBlogs } from "../api"

type initialStateType = {
    isLoading: boolean,
    loadingSkeleton: boolean,
    isError: string | null,
    blogs: BlogType[],
    page: number,
    totalPage: number,
    recentBlogs: BlogType[],
    categoryList: { name: string, count: number }[]
    cache: Record<string, cacheType>
}
type cacheType = {
    totalPage: number,
    blogs: BlogType[],
    recentBlogs: BlogType[],
    categoryList: { name: string, count: number }[]
}

const initialState: initialStateType = {
    isLoading: false,
    loadingSkeleton: false,
    isError: null,
    blogs: [],
    page: 1,
    totalPage: 0,
    recentBlogs: [],
    categoryList: [],
    cache: {}
}

const blogSlice = createSlice({
    initialState,
    name: "blogItems",
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBlogs.pending, (state, action) => {
            const { firstTimeLoding } = action.meta.arg
            state.isLoading = firstTimeLoding ? false : true
            state.loadingSkeleton = firstTimeLoding ? true : false
        })
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false
            state.loadingSkeleton = false
            if (!action.payload?.blogs && !action.payload?.totalPage) return
            const { blogs, totalPage, cacheKey } = action.payload
            const { page, search } = action.meta.arg
            state.blogs = blogs
            state.totalPage = totalPage

            if ((page || 1) == 1 && !search) {
                if (!action.payload?.category && !action.payload?.recentBlogs) return
                const { category, recentBlogs } = action.payload
                state.categoryList = category
                state.recentBlogs = recentBlogs

            }
            state.page = page || 1
            state.cache[cacheKey] = {
                totalPage: totalPage,
                blogs: blogs,
                recentBlogs: action.payload.recentBlogs || [],
                categoryList: action.payload.category || []
            }
        })
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.isLoading = false
            state.loadingSkeleton = false
            state.isError = action.payload as string
        })
    },

})

export const { } = blogSlice.actions
export const blogReducer = blogSlice.reducer