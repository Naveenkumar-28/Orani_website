import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
}

const ContactSlice = createSlice({
    initialState, name: "contactUs",
    reducers: {
        setMessageData: (state, { payload }) => {
            switch (payload.type) {
                case "NAME":
                    return { ...state, name: payload.payload };
                case "EMAIL":
                    return { ...state, email: payload.payload };
                case "SUBJECT":
                    return { ...state, subject: payload.payload };
                case "MESSAGE":
                    return { ...state, message: payload.payload };
                default:
                    return state;
            }
        }
    }
})

export const { setMessageData } = ContactSlice.actions
export default ContactSlice.reducer