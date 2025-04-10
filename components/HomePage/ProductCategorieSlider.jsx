import React, { useEffect, useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function ProductCategorieSlider() {


    const categoryList = [
        { _id: 1, name: "Vegetables", ImageUrl: "/categories/category-1.jpg" },
        { _id: 2, name: "Fruits", ImageUrl: "/categories/category-2.jpg" },
        { _id: 3, name: "Juices", ImageUrl: "/categories/category-3.jpg" },
        { _id: 4, name: "Dried", ImageUrl: "/categories/category-4.jpg" },
        { _id: 5, name: "Fresh Dried", ImageUrl: "/categories/category-4.jpg" },
    ];

    const sliderRef = useRef(null);
    let nextTimeInterval = useRef(null);

    const slideNext = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const cardWidth = slider.children[0]?.clientWidth || 0;

        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            let firstChild = slider.children[0];
            slider.appendChild(firstChild);
            slider.scrollLeft -= cardWidth;
        }

        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    };

    const slidePrev = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const cardWidth = slider.children[0]?.clientWidth || 0;

        if (slider.scrollLeft === 0) {
            let lastChild = slider.children[slider.children.length - 1];
            slider.prepend(lastChild);
            slider.scrollLeft += cardWidth;
        }

        slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    };

    const startAutoSlide = () => {
        stopAutoSlide(); // Clear previous interval before setting a new one
        nextTimeInterval.current = setInterval(() => {
            slideNext();
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (nextTimeInterval.current) {
            clearInterval(nextTimeInterval.current);
        }
    };

    useEffect(() => {
        startAutoSlide(); // Start auto sliding when component mounts

        return () => stopAutoSlide(); // Cleanup on unmount
    }, []);


    return (
        <section
            className="product_container container lg:px-20 mx-auto md:px-20 2xl:px-52 sm:px-5 select-none mb-20">
            <div className="relative">

                <div ref={sliderRef} className="product_slider grid overflow-hidden grid-flow-col xl:auto-cols-[calc((100%/4))] auto-rows-[300px] sm:auto-cols-[calc((100%/2))] lg:auto-cols-[calc((100%/3))] auto-cols-[calc((100%/1))] "
                    id="product_slider">
                    {categoryList.map((category) => {
                        return (
                            <div key={category._id} className="Categorie_item group">
                                <div
                                    className=" overflow-hidden relative flex items-end w-[90%] cursor-pointer rounded-sm justify-start">
                                    <img src={category.ImageUrl}
                                        className="h-full group-hover:scale-110 duration-500 w-full object-cover"
                                        alt="categories_img" />
                                    <div
                                        className="absolute h-full w-full bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-start pb-5">
                                        <p
                                            className="py-1 bg-[#7fad39] rounded-br-sm rounded-tr-sm text-white  w-5/6 uppercase font-serif text-xl text-center">
                                            {category.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Absolute positioned navigation */}
                <div
                    className="absolute z-30 left-0 top-0  w-full h-full flex justify-between items-center pointer-events-none">
                    <div onClick={() => {
                        stopAutoSlide();
                        slideNext();
                        startAutoSlide();
                    }}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2  md:right-[100%] right-0 shadow-md  bg-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowBack />

                    </div>
                    <div onClick={() => {
                        stopAutoSlide();
                        slidePrev();
                        startAutoSlide();
                    }}
                        className=" text-2xl absolute top-1/2 -translate-y-1/2 md:left-[100%] shadow-md bg-gray-200 px-1 py-4 rounded-sm pointer-events-auto cursor-pointer">
                        <IoIosArrowForward />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCategorieSlider