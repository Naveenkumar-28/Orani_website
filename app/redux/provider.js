"use client"; // Required for using Redux with Next.js App Router

import { Provider } from "react-redux";
import store from "./store";

export function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
