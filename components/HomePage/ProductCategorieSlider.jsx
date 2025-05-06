
import React, { useCallback, useEffect, useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import CategoryCard from './CategoryCard';

function ProductCategorieSlider() {
    const sliderRef = useRef(null);
    let timeInterval = useRef(null);


    const categoryList = [
        { _id: 1, name: "Vegetables", ImageUrl: "/categories/category-1.jpg" },
        { _id: 2, name: "Fruits", ImageUrl: "/categories/category-2.jpg" },
        { _id: 3, name: "Juices", ImageUrl: "/categories/category-3.jpg" },
        { _id: 4, name: "Dried", ImageUrl: "/categories/category-4.jpg" },
        { _id: 5, name: "Fresh Dried", ImageUrl: "/categories/category-4.jpg" },
    ];


    const slideNext = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const cardWidth = slider.children[0]?.clientWidth || 0;

        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            let firstChild = slider.children[0];
            slider.appendChild(firstChild);
            slider.scrollLeft -= cardWidth;
        }

        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    }, [])

    const slidePrev = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const cardWidth = slider.children[0]?.clientWidth || 0;

        if (slider.scrollLeft === 0) {
            let lastChild = slider.children[slider.children.length - 1];
            slider.prepend(lastChild);
            slider.scrollLeft += cardWidth;
        }

        slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }, [])

    // Automatically slider moves every 3s
    useEffect(() => {
        if (timeInterval.current) clearInterval(timeInterval.current)
        timeInterval.current = setInterval(() => {
            slideNext()
        }, 5000)
        return () => clearInterval(timeInterval.current)
    }, [])


    return (
        <section
            className="product_container container lg:px-20 mx-auto md:px-20 2xl:px-52 sm:px-5 select-none mb-20">
            <div className="relative">

                <div ref={sliderRef} className="snap-mandatory snap-x grid overflow-hidden grid-flow-col xl:auto-cols-[calc((100%/4))] auto-rows-[300px] sm:auto-cols-[calc((100%/2))] lg:auto-cols-[calc((100%/3))] auto-cols-[calc((100%/1))] ">
                    {categoryList.map((category, index) => {
                        return (
                            <CategoryCard category={category} key={index} />
                        )
                    })}
                </div>

                {/* Absolute positioned navigation */}
                <div
                    className="absolute z-30 left-0 top-0  w-full h-full flex justify-between items-center pointer-events-none">
                    <div aria-label='next_button' onClick={() => slideNext()}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2  md:right-[100%] right-0 shadow-md  bg-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowBack />
                    </div>
                    <div aria-label='previous_button' onClick={() => slidePrev()}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2 md:left-[100%] shadow-md bg-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCategorieSlider