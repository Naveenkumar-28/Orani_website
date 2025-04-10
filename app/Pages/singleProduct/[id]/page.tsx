"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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


const SingleProduct = () => {
    const inicalState: { singleProduct: ProductListType, relatedProducts: ProductListType[] } = {
        singleProduct: {
            _id: '',
            name: '',
            description: '',
            price: 0,
            ImageUrl: '',
            category: '',
            discountPrice: 0,
            stock: 0,
            sold: 0,
            quantity: 0,
            ratings: [{
                comment: '',
                name: '',
                profileUrl: '',
                ratings: 0,
                _id: ''
            }]
        }, relatedProducts: []
    }
    const [product, setProduct] = useState<{ singleProduct: ProductListType, relatedProducts: ProductListType[] }>(inicalState)
    const [quantity, setQuantity] = useState<number>(1)
    const [ratings, setRatings] = useState<number>(0)
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)

    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch()

    const CartList: CartType[] = useSelector((state: any) => state.CartList) || []

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/singleProduct/${params.id}`)
                if (response.status < 300) {
                    console.log("singleProduct", response.data);
                    setProduct(response.data)
                }

            } catch (error) {
                router.replace('/')
                console.log((error as Error).message);

            } finally {
                setLoadingSkeleton(false)
            }
        }
        getSingleProduct()
    }, [])

    useEffect(() => {
        if (!(product?.singleProduct?.ratings)) {

            const Total = product?.singleProduct?.ratings?.reduce((acc, rating) => {
                return (acc + rating?.ratings)
            }, 0)
            const totalRatings = Total / product?.singleProduct?.ratings?.length
            setRatings(Number(totalRatings.toFixed(1)))

        }

        setQuantity(product?.singleProduct?.quantity)
    }, [product])

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code == "Enter" || e.code == "Space") {

            setQuantity(Number(quantity > 0 ? Math.min(quantity, product.singleProduct.stock) : 1))

        }
    }
    console.log("product", product);

    const addToCart = (id: string) => {
        if (product?.singleProduct?.stock) {
            if (!CartList.find(item => item?._id == id)) {

                dispatch(addCartList({ ...product?.singleProduct, quantity: Number(quantity) }))
                dispatch(AddNotifyMessage('This product added to Cart'))
            } else {
                dispatch(AddNotifyMessage('This product already in Cart'))
            }
        } else {
            dispatch(AddNotifyMessage('This product Out of the Stock'))
        }

    }


    return (
        <>
            {!loadingSkeleton ? (
                <>
                    <MenuSection name={'Single Product'} />
                    {/* <!--Single Product  --> */}
                    <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20" id="Single_product_container">
                        <div className="flex lg:flex-row flex-col h-full lg:gap-10 gap-10">
                            <div className="xl:w-7/12 lg:w-6/12 w-full h-[26rem] overflow-hidden">
                                <img className="h-full w-full object-contain" src={product?.singleProduct?.ImageUrl} alt="Product_Image" />
                            </div>
                            <div className="xl:w-5/12 lg:w-6/12 w-full flex flex-col gap-8">
                                <h1 id="product_Name" className="font-normal uppercase text-3xl">
                                    {product?.singleProduct?.name}
                                </h1>
                                <div className="flex gap-5">
                                    {!isNaN(ratings) ? (

                                        <div className="flex  justify-center  items-center gap-1">
                                            <p className='text-lg font-medium text-green'>{ratings}</p>
                                            <Ratings initialValue={Number(ratings)} />
                                            <p className='text-gray-500'>({product?.singleProduct?.ratings?.length})</p>
                                        </div>
                                    ) : (
                                        <div className="flex  justify-center  items-center gap-2">
                                            <p className='text-xl font-medium text-green'>N/A</p>
                                            <Ratings initialValue={0} />
                                        </div>
                                    )}
                                    {product?.singleProduct?.sold > 0 && <div className="flex justify-center items-center gap-1">
                                        <p>{product?.singleProduct?.sold}</p>
                                        <p className="text-gray-500">Sold</p>
                                    </div>}

                                </div>
                                {product?.singleProduct?.discountPrice ? (

                                    <div className='flex gap-5'>

                                        <p className="text-2xl text-gray-500 line-through">₹{product?.singleProduct?.price}.00</p>
                                        <p className="text-2xl">₹{product?.singleProduct?.discountPrice ? product?.singleProduct?.discountPrice : product?.singleProduct?.price}.00</p>
                                        <div className='flex justify-center items-center text-green'>
                                            <FaArrowDownLong />
                                            <p className='text-xl'>{Math.round(((product?.singleProduct?.price - product?.singleProduct?.discountPrice) / product?.singleProduct?.price) * 100)}%</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-2xl">₹{product?.singleProduct?.price}.00</p>
                                )}
                                <p className="text-gray-500 line-clamp-5">{product?.singleProduct?.description}</p>
                                <div className="flex gap-2 h-10">
                                    <button onClick={() => setQuantity((pre) => Math.max(pre - 1, 1))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                                        <FiMinus />
                                    </button>
                                    <input value={quantity || 1} onChange={(e) => setQuantity(Number(e.target.value))} type="number"
                                        onKeyDown={(e) => onKeyPress(e)} className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 w-25 outline-none h-full text-center" />

                                    <button onClick={() => setQuantity((pre) => Math.min(pre + 1, product?.singleProduct?.stock))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                                        <IoAdd />
                                    </button>
                                </div>
                                {product?.singleProduct?.stock > 0 ? (<>
                                    {product?.singleProduct?.stock <= 10 ? (<p className="font-medium text-red-600">Only {product?.singleProduct?.stock} kg available</p>) :
                                        (<p className="font-medium">{product?.singleProduct?.stock} kg available</p>)
                                    }</>) : (
                                    <p className='text-red-600 font-medium text-xl'>Out of Stock</p>
                                )}

                                <button onClick={() => addToCart(product?.singleProduct._id)}
                                    className="bg-[#7fad39] w-max text-xl active:bg-blue-600 active:border-blue-600 active:text-white shadow-2xl border-2 border-transparent hover:border-[#7fad39] hover:text-[#7fad39] hover:bg-white duration-200 cursor-pointer text-white py-3 font-normal  rounded-full px-6">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                    </section>

                    {/* <!-- Related Products Section  --> */}
                    {product?.relatedProducts?.length > 0 && (

                        <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
                            <div className="flex justify-center flex-col items-center gap-8">
                                <h6 className="text-green font-medium italic text-xl">Products</h6>
                                <h1 className="lg:text-4xl text-3xl font-semibold">Related Products</h1>
                                <p className="text-gray-500 text-base">Far far away, behind the word mountains, far from the
                                    countries Vokalia and
                                    Consonantia</p>
                            </div>

                            <div
                                className="grid pt-10 pb-5 select-none gap-5 overflow-hidden xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 overflow-x-auto ">
                                {product?.relatedProducts?.map((product) => {
                                    return (
                                        <div onClick={() => router.push('/Pages/singleProduct/' + product?._id)} key={product?._id} className={`border-[1px] cursor-pointer overflow-hidden border-gray-200 relative group transition-all duration-500 ease-in-out transform bg-white p-5 rounded-sm `} >
                                            {product?.discountPrice &&
                                                <div className="absolute top-0 px-2 py-1 left-0 bg-green text-white text-sm z-50 rounded-br-sm">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
                                            <div className="h-9/12 relative overflow-hidden">
                                                <img
                                                    src={product?.ImageUrl}
                                                    className="h-full w-full object-contain group-hover:scale-110 duration-500"
                                                    alt={product?.name}
                                                />
                                            </div>
                                            <div className="flex justify-center gap-2 items-center flex-col h-3/12">
                                                <p className=" font-light uppercase ">{product?.name}</p>
                                                {product?.discountPrice ? (

                                                    <div className="flex gap-5 font-light">

                                                        <p className="  line-through text-gray-400 font-normal">₹{product?.price}.00</p>
                                                        <p className=" text-[#7fad39] font-normal">₹{product?.discountPrice}.00</p>
                                                    </div>
                                                ) : (<p className=" text-[#7fad39] font-normal">₹{product?.price}.00</p>
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

export default SingleProduct