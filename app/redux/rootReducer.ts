import { combineReducers } from "@reduxjs/toolkit";
import {
    notifyMessageReducer,
    productSliderListReducer,
    suggestionReducer,
    userReducer,
} from "./slices";
import { orderListReducer } from "../pages/(protected_pages)/orders/redux";
import { ProductReducer } from "../pages/(public_pages)/shop/redux";
import { AdminOrderListReducer } from "../admin/(routes)/orders/redux";
import { AddressReducer } from "../pages/(protected_pages)/checkout/redux";
import { specificProductReducer } from "../pages/(public_pages)/shop/[id]/redux";
import { cartListReducer } from "../pages/(public_pages)/cart/redux";
import { wishListReducer } from "../pages/(public_pages)/wishlist/redux/slice";
import { blogReducer } from "../pages/(public_pages)/blog/redux";
import { adminProductReducer, UploadProductReducer } from "../admin/(routes)/products/redux";
import { OverallSummaryReducer } from "../admin/(routes)/dashboard/redux/slice";
import { contactReducer } from "../pages/(public_pages)/contact/redux/slice";
import { authLogout } from "./api";

const appReducer = combineReducers({
    UserDetails: userReducer,
    ProductList: ProductReducer,
    CartItems: cartListReducer,
    BlogList: blogReducer,
    WishItems: wishListReducer,
    OrderList: orderListReducer,
    NotifyMessage: notifyMessageReducer,
    Addresses: AddressReducer,
    UploadProductData: UploadProductReducer,
    ContactUs: contactReducer,
    AdminOrders: AdminOrderListReducer,
    AdminProducts: adminProductReducer,
    OverallSummary: OverallSummaryReducer,
    specificProduct: specificProductReducer,
    suggestion: suggestionReducer,
    productSliderList: productSliderListReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {

    if (authLogout.fulfilled.match(action)) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
