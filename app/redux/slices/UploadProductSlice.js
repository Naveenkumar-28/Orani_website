import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: '',
    name: '',
    file: '',
    description: '',
    price: "",
    discountPrice: '',
    category: '',
    stock: '',
    ImageUrl: ''
}

const UploadProductSlice = createSlice({
    initialState, name: "uploadProduct",
    reducers: {
        SetProductData: (state, { payload }) => {
            switch (payload.type) {
                case "NAME":
                    return { ...state, name: payload.payload }
                case "DESCRIPTION":
                    return { ...state, description: payload.payload }
                case "PRICE":
                    return { ...state, price: payload.payload }
                case "DISCOUNTPRICE":
                    return { ...state, discountPrice: payload.payload }
                case "CATEGORY":
                    return { ...state, category: payload.payload }
                case "STOCK":
                    return { ...state, stock: payload.payload }
                case "EDITPRODUCT":
                    return { ...payload.payload }
                default:
                    return state
            }
        },
        ResetProductData: (state) => {
            return initialState
        }
    }
})

export const { SetProductData, ResetProductData } = UploadProductSlice.actions
export default UploadProductSlice.reducer