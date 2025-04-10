import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Input from "@/components/AdminPage/Input";
import { IoIosArrowDown } from 'react-icons/io';
import Button from "@/components/Button";
import { useDispatch } from 'react-redux';
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import axios from 'axios';
import { addProductList } from '@/app/redux/slices/productListSlice';

function EditProduct({ setEditShow, productList, bodyOverflowHandler, EditShow, GetProductList }) {
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryShow, setCategoryShow] = useState(false)
    const initialData = useMemo(() => ({
        _id: '',
        name: '',
        file: '',
        description: '',
        price: "",
        discountPrice: '',
        category: '',
        stock: '',
        ImageUrl: ''
    }), [])

    useEffect(() => {
        try {

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
            dispatch({ type: 'EDITPRODUCT', payload: data })


        } catch (error) {
            console.log(error?.message)
        }

    }, [])

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
            case "EDITPRODUCT":
                return { ...action.payload }
            default:
                return state
        }
    }, [])


    const [ProductDetails, dispatch] = useReducer(reducer, initialData)


    const ProductUpload = useCallback(async () => {

        const { name, file, description, price, discountPrice, category, stock, id } = ProductDetails
        if (!id) return
        if (!name) return reduxDispatch(AddNotifyMessage("Please fill Name"))
        if (!description) return reduxDispatch(AddNotifyMessage("Please fill description"))
        if (!price) return reduxDispatch(AddNotifyMessage("Please fill price"))
        if (!category) return reduxDispatch(AddNotifyMessage("Please select category"))
        if (!stock) return reduxDispatch(AddNotifyMessage("Please fill stock "))

        const form = new FormData()
        form.append("name", name);
        form.append("file", file || ''); // Append the file
        form.append("description", description);
        form.append("price", price);
        form.append("discountPrice", discountPrice || '');
        form.append("category", category);
        form.append("stock", stock)

        setLoading(true)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${id}`, form)
            console.log(response?.data);
            if (response?.data?.success) {
                GetProductList()
                reduxDispatch(AddNotifyMessage("Update Successfully"))
            }

        } catch (error) {
            console.log(error.message)
            reduxDispatch(AddNotifyMessage("Update failed"))
        } finally {
            setLoading(false)
            closeSlider()
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


    const closeSlider = useCallback(() => {
        setIsActive(false)
        const timeOut = setTimeout(() => {
            setEditShow('')
            bodyOverflowHandler(false)
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
                        {!ProductDetails?.file ? (
                            <div className='rounded-sm overflow-hidden h-62 border-2 border-green'>
                                {ProductDetails?.ImageUrl ? (

                                    <img src={ProductDetails?.ImageUrl} className='h-full w-full object-contain' alt="Upload_Image" />
                                ) : (
                                    <p className='text-gray-500'>Please Select Image</p>
                                )}
                            </div>
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
                        <div className=' relative gap-2 py-4 cursor-pointer w-full focus-within:border-green flex justify-center px-4  rounded-sm items-center border-2 border-gray-200'>
                            <input
                                placeholder='Select Category'
                                readOnly
                                value={ProductDetails?.category}
                                onFocus={() => setCategoryShow(true)}
                                onBlur={() => setTimeout(() => setCategoryShow(false), 300)}
                                type="text"
                                className='cursor-pointer capitalize border-none text-gray-500 outline-none w-full text-sm' />
                            <IoIosArrowDown className='text-gray-500' />
                            {categoryShow && (
                                <ul className='w-full rounded-md overflow-hidden bottom-15 shadow-md border-2 border-green  left-0 outline-none absolute z-50 bg-neutral-500 text-white'>
                                    {
                                        ["oranges", "juice", "vegetables", "fruits"].map((Name, index) => {
                                            return (
                                                <li onClick={(e) => dispatch({ type: "CATEGORY", payload: Name })} className={`capitalize px-2 py-1 cursor-pointer hover:bg-green hover:text-white ${ProductDetails?.category?.toLowerCase() == Name && "bg-green text-white"} `} key={index} value={Name} >
                                                    {Name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )}
                        </div>
                    </div>
                    <Input name={"Stock :"} value={ProductDetails?.stock} onChange={(e) => dispatch({ type: "STOCK", payload: e.target.value })} placeholder={"Enter product stock"} type={"number"} />
                    <Button loading={loading} onClick={ProductUpload} name={"Update"} width={"max-w-full"} />
                </section>
            </div>
            <div onClick={closeSlider} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

            </div>
        </section>
    )
}

export default EditProduct