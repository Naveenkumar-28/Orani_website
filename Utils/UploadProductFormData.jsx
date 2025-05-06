"use client"
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { SetProductData } from "@/app/redux/slices/UploadProductSlice";
import { AddNotifyMessage } from "@/app/redux/slices/NotifyMessageSlice";

const useProductFormData = () => {
    const ProductDetails = useSelector(state => state.UploadProductData);
    const dispatch = useDispatch();

    const categoryHandler = useCallback((value) => {
        dispatch(SetProductData({ type: "CATEGORY", payload: value }));
    }, [])

    console.log("rendering form data", ProductDetails);

    // Discount price handler to validate the discount price against the original price
    const discountPriceHandler = useCallback((e) => {
        console.log(e.target.value, ProductDetails.price);

        if (Number(e?.target?.value) < Number(ProductDetails?.price)) {
            return dispatch(SetProductData({ type: "DISCOUNTPRICE", payload: e.target.value }));
        }
        dispatch(AddNotifyMessage({ message: "Discount Price should be less than to Price", type: 'error' }));
    }, [ProductDetails?.price])

    //Upload new product form data
    const uploadProductFormData = useMemo(() => [
        {
            labelName: "Name :",
            title: "name",
            onchange: (e) => dispatch(SetProductData({ type: "NAME", payload: e.target.value })),
            type: "text",
            placeholder: "Enter product name",
            Element: "input"
        },
        {
            labelName: "Description :",
            title: "description",
            onchange: (e) => dispatch(SetProductData({ type: "DESCRIPTION", payload: e.target.value })),
            type: "textarea",
            placeholder: "Enter product Description",
            Element: "textarea"
        },
        {
            labelName: "Price :",
            title: "price",
            onchange: (e) => dispatch(SetProductData({ type: "PRICE", payload: e.target.value })),
            type: "number",
            placeholder: "Enter product price",
            Element: "input"
        },
        {
            labelName: "Discount Price :",
            title: "discountPrice",
            onchange: discountPriceHandler,
            type: "number",
            placeholder: "Enter discount price (Optional)",
            Element: "input"
        },
        {
            labelName: "Category :",
            title: "category",
            onchange: categoryHandler,
            type: "select",
            placeholder: "Select Category",
            Element: "select"
        },
        {
            labelName: "Stock :",
            title: "stock",
            onchange: (e) => dispatch(SetProductData({ type: "STOCK", payload: e.target.value })),
            type: "number",
            placeholder: "Enter product stock",
            Element: "input"
        }
    ], [ProductDetails?.price])




    return uploadProductFormData
};

export { useProductFormData }
