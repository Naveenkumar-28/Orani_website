import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authEmailverify, authLogin, getUserdetails } from "../api";
import { updateCartListIsSignIn } from "@/app/tempPages/(public_pages)/cart/redux";
import { updateWishListIsSignIn } from "@/app/tempPages/(public_pages)/wishlist/redux";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator: getUserdetails.fulfilled,
    effect: async (action, listenerApi) => {
        if (!action.payload?.user) return
        const { user } = action.payload
        if (user) {
            listenerApi.dispatch(updateCartListIsSignIn(true))
            listenerApi.dispatch(updateWishListIsSignIn(true))
        }
    }
})

// second listener
listenerMiddleware.startListening({
    actionCreator: authLogin.fulfilled,
    effect: async (action, listenerApi) => {
        if (!action.payload?.user) return
        const { user } = action.payload
        if (user) {
            listenerApi.dispatch(updateCartListIsSignIn(true))
            listenerApi.dispatch(updateWishListIsSignIn(true))
        }
    }
})
// third listener
listenerMiddleware.startListening({
    actionCreator: authEmailverify.fulfilled,
    effect: async (action, listenerApi) => {
        if (!action.payload?.user) return
        const { user } = action.payload
        if (user) {
            listenerApi.dispatch(updateCartListIsSignIn(true))
            listenerApi.dispatch(updateWishListIsSignIn(true))
        }
    }
})
