"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ProductCard from "./ProductCard"

function FeaturedProductSection() {
    const [filterProductList, setFilterProductList] = useState([])
    const [categoryName, setCategoryName] = useState('all')
    const categoireClassName = "font-normal text-gray-500 lg:text-lg sm:text-base text-sm cursor-pointer border-b-2 "

    const productList = useSelector((state) => state.ProductList)



    const selectedList = (categoire) => {

        setCategoryName(categoire.toLowerCase())

        if (categoire.toLowerCase() == 'all') {
            setFilterProductList(productList)
        } else {
            setFilterProductList(() => {
                return productList.filter((product) => product.category.toLowerCase() == categoire.toLowerCase())
            })
        }
    }

    useEffect(() => {
        if (productList.length > 0) {
            selectedList('all');
        }
    }, [productList]) //Runs only when productList changes


    return (
        <section className="pt-20 px-5 container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-32 ">
            <div className="flex  gap-5 justify-center flex-col w-full items-center mb-15 mt-10">
                <h3 className="text-center text-green font-medium font-serif text-lg ">Featured Product</h3>
                <h1 className="text-center font-extrabold lg:text-4xl text-3xl">Our Products</h1>
                <p className='text-gray-500'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div>
            <div id="Featured_product_Container"
                className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">

                {filterProductList.map((product, index) => {
                    if (index >= 8) return
                    return (

                        <ProductCard delay={index * 100} product={product} key={index} />
                    )

                })}
            </div>
        </section >
    )
}

export default FeaturedProductSection