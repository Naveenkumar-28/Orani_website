import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const BlogSlice = createSlice({
    initialState, name: "BlogList",
    reducers: {
        addBlogList: (state, action) => {
            return action.payload
        }
    }
})

export const { addBlogList } = BlogSlice.actions
export default BlogSlice.reducer