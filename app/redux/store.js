
import { configureStore } from "@reduxjs/toolkit"
import ProductListSlice from "./slices/productListSlice"
import CartListSlice from "./slices/CartSlice"
import WishListSlice from "./slices/wishListSlice"
import OrderSlice from "./slices/OrderListSlice"
import BlogSlice from "./slices/BlogSlice"
import NotifyMessageSlice from "./slices/NotifyMessageSlice"

const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        ProductList: ProductListSlice,
        CartList: CartListSlice,
        BlogList: BlogSlice,
        WishList: WishListSlice,
        OrderList: OrderSlice,
        NotifyMessage: NotifyMessageSlice
    }
})

export default store