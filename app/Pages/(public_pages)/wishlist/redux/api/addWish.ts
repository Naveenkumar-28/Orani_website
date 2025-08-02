import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWishList } from "../slice";
import { RootState } from "@/app/redux/store";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export const addWish
    = createAsyncThunk(
        "wishlist/add",
        async ({ _id }: { _id: string }, { getState, dispatch, rejectWithValue }) => {

            const state = getState() as RootState
            if (state.WishItems.isSignedIn) {
                try {
                    // send to backend
                    const response = await api.post("/wish_list/add", { product: { _id } });
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
                dispatch(addWishList({ _id }));
            }
        }
    );

