import { createSlice } from "@reduxjs/toolkit"
import { sendMessageThunk } from "../api";

type initialStateType = {
    isLoading: boolean,
    isError: null | string,
    contactUs: {
        name: string,
        email: string,
        subject: string,
        message: string
    }
}

const initialState: initialStateType = {
    isLoading: false,
    isError: null,
    contactUs: {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
}


export const CONTACT_FORM_ACTIONS = {
    NAME: 'NAME',
    EMAIL: 'EMAIL',
    SUBJECT: 'SUBJECT',
    MESSAGE: 'MESSAGE'
}

const ContactSlice = createSlice({

    initialState,
    name: "contactUs",
    reducers: {
        setMessageData: (state, { payload }) => {

            switch (payload.type) {
                case CONTACT_FORM_ACTIONS.NAME:
                    state.contactUs = { ...state.contactUs, name: payload.payload };
                    break;
                case CONTACT_FORM_ACTIONS.EMAIL:
                    state.contactUs = { ...state.contactUs, email: payload.payload };
                    break;
                case CONTACT_FORM_ACTIONS.SUBJECT:
                    state.contactUs = { ...state.contactUs, subject: payload.payload };
                    break;
                case CONTACT_FORM_ACTIONS.MESSAGE:
                    state.contactUs = { ...state.contactUs, message: payload.payload };
                    break;
                default:
                    return state;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(sendMessageThunk.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.contactUs = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                }
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload as string || "Message send failed"
            })
    },
})

export const { setMessageData } = ContactSlice.actions
export const contactReducer = ContactSlice.reducer