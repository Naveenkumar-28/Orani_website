import React, { useCallback, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Button from "@/components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import axios from 'axios';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import bodyOverflowHandler from '@/hooks/bodyOverFlowHandler';
import { ResetProductData, SetProductData } from '@/app/redux/slices/UploadProductSlice';
import { renderElement } from '@/Utils/RenderElement';
import { useProductFormData } from '@/Utils/UploadProductFormData';

function EditProduct({ setEditShow, productList, EditShow, GetProductList }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const EditProductFormData = useProductFormData()
    const ProductDetails = useSelector(state => state.UploadProductData)

    // Set the initial state of the component when it mounts
    useEffect(() => {
        const product = productList.find((product) => product._id == EditShow)
        if (!product) return setEditShow(false)
        const { name, description, price, discountPrice, category, stock, ImageUrl, _id } = product
        const data = {
            id: _id,
            name: name,
            file: '',
            description: description,
            price: price,
            discountPrice: discountPrice,
            category: category,
            stock: stock,
            ImageUrl: ImageUrl
        }
        dispatch(SetProductData({ type: 'EDITPRODUCT', payload: data }))
    }, [])

    useDebounceEffect(() => {
        bodyOverflowHandler(true)
        setIsActive(true)
    }, [], 200)

    // Function to send notification messages using Redux
    const sendMessage = useCallback((message) => {
        dispatch(AddNotifyMessage({ message, type: 'error' }))
    }, [])

    // Validate the product details before uploading
    // If any field is empty, show a notification message and return
    const ProductUpload = useCallback(async () => {

        const { name, description, price, discountPrice, category, stock, id } = ProductDetails
        if (!id) return
        if (!name) return sendMessage("Please fill Name")
        if (!description) return sendMessage("Please fill description")
        if (!price) return sendMessage("Please fill price")
        if (!category) return sendMessage("Please select category")

        const form = new FormData()
        form.append("name", name);
        form.append("file", selectedFile || ''); // Append the file
        form.append("description", description);
        form.append("price", price);
        form.append("discountPrice", discountPrice || '');
        form.append("category", category);
        form.append("stock", stock || 0)

        setLoading(true)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${id}`, form)
            console.log(response?.data);
            if (response?.data?.success) {
                GetProductList()
                dispatch(AddNotifyMessage({ message: "Update Successfully" }))
            }

        } catch (error) {
            console.log(error.message)
            dispatch(AddNotifyMessage({ message: "Update failed", type: 'error' }))
        } finally {
            setLoading(false)
            closeSlider()
        }

    }, [ProductDetails, selectedFile])


    // File handler to validate image size and set the file in the state
    const fileHandler = useCallback((e) => {
        const file = e?.target?.files[0]
        if (!file) return
        const maxSize = 1 * 1024 * 1024
        if (!(file.size < maxSize)) {
            dispatch(AddNotifyMessage({ message: "Image size exceeds the 1MB limit", type: 'error' }))
            return
        }
        setSelectedFile(file)
    }, [])

    // Handler to close the slider and reset the state after a timeout
    const closeSlider = useCallback(() => {
        setIsActive(false)
        const timeOut = setTimeout(() => {
            setEditShow('')
            bodyOverflowHandler(false)
            dispatch(ResetProductData())
        }, 500);
        return () => clearTimeout(timeOut)
    }, [])


    return (
        <section className='fixed top-0 left-0  w-full h-full z-100 flex justify-end'>
            <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 pb-20 duration-500 ${isActive ? "translate-x-0" : "translate-x-full"} `}>
                <div className='flex justify-between items-center py-5 shadow-lg px-5'>
                    <h1 className='font-medium text-lg'>Edit Product</h1>
                    <button title='Close' onClick={closeSlider} className='text-3xl cursor-pointer hover:text-red-500'><IoCloseOutline /></button>
                </div>
                <section className='px-5 gap-5 flex flex-col overflow-y-scroll h-full  pb-14'>
                    <div className=' pt-8' >
                        <div className='flex justify-between items-center mb-5'>
                            <h1 className='font-medium text-lg'>Upload Image</h1>
                            <label role='button' htmlFor='file' className='bg-green active:shadow-none text-white cursor-pointer rounded-sm flex justify-center items-center flex-col py-2 px-3 shadow-md'>
                                <p className='text-sm'>Change Image</p>
                                <input onChange={fileHandler} id='file' accept='image/png,image/jpeg,image/jpg' type="file" className='hidden' />
                            </label>
                        </div>
                        {!selectedFile ? (
                            <div className='rounded-sm overflow-hidden h-62 border-2 border-green'>
                                {ProductDetails?.ImageUrl ? (

                                    <img src={ProductDetails?.ImageUrl} className='h-full w-full object-contain' alt="Upload_Image" />
                                ) : (
                                    <p className='text-gray-500'>Please Select Image</p>
                                )}
                            </div>
                        ) : (
                            <div className='rounded-sm overflow-hidden h-62 border-2 border-green'>
                                <img src={URL.createObjectURL(selectedFile)} className='h-full w-full object-contain' alt="Upload_Image" />
                            </div>
                        )}

                    </div>
                    {
                        // Map through the form data and render the input elements dynamically
                        EditProductFormData.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-col gap-1'>
                                    {renderElement(item.Element, {
                                        labelName: item.labelName,
                                        value: ProductDetails[item.title],
                                        onChange: item.onchange,
                                        type: item.type,
                                        placeholder: item.placeholder
                                    })}
                                </div>
                            )
                        })
                    }
                    <Button loading={loading} onClick={ProductUpload} loadingContent='Updating . . . ' title={"Update"} />
                </section>
            </div>
            <div onClick={closeSlider} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

            </div>
        </section>
    )
}

export default EditProduct