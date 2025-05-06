import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    messages: [],
}

const notifyMessageSlice = createSlice({
    name: 'notifyMessage',
    initialState,
    reducers: {
        AddNotifyMessage: (state, action) => {
            state.messages.unshift({ id: uuidv4(), ...action.payload })
        },
        RemoveNotifyMessage: (state, action) => {
            state.messages = state.messages.filter((msg) => msg.id !== action.payload)
        },
    },
})

export const { AddNotifyMessage, RemoveNotifyMessage } = notifyMessageSlice.actions
export default notifyMessageSlice.reducer
