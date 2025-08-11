import React, { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from "@/components";
import { useDispatch, useSelector } from 'react-redux';
import { bodyOverflowHandler } from '@/utils';
import { createSendMessage } from '@/utils';
import { RootState } from '@/app/redux/store';
import { useEditProductHandler } from '../hooks';
import { InputField } from './InputField';
import { ProductType } from '../../../types';
import { TbArrowsExchange } from 'react-icons/tb';
import { ResetProductData, SetProductData } from '../redux';
import { ProductCardType } from '../types';
import { PreviewImage } from './PreviewImage';

type PropsType = {
    onDismiss: React.Dispatch<SetStateAction<ProductCardType | null>>
    product: ProductType,
    fetchProducts: (page?: number, isFiltering?: boolean) => void;
}

export function EditProduct({ onDismiss, product, fetchProducts }: PropsType) {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()
    const ProductDetails = useSelector((state: RootState) => state.UploadProductData)
    const sendMessage = createSendMessage()
    const timeOutRef = useRef<NodeJS.Timeout | null>(null)

    // Handler to close the slider and reset the state after a timeout
    const closeHandler = useCallback(() => {
        setIsActive(false)
        if (timeOutRef.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            onDismiss(null)
            bodyOverflowHandler(false)
            dispatch(ResetProductData())
        }, 500);

    }, [onDismiss, bodyOverflowHandler, dispatch])

    const {
        EditProductFormData,
        isLoading,
        selectedFile,
        setSelectedFile,
        validateHandler
    } = useEditProductHandler({ closeHandler, fetchProducts })

    // Set the initial state of the component when it mounts
    useEffect(() => {
        const { name, description, price, discountPrice, category, stock, imageUrl, _id } = product
        const data = {
            _id: _id,
            name: name,
            file: '',
            description: description,
            price: price,
            discountPrice: discountPrice,
            category: category,
            stock: stock,
            imageUrl: imageUrl
        }
        dispatch(SetProductData({ type: 'EDITPRODUCT', payload: data }))
    }, [product, dispatch])

    // Effect to handle body overflow and animation on component mount
    useEffect(() => {
        bodyOverflowHandler(true)
        if (timeOutRef.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setIsActive(true)
        }, 200);
        return () => { if (timeOutRef.current) clearTimeout(timeOutRef.current) }
    }, [])


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




    return (
        <section className='fixed top-0 left-0 bottom-0  w-full h-full z-100 flex justify-end'>
            <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 duration-500 ${isActive ? "translate-x-0" : "translate-x-full"} `}>
                <div className='flex justify-between items-center px-5 h-18 border-b border-gray-200'>
                    <h1 className='font-medium md:text-xl text-lg'>Edit Product</h1>
                    <button title='Close' onClick={closeHandler} className='text-3xl cursor-pointer hover:text-red-500'><IoCloseOutline /></button>
                </div>
                <section className='px-5 gap-5 flex flex-col overflow-y-scroll h-[calc(100%-4.5rem)] pb-10'>
                    <div className=' pt-8' >
                        <div className='flex justify-between items-center mb-5'>
                            <h1 className='font-normal text-sm md:text-base'>Upload Image :</h1>
                            <label role='button' htmlFor='file' className='bg-green active:shadow-none text-white cursor-pointer rounded-sm flex justify-center items-center flex-col py-2 px-3 shadow-md active:ring-1 active:ring-green'>
                                <div className='text-sm flex items-center gap-2'>
                                    <TbArrowsExchange className='text-base' />
                                    Change Image
                                </div>
                                <input onChange={fileHandler} id='file' accept='image/png,image/jpeg,image/jpg' type="file" className='hidden' />
                            </label>
                        </div>
                        {!selectedFile ? (
                            <div className='rounded-sm overflow-hidden h-52 sm:h-62 ring-1 ring-green'>
                                {ProductDetails?.imageUrl ? (

                                    <img src={ProductDetails?.imageUrl} className='h-full w-full object-contain' alt="Upload_Image" />
                                ) : (
                                    <p className='text-gray-500'>Please Select Image</p>
                                )}
                            </div>
                        ) : (
                            <PreviewImage file={selectedFile} />
                        )}

                    </div>
                    {
                        // Map through the form data and render the input elements dynamically
                        EditProductFormData.map((field, index) => {
                            return (
                                <InputField key={index} {...field} />
                            )
                        })
                    }
                    <Button disabled={isLoading} loading={isLoading} onClick={validateHandler} loadingContent='Updating . . . ' title={"Update"} />
                </section>
            </div>
            <div onClick={closeHandler} className=' h-full w-full absolute -z-1 bg-black opacity-50'> </div>
        </section>
    )
}