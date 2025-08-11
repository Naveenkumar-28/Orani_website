
import React, { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { CategoryCard } from './CategoryCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function ProductCategorieSlider() {
    const sliderRef = useRef<Slider | null>(null);

    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    const categoryList = [
        { _id: 1, name: "Vegetables", ImageUrl: "/categories/category-1.jpg" },
        { _id: 2, name: "Fruits", ImageUrl: "/categories/category-2.jpg" },
        { _id: 3, name: "Juices", ImageUrl: "/categories/category-3.jpg" },
        { _id: 4, name: "Dried", ImageUrl: "/categories/category-4.jpg" },
        { _id: 5, name: "Fresh Dried", ImageUrl: "/categories/category-4.jpg" },
    ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 425,

                settings: { slidesToShow: 1, speed: 500, dots: true, autoplaySpeed: 5000, }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 2, }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, }
            },
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3, }
            }
        ]
    };


    return (
        <section className=" mediaQuary overflow-hidden lg:mb-20 min-h-80">
            <div className="relative">
                <Slider ref={sliderRef} {...settings}>
                    {categoryList.map((category, index) => {
                        return (
                            <CategoryCard category={category} key={index} />
                        )
                    })}
                </Slider>

                {/* Absolute positioned navigation */}
                <div className="absolute hidden min-[480px]:flex z-30 left-0 top-0  w-full h-full justify-between items-center pointer-events-none">
                    <div aria-label='next_button' onClick={next}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2 left-0 md:-left-9 shadow-md border bg-white active:scale-95 duration-200 hover:text-green border-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowBack />
                    </div>
                    <div aria-label='previous_button' onClick={previous}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2 right-0 md:-right-9 shadow-md border bg-white active:scale-95 duration-200 hover:text-green border-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </section>
    )
}

