
import { configureStore } from "@reduxjs/toolkit"
import { listenerMiddleware } from "./middleware";
import rootReducer from "./rootReducer";

const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(listenerMiddleware.middleware)
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store