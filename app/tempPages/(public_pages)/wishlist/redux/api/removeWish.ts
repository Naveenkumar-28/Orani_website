import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { wishListRemove } from "../slice";

export const removeWish = createAsyncThunk(
    "wishlist/remove",
    async ({ _id }: { _id: string }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
        const state = getState() as RootState
        if (state.WishItems.isSignedIn) {
            try {
                // remove to database
                const response = await api.delete(`/wish_list/${_id}`);
                if (response?.data?.success) {
                    return;
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
            dispatch(wishListRemove({ _id }));
        }
    }
);
