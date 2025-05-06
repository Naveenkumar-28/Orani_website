import React, { useCallback, useEffect, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import Button from "@/components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import axios from 'axios';
import bodyOverflowHandler from '@/hooks/bodyOverFlowHandler';
import { useProductFormData } from "../../Utils/UploadProductFormData";
import { renderElement } from "../../Utils/RenderElement";
import { ResetProductData } from '@/app/redux/slices/UploadProductSlice';

function UploadNewProduct({ setLayerShow, GetProductList }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const ProductDetails = useSelector(state => state.UploadProductData)
    const uploadNewProductFormData = useProductFormData()

    useEffect(() => {
        bodyOverflowHandler(true)
        const timeOut = setTimeout(() => {
            setIsActive(true)
        }, 200);
        return () => clearTimeout(timeOut)
    }, [])


    // File handler to validate image size and set the file in the state
    const fileHandler = useCallback((e) => {
        const file = e?.target?.files?.[0]
        if (!file) return
        const maxSize = 1 * 1024 * 1024
        if (!(file.size < maxSize)) {

            return dispatch(AddNotifyMessage({ message: "Image size exceeds the 1MB limit", type: 'error' }))
        }
        setSelectedFile(file)

    }, [])

    // Handler to close the slider and reset the state after a timeout
    const closeSlider = () => {
        setIsActive(false)
        const timeOut = setTimeout(() => {
            bodyOverflowHandler(false)
            setLayerShow(false)
            dispatch(ResetProductData())
        }, 500);
        return () => clearTimeout(timeOut)
    }

    // Function to send notification messages using Redux
    const sendMessage = useCallback((message) => {
        dispatch(AddNotifyMessage({ message, type: 'error' }))
    }, [])

    // Validate the product details before uploading
    // If any field is empty, show a notification message and return
    const ProductUpload = useCallback(async () => {

        const { name, description, price, discountPrice, category, stock } = ProductDetails

        if (!name) return sendMessage("Please fill Name")
        if (!selectedFile) return sendMessage("Please choose image")
        if (!description) return sendMessage("Please fill description")
        if (!price) return sendMessage("Please fill price")
        if (!category) return sendMessage("Please select category")
        if (!stock) return sendMessage("Please fill stock ")

        const form = new FormData()
        form.append("name", name);
        form.append("file", selectedFile); // Append the file
        form.append("description", description);
        form.append("price", price);
        form.append("discountPrice", discountPrice || null);
        form.append("category", category);
        form.append("stock", stock)

        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/upload`, form)
            console.log(response?.data);
            if (response?.data?.success) {
                GetProductList()
                dispatch(AddNotifyMessage({ message: "Upload Successfully" }))
            }

        } catch (error) {
            console.log(error.message)
            dispatch(AddNotifyMessage({ message: "Upload failed", type: 'error' }))
        } finally {
            setLoading(false)
            closeSlider()
        }

    }, [ProductDetails, selectedFile])


    return (
        <section className={`fixed top-0 left-0  w-full h-full z-100 flex justify-end `}>
            <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 pb-20 duration-500 ${isActive ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex justify-between items-center py-5 shadow-lg px-5'>
                    <h1 className='font-medium text-lg'>Add New Product</h1>
                    <button onClick={closeSlider} className='text-3xl cursor-pointer'><IoCloseOutline /></button>
                </div>
                <section className='px-5 gap-5 flex flex-col overflow-y-scroll h-full  pb-14'>
                    <div className=' pt-8' >
                        <div className='flex justify-between items-center mb-5'>
                            <h1 className='font-medium text-lg'>Upload Image</h1>
                            {selectedFile && <div className='flex items-center justify-center gap-1'>
                                <p>{selectedFile?.name}</p>
                                <IoCloseOutline className='text-2xl hover:text-red-600 cursor-pointer' onClick={(e) => setSelectedFile(null)} />
                            </div>}
                        </div>
                        {!selectedFile ? (

                            <label htmlFor='file' className='border-2 gap-2 cursor-pointer border-gray-200 rounded-sm h-62 flex justify-center items-center flex-col text-gray-500'>
                                <FiUploadCloud className='text-2xl' />
                                <p className='text-sm'>Drag & drop or click to Upload Image</p>
                                <input onChange={fileHandler} id='file' accept='image/png,image/jpeg,image/jpg' type="file" className='hidden' />
                            </label>
                        ) : (
                            <div className='rounded-sm overflow-hidden h-62 border-2 border-green'>
                                <img src={URL.createObjectURL(selectedFile)} className='h-full w-full object-contain' alt="Upload_Image" />
                            </div>
                        )}
                    </div>
                    {
                        // Map through the form data and render the input elements dynamically
                        uploadNewProductFormData.map((item, index) => {
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
                    <Button loading={loading} loadingContent='Uploading . . .' onClick={ProductUpload} title={"Upload"} />
                </section>
            </div>
            <div onClick={closeSlider} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

            </div>
        </section>
    )
}

export default UploadNewProduct