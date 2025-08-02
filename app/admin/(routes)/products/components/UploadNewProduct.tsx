import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from "@/components";
import { useDispatch } from 'react-redux';
import { bodyOverflowHandler } from '@/utils';
import { useAddProductHandler } from '../hooks';
import { InputField } from './InputField';
import { ResetProductData } from '../redux';

type PropsType = {
    onDismiss: (value: boolean) => void;
    fetchProducts: (page?: number, isFiltering?: boolean) => void;
}

export function UploadNewProduct({ onDismiss, fetchProducts }: PropsType) {

    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()
    const timeOutRef = useRef<NodeJS.Timeout | null>(null)

    // Handler to close the slider and reset the state after a timeout
    const closeHandler = useCallback(() => {
        setIsActive(false)
        if (timeOutRef.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            bodyOverflowHandler(false)
            onDismiss(false)
            dispatch(ResetProductData())
        }, 500);
        return () => { if (timeOutRef.current) clearTimeout(timeOutRef.current) }
    }, [dispatch, onDismiss, bodyOverflowHandler])

    const {
        isLoading,
        onValidateHandler,
        uploadProductFormData,
        fileHandler,
        selectedFile,
        setSelectedFile,
        onDropHandler,
        Errors
    } = useAddProductHandler({ closeHandler, fetchProducts })

    // Effect to set the initial state of the component and handle body overflow
    useEffect(() => {
        bodyOverflowHandler(true)
        if (timeOutRef.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setIsActive(true)
        }, 200);
        return () => { if (timeOutRef.current) clearTimeout(timeOutRef.current) }
    }, [])


    return (
        <section className={`fixed top-0 left-0 bottom-0  w-full h-full z-100 flex justify-end `}>
            <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 duration-500 ${isActive ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex justify-between items-center py-5 shadow-lg px-5 h-18'>
                    <h1 className='font-medium text-lg'>Add New Product</h1>
                    <button onClick={closeHandler} className='text-3xl cursor-pointer hover:text-red-500'><IoCloseOutline /></button>
                </div>
                <section className='px-5 gap-5 flex flex-col overflow-y-scroll h-[calc(100%-4.5rem)]'>
                    <div className=' pt-8 mb-2' >
                        <div className='flex justify-between items-center mb-5  '>
                            <h1 className='text-sm md:text-base font-normal w-6/12'>Upload Image :</h1>
                            {selectedFile && <div className='flex items-center justify-center gap-1 w-6/12'>
                                <p className='line-clamp-1 text-sm'>{selectedFile?.name}</p>
                                <button className='text-xl sm:text-2xl hover:text-red-600 cursor-pointer' onClick={() => setSelectedFile(null)}>
                                    <IoCloseOutline />
                                </button>

                            </div>}
                        </div>
                        {!selectedFile ? (

                            <label onDragOver={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }} onDrop={onDropHandler} htmlFor='file' className={`${Errors.file.error ? "ring-red-500" : 'ring-gray-200'} ring-1  gap-2 cursor-pointer ring-gray-200 rounded-sm h-52 sm:h-62 flex justify-center items-center flex-col text-gray-500`}>
                                <FiUploadCloud className='text-2xl' />
                                <p className='text-xs sm:text-sm'>Drag & drop or click to Upload Image</p>
                                <input onChange={fileHandler} id='file' accept='image/png,image/jpeg,image/jpg' type="file" className='hidden' />
                            </label>
                        ) : (
                            <div className='rounded-sm overflow-hidden h-52 sm:h-62 ring-1 ring-green'>
                                <img src={URL.createObjectURL(selectedFile)} className='h-full w-full object-contain' alt="Upload_Image" />
                            </div>
                        )}
                    </div>
                    {
                        // Map through the form data and render the input,textArea and select elements dynamically
                        uploadProductFormData.map((field, index) => {
                            return (
                                <InputField key={index} {...field} />
                            )
                        })
                    }
                    <Button className='mb-10' loading={isLoading} disabled={isLoading} loadingContent='Uploading . . .' onClick={onValidateHandler} title={"Upload"} />
                </section>
            </div>
            <div onClick={closeHandler} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

            </div>
        </section>
    )
}