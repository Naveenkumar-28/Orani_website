"use client"
import { AppDispatch, RootState } from "@/app/redux/store";
import { ProductType } from "@/app/types";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { Fade, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoHeart, IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addWish } from "../(public_pages)/wishlist/redux";
import { addCart } from "../(public_pages)/cart/redux";
import { createSendMessage } from "@/utils/sendMessage/createSendMessage";
import { useThrottleCallback } from "@/hooks";

export const ProductCard = ({ product, delay }: { product: ProductType, delay: number }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const productList = useSelector((state: RootState) => state.ProductList)
    const sendMessage = createSendMessage()
    const { localStorageCartList, isLoading: cartItemLoading } = useSelector((state: RootState) => state.CartItems)
    const { localStorageWishList, isLoading: wishItemLoading } = useSelector((state: RootState) => state.WishItems)

    useDebounceEffect(() => {
        setVisible(true);
    }, [delay, product], delay)

    //Add Product to CartLis
    const handleAddToCart = useCallback((id: string) => {
        if (wishItemLoading) return;

        const isAlreadyInCart = localStorageCartList.find((p) => p._id === id);
        const inStock = product.stock > 0;

        if (inStock) {
            if (isAlreadyInCart) return sendMessage.warning("This product Already in Cart");
            dispatch(addCart({ _id: id }));
            sendMessage.info("This Product added to your Cart");
        } else {
            sendMessage.error("This Product out of Stock");
        }
    }, [product, wishItemLoading, localStorageCartList, dispatch, sendMessage]);


    //Add Product to WhishList
    const handleAddToWish = useCallback((id: string) => {
        if (cartItemLoading) return;

        const isAlreadyInWish = localStorageWishList.find((product) => product._id == id)
        if (isAlreadyInWish) return sendMessage.warning("This product Already in WishList")
        dispatch(addWish(product))
        sendMessage.info('This Product added to your WishList')
    }, [product, localStorageWishList, productList, cartItemLoading])

    const handleClick = useCallback(() => {
        if (window.innerWidth < 768) {
            router.push('/pages/shop/' + product._id)
        }
    }, [product])

    const throttledAddToCart = useThrottleCallback(handleAddToCart, 1000);
    const throttleAddToWish = useThrottleCallback(handleAddToWish, 1000)
    const throttleClick = useThrottleCallback(handleClick, 1000)


    return (
        <div onClick={throttleClick}
            className={` w-auto border md:hover:shadow-lg overflow-hidden border-gray-200 relative active:scale-95 md:active:scale-100 group transition-all duration-500 ease-in-out transform bg-white p-5 rounded-sm 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-10"}`}
        >
            {product?.discountPrice && <div className="absolute top-0 lg:py-2 px-2 py-1.5 left-0 bg-green text-white text-xs z-50 rounded-br-sm font-normal">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            <div className="lg:h-9/12 h-8/12 overflow-hidden flex justify-center items-center">
                <img
                    src={product?.imageUrl}
                    className="h-full sm:w-full object-contain md:group-hover:scale-110 duration-500"
                    alt={product?.name}
                />

            </div>
            <div className="flex relative justify-center items-center flex-col lg:h-3/12 h-4/12">
                <p className="uppercase mb-2 font-normal text-neutral-500 lg:text-base text-sm">{product?.name}</p>
                {product?.discountPrice ? (
                    <div className="flex gap-5 font-light">
                        <p className="  line-through text-gray-300 font-normal lg:text-base text-sm ">₹{product?.price?.toFixed(2)}</p>
                        <p className=" text-green font-normal lg:text-base text-sm ">₹{product?.discountPrice?.toFixed(2)}</p>
                    </div>
                ) : (<p className=" text-green font-normal lg:text-base text-sm">₹{product?.price?.toFixed(2)}</p>
                )}

                <div className="hidden items-center md:flex translate-y-[150%] md:group-hover:translate-y-0 duration-500 absolute bottom-0 left-0 justify-center gap-5 w-full h-full bg-white">
                    <Tooltip title='Add Wishlist' arrow placement='left' enterDelay={500} slots={{ transition: Fade }}>
                        <button disabled={wishItemLoading} onClick={() => throttleAddToWish(product?._id)} className="hover:bg-green active:scale-95 text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                            <IoHeart />
                        </button>
                    </Tooltip>
                    <Tooltip title='Visit Product' arrow placement='bottom' enterDelay={500} slots={{ transition: Fade }}>
                        <button onClick={() => router.push('/pages/shop/' + product?._id)} className="hover:bg-green active:scale-95 text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                            <FiMenu />
                        </button>
                    </Tooltip>
                    <Tooltip title='Add Cart' arrow placement='right' enterDelay={500} slots={{ transition: Fade }}>
                        <button disabled={cartItemLoading} onClick={() => throttledAddToCart(product?._id)} className="hover:bg-green active:scale-95 text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                            <IoCart />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
