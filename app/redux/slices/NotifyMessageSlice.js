import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const NotifyMessageSlice = createSlice({
    initialState, name: "NotifyMessage",
    reducers: {
        AddNotifyMessage: (state, action) => {
            return action.payload
        }
    }
})

export const { AddNotifyMessage } = NotifyMessageSlice.actions
export default NotifyMessageSlice.reducer