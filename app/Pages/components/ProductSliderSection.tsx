import React, { useEffect } from 'react'
import { ProductHeaderAndMenu } from './ProductHeaderAndMenu';
import { ProductsSlider } from './ProductsSlider';
import { useProductSliderHandlers } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSliders } from '@/app/redux';
import { AppDispatch, RootState } from '@/app/redux/store';

export function ProductSliderSection() {

    const {
        isLoading,
        productSliderData,
    } = useProductSliderHandlers()
    const { bestReviewedProducts, latestProducts, topRatedProducts } = useSelector((state: RootState) => state.productSliderList)

    const dispatch = useDispatch<AppDispatch>()

    // //Getting product list from API
    useEffect(() => {
        if (bestReviewedProducts.length > 0 && latestProducts.length > 0 && topRatedProducts.length > 0) return
        dispatch(fetchProductSliders())
    }, [])

    return (
        <section
            className="mediaQuary relative select-none mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">

            {productSliderData.map((product, index) =>
            (
                <div key={index} className=" w-full ">
                    <ProductHeaderAndMenu
                        callback={product.onclick}
                        title={product.title}
                        isLoading={isLoading}
                        name={product.name}
                    />

                    <ProductsSlider
                        ref={product.ref}
                        products={product.products}
                        isLoading={isLoading}
                    />
                </div>
            )
            )}
        </section>
    )
}