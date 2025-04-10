import React, { useEffect, useState } from 'react'
import TopProductCard from './TopProductCard'
import { useSelector } from 'react-redux';

function ProductsSlider({ ref, id, sliderName }) {
    const [filterProductList, setFilterProductList] = useState([])
    const productList = useSelector((state) => state.ProductList) || []

    useEffect(() => {

        if (sliderName == "bestReviewProduct") {

            const newList = productList.map((product) => {
                return { ...product, ratings: product?.ratings?.length }
            })
            setFilterProductList(newList.sort((a, b) => b?.ratings - a?.ratings).slice(0, 9))
        }
        else if (sliderName == "topRatedProduct") {
            const newList = productList.map((product) => {
                const total = product?.ratings?.reduce((acc, value) => {
                    return (acc + value.ratings)
                }, 0)
                return { ...product, userRating: Number((total / product?.ratings?.length).toFixed(1)) }
            })
            setFilterProductList(newList.sort((a, b) => b?.userRating - a?.userRating).slice(0, 9))

        }
        else if (sliderName == "latestProduct") {
            setFilterProductList(productList.slice(0, 9))
        }
    }, [productList])



    return (
        <div ref={ref} id={id}
            className="w-full mt-10 grid grid-flow-col grid-rows-3 auto-cols-[calc((100%/1))] overflow-hidden gap-5">
            {filterProductList.map((product, index) => {

                return <TopProductCard key={index} product={product} />
            })}
        </div>
    )
}

export default ProductsSlider