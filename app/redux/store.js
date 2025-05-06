
import { configureStore } from "@reduxjs/toolkit"
import ProductListSlice from "./slices/productListSlice"
import CartListSlice from "./slices/CartSlice"
import WishListSlice from "./slices/wishListSlice"
import OrderSlice from "./slices/OrderListSlice"
import BlogSlice from "./slices/BlogSlice"
import NotifyMessageSlice from "./slices/NotifyMessageSlice"
import AddressSlice from "./slices/AddressSlice"
import UploadProductSlice from "./slices/UploadProductSlice"
import ContactSlice from "./slices/ContactSlice"

const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        ProductList: ProductListSlice,
        CartList: CartListSlice,
        BlogList: BlogSlice,
        WishList: WishListSlice,
        OrderList: OrderSlice,
        NotifyMessage: NotifyMessageSlice,
        Address: AddressSlice,
        UploadProductData: UploadProductSlice,
        ContactUs: ContactSlice
    }
})
export const RootState = store.getState
export default store