"use client"
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { AppDispatch, RootState } from "@/app/redux/store";
import { createSendMessage } from "@/utils";
import { FormErrors, UploadFormData } from "../types";
import * as Yup from "yup";
import { editProductSchema } from "../utils";
import { SetProductData, updateAdminProduct } from "../redux";

const initialState = {
    name: { error: false, success: true },
    description: { error: false, success: true },
    price: { error: false, success: true },
    discountPrice: { error: false, success: true },
    category: { error: false, success: true },
    stock: { error: false, success: true },
    file: { error: false, success: true }
}

type EditProductPropsType = {
    closeHandler: () => void
}

export const useEditProductHandler = ({ closeHandler }: EditProductPropsType) => {
    const [Errors, setErrors] = useState(initialState)
    const ProductDetails = useSelector((state: RootState) => state.UploadProductData);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const sendMessage = createSendMessage()
    const { isLoading } = useSelector((state: RootState) => state.AdminProducts)

    // Function to upload the product after validation
    const ProductUpload = useCallback(async (id: string, data: UploadFormData) => {
        const form = new FormData()
        Object.entries(data).forEach((([name, value]) => {
            if (value instanceof File) {

                form.append(name, value);
            } else {
                if (name == 'discountPrice' && value === 0) {
                    return form.append(name, '');
                }
                form.append(name, String(value))
            }

        }))
        closeHandler()
        try {
            await dispatch(updateAdminProduct({ id, form })).unwrap()
            sendMessage.success("Product update successfully")
        } catch (error) {
            sendMessage.error("Product update failed")
        }

    }, [closeHandler, dispatch, sendMessage])

    // Validate the product details before uploading
    const validateHandler = useCallback(async () => {
        const { name, description, price, discountPrice, category, stock, _id } = ProductDetails
        setErrors(initialState)
        try {
            const data = await editProductSchema.validate({ name, description, price, discountPrice, category, stock, file: selectedFile ? selectedFile : '' }, { abortEarly: false })
            console.log(data);
            if (data) {
                ProductUpload(_id, data as UploadFormData)
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const message = error.inner[0].message
                const value = { ...initialState };
                error.inner.forEach((err) => {
                    const name = err.path as keyof FormErrors
                    if (name && value[name]) {
                        value[name] = {
                            error: true,
                            success: false,
                        }
                    }
                });
                setErrors(value)
                sendMessage.error(message)
            }
        }
    }, [Errors, ProductDetails, selectedFile, ProductUpload])

    // Handler to change the input values and update the state
    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name.toUpperCase()
        const value = e.target.value
        dispatch(SetProductData({ type: name, payload: value }))
    }, [dispatch])

    //Edit product form data
    const EditProductFormData = useMemo(() => [
        {
            name: 'name',
            title: "name :",
            onChange: onChangeHandler,
            type: "text",
            placeholder: "Enter product name",
            element: "input",
            value: ProductDetails.name,
            error: Errors.name,
        },
        {
            name: 'description',
            title: "description :",
            onChange: onChangeHandler,
            type: "textarea",
            placeholder: "Enter product Description",
            element: "textarea",
            value: ProductDetails.description,
            error: Errors.description
        },
        {
            name: 'price',
            title: "price :",
            onChange: onChangeHandler,
            type: "number",
            placeholder: "Enter product price",
            element: "input",
            value: ProductDetails.price,
            error: Errors.price,
            onWheel: (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()
        },
        {
            name: 'discountPrice',
            title: "discount Price :",
            onChange: onChangeHandler,
            type: "number",
            placeholder: "Enter discount price (Optional)",
            element: "input",
            value: ProductDetails.discountPrice || '',
            error: Errors.discountPrice,
            onWheel: (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()
        },
        {
            name: "category",
            title: "category :",
            type: "select",
            placeholder: "Select Category",
            element: "select",
            value: ProductDetails.category,
            error: Errors.category,
            onClick: (value: string) => dispatch(SetProductData({ type: 'CATEGORY', payload: value })),
            options: ["oranges", "juice", "vegetables", "fruits"]
        },
        {
            name: "stock",
            title: "stock :",
            onChange: onChangeHandler,
            type: "number",
            placeholder: "Enter product stock",
            element: "input",
            value: ProductDetails.stock,
            error: Errors.stock,
            onWheel: (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()

        }
    ], [ProductDetails, Errors, onChangeHandler])


    return { EditProductFormData, Errors, isLoading, selectedFile, setSelectedFile, validateHandler }
};

