import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import Input from "@/components/AdminPage/Input";
import { IoIosArrowDown } from 'react-icons/io';
import Button from "@/components/Button";
import { useDispatch } from 'react-redux';
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import axios from 'axios';

function UploadNewProduct({ setLayerShow, bodyOverflowHandler, GetProductList }) {
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const initialData = useMemo(() => ({
        name: '',
        file: '',
        description: '',
        price: '',
        discountPrice: '',
        category: '',
        stock: ''
    }), [])

    useEffect(() => {
        bodyOverflowHandler(true)
        const timeOut = setTimeout(() => {
            setIsActive(true)
        }, 200);
        return () => clearTimeout(timeOut)
    }, [])

    const reduxDispatch = useDispatch()

    const reducer = useCallback((state, action) => {

        switch (action.type) {
            case "NAME":
                return { ...state, name: action.payload }
            case "FILE":
                return { ...state, file: action.payload }
            case "DESCRIPTION":
                return { ...state, description: action.payload }
            case "PRICE":
                return { ...state, price: action.payload }
            case "DISCOUNTPRICE":
                return { ...state, discountPrice: action.payload }
            case "CATEGORY":
                return { ...state, category: action.payload }
            case "STOCK":
                return { ...state, stock: action.payload }
            default:
                return state
        }
    }, [])



    const [ProductDetails, dispatch] = useReducer(reducer, initialData)


    const ProductUpload = useCallback(async () => {

        const { name, file, description, price, discountPrice, category, stock } = ProductDetails

        if (!name) return reduxDispatch(AddNotifyMessage("Please fill Name"))
        if (!file) return reduxDispatch(AddNotifyMessage("Please choose image"))
        if (!description) return reduxDispatch(AddNotifyMessage("Please fill description"))
        if (!price) return reduxDispatch(AddNotifyMessage("Please fill price"))
        if (!category) return reduxDispatch(AddNotifyMessage("Please select category"))
        if (!stock) return reduxDispatch(AddNotifyMessage("Please fill stock "))

        const form = new FormData()
        form.append("name", name);
        form.append("file", file); // Append the file
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
                reduxDispatch(AddNotifyMessage("Upload Successfully"))
            }

        } catch (error) {
            console.log(error.message)
            reduxDispatch(AddNotifyMessage("Upload failed"))
        } finally {
            setLoading(false)
        }

    }, [ProductDetails])

    const fileHandler = useCallback((e) => {

        const file = e?.target?.files[0]
        if (!file) return
        const maxSize = 1 * 1024 * 1024
        if (!(file.size < maxSize)) {
            reduxDispatch(AddNotifyMessage("Image size exceeds the 1MB limit"))
            return e.target.value = ""; // Reset input
        }
        dispatch({ type: "FILE", payload: file })

    }, [])

    const discountPriceHandler = useCallback((e) => {

        if (Number(e?.target?.value) < Number(ProductDetails?.price)) {
            return dispatch({ type: "DISCOUNTPRICE", payload: e.target.value })
        }
        reduxDispatch(AddNotifyMessage("Discount Price should be less than to Price"))
    }, [ProductDetails])

    const closeSlider = () => {
        setIsActive(false)
        const timeOut = setTimeout(() => {
            bodyOverflowHandler(false)
            setLayerShow(false)
        }, 500);
        return () => clearTimeout(timeOut)
    }

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
                            {ProductDetails?.file && <div className='flex items-center justify-center gap-1'>
                                <p>{ProductDetails?.file?.name}</p>
                                <IoCloseOutline className='text-2xl hover:text-red-600 cursor-pointer' onClick={(e) => dispatch({ type: "FILE", payload: '' })} />
                            </div>}
                        </div>
                        {!ProductDetails?.file ? (

                            <label htmlFor='file' className='border-2 gap-2 cursor-pointer border-gray-200 rounded-sm h-62 flex justify-center items-center flex-col text-gray-500'>
                                <FiUploadCloud className='text-2xl' />
                                <p className='text-sm'>Drag & drop or click to Upload Image</p>
                                <input onChange={fileHandler} id='file' accept='image/png,image/jpeg,image/jpg' type="file" className='hidden' />
                            </label>
                        ) : (
                            <div className='rounded-sm overflow-hidden h-62 border-2 border-green'>
                                <img src={URL.createObjectURL(ProductDetails?.file)} className='h-full w-full object-contain' alt="Upload_Image" />
                            </div>
                        )}
                    </div>
                    <Input name={"Name :"} value={ProductDetails?.name} onChange={(e) => dispatch({ type: "NAME", payload: e.target.value })} type={"text"} placeholder={"Enter product name"} />
                    <div className='flex flex-col gap-1'>
                        <label className='font-medium'>Description :</label>
                        <textarea value={ProductDetails?.description} onChange={(e) => dispatch({ type: "DESCRIPTION", payload: e.target.value })} placeholder='Enter product Description' className="border-2 rounded-sm py-5 text-sm font-light text-gray-600 outline focus:border-green outline-transparent px-5 border-gray-200 w-full h-32" name="description" />
                    </div>
                    <Input name={"Price :"} value={ProductDetails?.price} onChange={(e) => dispatch({ type: "PRICE", payload: e.target.value })} type={"number"} placeholder={"Enter product price"} />

                    <Input name={"Discount Price :"} value={ProductDetails?.discountPrice} onChange={discountPriceHandler} placeholder={"Enter discount price (Optional)"} type={"number"} />
                    <div className="flex flex-col gap-1">

                        <label className='font-medium'>Category :</label>
                        <div className='flex items-center border-2 border-gray-200 pe-5  focus:border-green  rounded-sm '>
                            <select
                                onChange={(e) => dispatch({ type: "CATEGORY", payload: e.target.value })}
                                name="category"
                                className="w-full bg-white py-3 px-5 text-gray-500 text-sm font-medium capitalize outline-none appearance-none"
                            >

                                <option value="">
                                    Select Category
                                </option>
                                {["oranges", "juice", "vegetables", "fruits"].map((category, index) => (
                                    <option
                                        key={index}
                                        value={category}
                                        className="capitalize text-gray-800 hover:bg-red-100"
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>


                            <IoIosArrowDown />
                        </div>
                    </div>
                    <Input name={"Stock :"} value={ProductDetails?.stock} onChange={(e) => dispatch({ type: "STOCK", payload: e.target.value })} placeholder={"Enter product stock"} type={"number"} />
                    <Button loading={loading} onClick={ProductUpload} name={"Upload"} width={"max-w-full"} />
                </section>
            </div>
            <div onClick={closeSlider} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

            </div>
        </section>
    )
}

export default UploadNewProduct