"use client"
import { addCartList } from "@/app/redux/slices/CartSlice";
import { AddNotifyMessage } from "@/app/redux/slices/NotifyMessageSlice";
import { addWishList } from "@/app/redux/slices/wishListSlice";
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


    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay, product]); // Add 'product' to dependency array

    //Add Product to CartList
    const addCart = useCallback((id) => {
        const addCartProduct = productList.find((product) => product?._id == id)

        if (addCartProduct?.stock == 0) {
            return dispatch(AddNotifyMessage("This Product out of Stock"))
        }

        if (CartList.find((product) => product._id == id)) return dispatch(AddNotifyMessage("This product Already in Card"))
        let newList = productList.find(product => product._id == id)
        if (!newList) return console.log("this product not available in product list");
        dispatch(addCartList(newList))

        dispatch(AddNotifyMessage('This Product added to your Cart'))
    }, [product, CartList, productList])

    //Add Product to WhishList
    const AddWishList = useCallback((id) => {

        if (WishList.find((product) => product._id == id)) return dispatch(AddNotifyMessage("This product Already in WishList"))
        let newWishList = productList.find(product => product._id == id)
        if (!newWishList) return console.log("this product not available in WishList list");
        dispatch(addWishList(newWishList))

        dispatch(AddNotifyMessage('This Product added to your WishList'))
    }, [product, WishList, productList])


    return (
        <div
            className={`border-[1px] hover:shadow-lg cursor-pointer overflow-hidden border-gray-200 relative group transition-all duration-500 ease-in-out transform bg-white p-5 rounded-sm 
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
                    <button title="Add Wishlist" onClick={() => AddWishList(product._id)} className="hover:bg-[#7fad39] hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <IoHeart />
                    </button>
                    <button title="Visit Product" onClick={() => router.push('/Pages/singleProduct/' + product._id)} className="hover:bg-[#7fad39] hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <FiMenu />
                    </button>
                    <button title="Add Cart" onClick={() => addCart(product._id)} className="hover:bg-[#7fad39] hover:border-transparent hover:rotate-[360deg] cursor-pointer duration-500 hover:text-white text-xl bg-white border-[1px] border-gray-200 p-2 rounded-full">
                        <IoCart />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col h-3/12">
                <p className="uppercase mb-2 font-extralight">{product.name}</p>
                {product.discountPrice ? (

                    <div className="flex gap-5 font-light">

                        <p className="  line-through text-gray-400 font-normal">₹{product.price}.00</p>
                        <p className=" text-[#7fad39] font-normal">₹{product.discountPrice}.00</p>
                    </div>
                ) : (<p className=" text-[#7fad39] font-normal">₹{product.price}.00</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
