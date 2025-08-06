import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCartList } from "../slice";
import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export const addCart = createAsyncThunk(
    "cartList/add",
    async ({ _id, quantity = 1 }: { _id: string, quantity?: number }, { getState, dispatch, rejectWithValue }) => {

        const state = getState() as RootState
        if (state.CartItems.isSignedIn) {
            try {
                // send to backend
                const response = await api.post("/cart_list/add", { product: { _id, quantity } });
                if (response.data.success) {
                    const { product } = response.data
                    return { product }
                }
                return rejectWithValue("Somthing went wrong!")
            } catch (error) {
                console.log({ error })
                if (error instanceof AxiosError) {
                    return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
                }
                return rejectWithValue("Somthing went wrong!")
            }

        } else {
            // fallback to local cart
            dispatch(addCartList({ _id, quantity }));
        }
    }
);

