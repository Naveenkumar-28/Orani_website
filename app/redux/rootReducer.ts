import { combineReducers } from "@reduxjs/toolkit";
import {
    notifyMessageReducer,
    productSliderListReducer,
    suggestionReducer,
    userReducer,
} from "./slices";
import { orderListReducer } from "../tempPages/(protected_pages)/orders/redux";
import { ProductReducer } from "../tempPages/(public_pages)/shop/redux";
import { AdminOrderListReducer } from "../admin/(routes)/orders/redux";
import { AddressReducer } from "../tempPages/(protected_pages)/checkout/redux";
import { specificProductReducer } from "../tempPages/(public_pages)/shop/[id]/redux";
import { cartListReducer } from "../tempPages/(public_pages)/cart/redux";
import { wishListReducer } from "../tempPages/(public_pages)/wishlist/redux/slice";
import { blogReducer } from "../tempPages/(public_pages)/blog/redux";
import { adminProductReducer, UploadProductReducer } from "../admin/(routes)/products/redux";
import { OverallSummaryReducer } from "../admin/(routes)/dashboard/redux/slice";
import { contactReducer } from "../tempPages/(public_pages)/contact/redux/slice";
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

        return appReducer({
            ...state,
            AdminOrders: undefined,
            AdminProducts: undefined,
            OrderList: undefined,
            OverallSummary: undefined,
            UploadProductData: undefined,
            UserDetails: undefined,
            CartItems: undefined,
            WishItems: undefined,
            Addresses: undefined,
        }, action);

    }
    return appReducer(state, action);
};

export default rootReducer;
