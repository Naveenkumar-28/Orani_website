import { AppDispatch, RootState } from '@/app/redux/store';
import { createSendMessage } from '@/utils';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { newProductSchema } from '../utils';
import { FormErrors, UploadFormData, useAddProductHandlerPropsType } from '../types';
import { AddAdminProducts, SetProductData } from '../redux';

const initialState = {
    name: { error: false, success: true },
    description: { error: false, success: true },
    price: { error: false, success: true },
    discountPrice: { error: false, success: true },
    category: { error: false, success: true },
    stock: { error: false, success: true },
    file: { error: false, success: true }
}


export const useAddProductHandler = ({ closeHandler, fetchProducts }: useAddProductHandlerPropsType) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [Errors, setErrors] = useState(initialState)
    const ProductDetails = useSelector((state: RootState) => state.UploadProductData);
    const dispatch = useDispatch<AppDispatch>();
    const sendMessage = createSendMessage()
    const { page, isLoading } = useSelector((state: RootState) => state.AdminProducts)

    const ProductUpload = useCallback(async (data: UploadFormData) => {
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
            await dispatch(AddAdminProducts(form)).unwrap()
            fetchProducts(page, true)
            sendMessage.success("Product uploaded Successfully")

        } catch (error) {
            console.log(error)
            sendMessage.error("Product upload failed")
        }

    }, [dispatch, closeHandler, page, sendMessage, fetchProducts])


    // Validate the product details before uploading
    // If any field is empty, show a notification message and return
    const onValidateHandler = useCallback(async () => {
        const { name, description, price, discountPrice, category, stock } = ProductDetails
        setErrors(initialState)
        try {
            const data = await newProductSchema.validate({ name, description, price, discountPrice, category, stock, file: selectedFile }, { abortEarly: false })
            console.log(data);
            if (data) {
                ProductUpload(data as UploadFormData)
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
    }, [ProductDetails, selectedFile, newProductSchema, ProductUpload, sendMessage, initialState])

    // File handler to validate image size and set the file in the state
    const fileHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0]
        if (!file) return

        const maxSize = 1 * 1024 * 1024

        if (!file.type.startsWith("image/")) {
            sendMessage.error("Please upload a valid image file");
            return;
        }
        if (file.size >= maxSize) {
            sendMessage.error("Image size exceeds the 1MB limit");
            return;
        }
        setSelectedFile(file)

    }, [sendMessage])

    const onDropHandler = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e?.dataTransfer?.files?.[0]
        if (!file) return
        const maxSize = 1 * 1024 * 1024
        if (!file.type.startsWith("image/")) {
            sendMessage.error("Please upload a valid image file");
            return;
        }
        if (file.size >= maxSize) {
            sendMessage.error("Image size exceeds the 1MB limit");
            return;
        }
        setSelectedFile(file)

    }, [sendMessage])

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name.toUpperCase()
        const value = e.target.value
        dispatch(SetProductData({ type: name, payload: value }))
    }, [dispatch])

    //Upload new product form data
    const uploadProductFormData = useMemo(() => [
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
            value: ProductDetails.discountPrice,
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





    return { onValidateHandler, isLoading, uploadProductFormData, fileHandler, selectedFile, setSelectedFile, onDropHandler, Errors }
}