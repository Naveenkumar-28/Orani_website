"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import MenuSection from '@/components/MenuSection'
import { IoAdd } from 'react-icons/io5'
import { FiMinus } from 'react-icons/fi'
import Ratings from '@/components/Ratings'
import axios from 'axios'
import { FaArrowDownLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import { addCartList } from '@/app/redux/slices/CartSlice'
import SinglePageSkeleton from "@/components/loadingSkeletons/SinglePageSkeleton";
import { CartType, ProductListType } from '@/app/types'
import Button from '@/components/Button'


const SpecificProduct = () => {
    const inicalState: { specificProduct: ProductListType, relatedProducts: ProductListType[] } = {
        specificProduct: {
            _id: '',
            name: '',
            description: '',
            price: 0,
            ImageUrl: '/',
            category: '',
            discountPrice: 0,
            stock: 0,
            sold: 0,
            quantity: 0,
            ratings: 0,
            totalReviewsLength: 0
        }, relatedProducts: []
    }
    const [product, setProduct] = useState<{ specificProduct: ProductListType, relatedProducts: ProductListType[] }>(inicalState)
    const [quantity, setQuantity] = useState<number>(1)
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)

    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch()

    const CartList: CartType[] = useSelector((state: any) => state.CartList) || []

    useEffect(() => {
        const getSpecificProduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
                if (response.data.success) {
                    console.log("specificProduct", response.data);
                    const { relatedProducts, specificProduct } = response.data
                    setProduct({ relatedProducts, specificProduct })
                }

            } catch (error) {
                router.replace('/')
                console.log((error as Error).message);

            } finally {
                setLoadingSkeleton(false)
            }
        }
        getSpecificProduct()
    }, [])

    useEffect(() => {
        setQuantity(product?.specificProduct?.quantity)
    }, [product])

    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code == "Enter" || e.code == "Space") {

            setQuantity(Number(quantity > 0 ? Math.min(quantity, product.specificProduct.stock) : 1))

        }
    }, [quantity, product])

    const addCartHandler = useCallback((id: string) => {
        if (product?.specificProduct?.stock) {
            if (!CartList.find(item => item?._id == id)) {

                dispatch(addCartList({ ...product?.specificProduct, quantity: Number(quantity) }))
                dispatch(AddNotifyMessage({ message: 'This product added to Cart' }))
            } else {
                dispatch(AddNotifyMessage({ message: 'This product already in Cart', type: 'warning' }))
            }
        } else {
            dispatch(AddNotifyMessage({ message: 'This product Out of the Stock', type: 'error' }))
        }

    }, [product, quantity, CartList])


    return (
        <>
            {!loadingSkeleton ? (
                <>
                    <MenuSection name={'Single Product'} />

                    {/* <!--Single Product  --> */}
                    <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20" id="Single_product_container">
                        <div className="flex lg:flex-row flex-col h-full lg:gap-10 gap-10">
                            <div className="xl:w-7/12 lg:w-6/12 w-full h-[26rem] overflow-hidden">
                                <img className="h-full w-full object-contain" src={product?.specificProduct?.ImageUrl} alt="Product_Image" />
                            </div>
                            <div className="xl:w-5/12 lg:w-6/12 w-full flex flex-col gap-8">
                                <h1 id="product_Name" className="font-normal uppercase text-3xl">
                                    {product?.specificProduct?.name}
                                </h1>
                                <div className="flex gap-5">
                                    {product?.specificProduct?.ratings ? (

                                        <div className="flex  justify-center  items-center gap-2">
                                            <p className='text-xl font-medium text-green'>{product?.specificProduct?.ratings}</p>
                                            <Ratings initialValue={Number(product?.specificProduct?.ratings)} />
                                            <p className='text-gray-500'>({product?.specificProduct?.totalReviewsLength})</p>
                                        </div>
                                    ) : (
                                        <div className="flex  justify-center  items-center gap-2">
                                            <p className='text-xl font-medium text-green'>N/A</p>
                                            <Ratings initialValue={0} />
                                        </div>
                                    )}
                                    {product?.specificProduct?.sold > 0 && <div className="flex justify-center items-center gap-1 text-gray-400">
                                        <p >{product?.specificProduct?.sold}</p>
                                        <p >Sold</p>
                                    </div>}

                                </div>

                                {product?.specificProduct?.discountPrice ? (
                                    <div className='flex gap-5'>
                                        <p className="text-2xl text-gray-400 line-through">₹{product?.specificProduct?.price?.toFixed(2)}</p>
                                        <p className="text-2xl">₹{product?.specificProduct?.discountPrice.toFixed(2)}</p>
                                        <div className='flex justify-center items-center text-green gap-1
                                        '>
                                            <FaArrowDownLong />
                                            <p className='text-xl'>{Math.round(((product?.specificProduct?.price - product?.specificProduct?.discountPrice) / product?.specificProduct?.price) * 100)}%</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-2xl">₹{product?.specificProduct?.price.toFixed(2)}</p>
                                )}
                                <p className="text-gray-400 line-clamp-5">{product?.specificProduct?.description}</p>
                                <div className="flex gap-2 h-10">
                                    <button onClick={() => setQuantity((pre) => Math.max(pre - 1, 1))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                                        <FiMinus />
                                    </button>
                                    <input value={quantity || 1} onChange={(e) => setQuantity(Math.min(Number(e.target.value), product?.specificProduct?.stock))} type="number"
                                        onKeyDown={(e) => onKeyPress(e)} className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 w-25 outline-none h-full text-center" />

                                    <button onClick={() => setQuantity((pre) => Math.min(pre + 1, product?.specificProduct?.stock))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                                        <IoAdd />
                                    </button>
                                </div>
                                {product?.specificProduct?.stock > 0 ? (<>
                                    {product?.specificProduct?.stock <= 10 ? (<p className="font-medium text-red-600">Only {product?.specificProduct?.stock} kg available</p>) :
                                        (<p className="font-medium">{product?.specificProduct?.stock} kg available</p>)
                                    }</>) : (
                                    <p className='text-red-600 font-medium text-xl'>Out of Stock</p>
                                )}
                                <Button title='Add to Card' className='w-max text-xl' disabled={!(product?.specificProduct?.stock > 0)} onClick={() => addCartHandler(product?.specificProduct._id)} />
                            </div>
                        </div>

                    </section>

                    {/* <!-- Related Products Section  --> */}
                    {product?.relatedProducts?.length > 0 && (

                        <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
                            <div className="flex justify-center flex-col items-center gap-8">
                                <h6 className="text-green font-medium italic text-xl">Products</h6>
                                <h1 className="lg:text-4xl text-3xl font-semibold">Related Products</h1>
                                <p className="text-gray-400 text-base">Far far away, behind the word mountains, far from the
                                    countries Vokalia and
                                    Consonantia</p>
                            </div>

                            <div
                                className="flex pt-10 pb-5 select-none gap-5 overflow-x-auto snap-x snap-mandatory w-full">

                                {product?.relatedProducts?.map((product) => {
                                    return (
                                        <div onClick={() => router.push('/Pages/shop/' + product?._id)} key={product?._id} className={`border-[1px] snap-start cursor-pointer overflow-hidden border-gray-200 relative group transition-all bg-white p-5 rounded-sm min-w-62 h-72`} >
                                            {product?.discountPrice &&
                                                <div className="absolute top-0 px-2 py-1 left-0 bg-green text-white text-sm z-50 rounded-br-sm">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
                                            <div className="h-9/12 relative overflow-hidden pb-2 ">
                                                <img
                                                    src={product?.ImageUrl}
                                                    className="h-full w-full object-contain group-hover:scale-110 duration-500"
                                                    alt={product?.name}
                                                />
                                            </div>
                                            <div className="flex justify-center gap-2 items-center flex-col h-3/12">
                                                <p className=" font-normal uppercase text-gray-400">{product?.name}</p>
                                                {product?.discountPrice ? (

                                                    <div className="flex gap-5 font-light">
                                                        <p className="  line-through text-gray-300 font-normal">₹{product?.price.toFixed(2)}</p>
                                                        <p className=" text-green font-normal">₹{product?.discountPrice.toFixed(2)}</p>
                                                    </div>
                                                ) : (<p className=" text-green font-normal">₹{product?.price.toFixed(2)}</p>
                                                )}
                                            </div>
                                        </div>)
                                })}
                            </div>

                        </section>
                    )}
                </>
            ) : (
                <SinglePageSkeleton />
            )}
        </>
    )
}

export default SpecificProduct