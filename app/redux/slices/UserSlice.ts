import { createSlice } from "@reduxjs/toolkit";
import { authEmailverify, authLogin, changeProfilePic, getUserdetails } from "../api";

type userType = {
    _id: string,
    name: string,
    imageUrl: string,
    email: string,
    role: string
}
const initialState = {
    user: null as userType | null,
    isLoading: true,
    isSignedIn: false,
    isError: null as string | null
}

const UserSlice = createSlice({
    initialState,
    name: 'user_info',
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload
            state.isLoading = false
            state.isSignedIn = !!user
            state.user = user
        },
        userReset: (state) => {
            state.isLoading = false
            state.isSignedIn = false
            state.user = null
            state.isError = null
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserdetails.pending, (state) => {
            state.isLoading = true
            state.isSignedIn = false
            state.user = null
            state.isError = null
        })
        builder.addCase(getUserdetails.fulfilled, (state, action) => {
            const { user } = action.payload as { user: userType }
            state.isLoading = false
            state.user = user
            state.isSignedIn = !!user
        })
        builder.addCase(getUserdetails.rejected, (state, action) => {
            state.isLoading = false
            state.isSignedIn = false
            state.user = null
            state.isError = action.payload as string
        })
        builder.addCase(authLogin.fulfilled, (state, action) => {
            const { user } = action.payload as { user: userType }
            state.isLoading = false
            state.user = user
            state.isSignedIn = !!user
            state.isError = null
        })
        builder.addCase(authEmailverify.fulfilled, (state, action) => {
            const { user } = action.payload as { user: userType }
            state.isLoading = false
            state.user = user
            state.isSignedIn = !!user
            state.isError = null
        })
        builder.addCase(changeProfilePic.fulfilled, (state, action) => {
            if (!action.payload?.user) return
            const { user } = action.payload
            state.isLoading = false
            state.user = user
            state.isSignedIn = !!user
            state.isError = null
        })
    },

})

export const { setUser, userReset } = UserSlice.actions
export const userReducer = UserSlice.reducer