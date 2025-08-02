
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartLocalStoreList } from "../../utils";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/constants";

export const fetchCartList = createAsyncThunk('CartList/get', async (_, { rejectWithValue }) => {
    const cartProducts = getCartLocalStoreList() || []
    try {
        if (cartProducts.length == 0) return rejectWithValue("Your cart is empty")
        const response = await axios.post(`${BASE_URL}/cart_list`, { products: cartProducts })
        if (response.data.success) {
            console.log(response.data);
            const { products } = response.data
            return { products }
        }
        return rejectWithValue("Somthing went wrong!")
    } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || "Somthing went wrong!")
        }
        return rejectWithValue("Somthing went wrong!")
    }
})
