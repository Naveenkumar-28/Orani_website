import React, { RefObject } from 'react'
import { ProductSliderCard } from './ProductSliderCard'
import { ProductSliderType } from '@/app/types'
import { ProductSliderCardSkeleton } from './ProductSliderCardSkeleton';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ProductsSlider({ products = [], isLoading, ref }: { ref: RefObject<Slider | null>, products: ProductSliderType[], isLoading: boolean }) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        rows: 3
    };


    return (
        <div className="relative mt-10 ">
            {!isLoading ? (
                <>
                    <Slider ref={ref}  {...settings}>
                        {products.map((product, index) => {
                            return <ProductSliderCard key={index} product={product} />
                        })}

                    </Slider>

                </>
            ) : (
                <>
                    {
                        [...Array(3)].map((_, index) => (<ProductSliderCardSkeleton key={index} />))

                    }
                </>
            )}
        </div>
    )
}
