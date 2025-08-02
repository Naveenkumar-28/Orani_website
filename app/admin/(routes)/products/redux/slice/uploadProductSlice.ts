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
    imageUrl: ''
}
export const UPLOADPRODUCT_ACTIONS = {
    NAME: 'NAME',
    DESCRIPTION: 'DESCRIPTION',
    PRICE: 'PRICE',
    DISCOUNTPRICE: "DISCOUNTPRICE",
    CATEGORY: 'CATEGORY',
    STOCK: 'STOCK',
    EDITPRODUCT: 'EDITPRODUCT',
}

const uploadProductSlice = createSlice({
    initialState, name: "uploadProduct",
    reducers: {
        SetProductData: (state, { payload }) => {
            switch (payload.type) {
                case UPLOADPRODUCT_ACTIONS.NAME:
                    return { ...state, name: payload.payload }
                case UPLOADPRODUCT_ACTIONS.DESCRIPTION:
                    return { ...state, description: payload.payload }
                case UPLOADPRODUCT_ACTIONS.PRICE:
                    return { ...state, price: payload.payload }
                case UPLOADPRODUCT_ACTIONS.DISCOUNTPRICE:
                    return { ...state, discountPrice: payload.payload }
                case UPLOADPRODUCT_ACTIONS.CATEGORY:
                    return { ...state, category: payload.payload }
                case UPLOADPRODUCT_ACTIONS.STOCK:
                    return { ...state, stock: payload.payload }
                case "FILE":
                    return { ...state, file: payload.payload }
                case UPLOADPRODUCT_ACTIONS.EDITPRODUCT:
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

export const { SetProductData, ResetProductData } = uploadProductSlice.actions
export const UploadProductReducer = uploadProductSlice.reducer