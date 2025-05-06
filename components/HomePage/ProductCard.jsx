"use client"
import { addCartList } from "@/app/redux/slices/CartSlice";
import { AddNotifyMessage } from "@/app/redux/slices/NotifyMessageSlice";
import { addWishList } from "@/app/redux/slices/wishListSlice";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoHeart, IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product, delay }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
    const productList = useSelector((state) => state.ProductList)
    const CartList = useSelector((state) => state.CartList)
    const WishList = useSelector((state) => state.WishList)

    useDebounceEffect(() => {
        setVisible(true);
    }, [delay, product], delay)

    //Add Product to CartList
    const addCart = useCallback((id) => {
        if (product.stock > 0) {
            if (CartList.find((product) => product._id == id)) return dispatch(AddNotifyMessage({ message: "This product Already in Card", type: 'warning' }))
            dispatch(addCartList(product))
            dispatch(AddNotifyMessage({ message: 'This Product added to your Cart' }))
        } else {
            dispatch(AddNotifyMessage({ message: "This Product out of Stock", type: 'error' }))
        }

    }, [product, CartList, productList])

    //Add Product to WhishList
    const AddWishList = useCallback((id) => {
        if (product.stock > 0) {
            if (WishList.find((product) => product._id == id)) return dispatch(AddNotifyMessage({ message: "This product Already in WishList", type: 'warning' }))
            dispatch(addWishList(product))

            dispatch(AddNotifyMessage({ message: 'This Product added to your WishList' }))
        } else {
            dispatch(AddNotifyMessage({ message: "This Product out of Stock", type: 'error' }))
        }
    }, [product, WishList, productList])

    return (
        <div
            className={`border-[1px] hover:shadow-lg overflow-hidden border-gray-200 relative group transition-all duration-500 ease-in-out transform bg-white p-5 rounded-sm 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-10"}`}
        >
            {product.discountPrice && <div className="absolute top-0 px-3 p-1 left-0 bg-green text-white text-sm z-50 rounded-br-sm font-light">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            <div className="h-9/12 relative overflow-hidden">
                <img
                    src={product.ImageUrl}
                    className="h-full w-full object-contain group-hover:scale-110 duration-500"
                    alt={product.name}
                />
                <div className="flex translate-y-[100%] group-hover:translate-y-0 duration-500 absolute bottom-0 left-0 justify-center pb-5 gap-5 items-end w-full h-[50%]">
                    <button title="Add Wishlist" onClick={() => AddWishList(product._id)} className="hover:bg-green text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <IoHeart />
                    </button>
                    <button title="Visit Product" onClick={() => router.push('/Pages/shop/' + product._id)} className="hover:bg-green text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <FiMenu />
                    </button>
                    <button title="Add Cart" onClick={() => addCart(product._id)} className="hover:bg-green text-green hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <IoCart />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col h-3/12">
                <p className="uppercase mb-2 font-normal text-neutral-500 sm:text-base text-sm">{product.name}</p>
                {product.discountPrice ? (

                    <div className="flex gap-5 font-light">

                        <p className="  line-through text-gray-300 font-normal sm:text-base text-sm">₹{product?.price?.toFixed(2)}</p>
                        <p className=" text-green font-normal sm:text-base text-sm">₹{product?.discountPrice?.toFixed(2)}</p>
                    </div>
                ) : (<p className=" text-green font-normal sm:text-base text-sm">₹{product?.price?.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
