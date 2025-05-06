import React, { useState, useEffect } from 'react';

const Carousel = ({ images, autoSlide = true, autoSlideInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="overflow-hidden relative h-64">
                {images.map((product, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 duration-1000 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <img src={product.ImageUrl} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}

                {/* <div
                    className="flex pt-10 pb-5 select-none gap-5 overflow-x-auto snap-x snap-mandatory w-full">

                    {images.map((product) => {
                        return (
                            <div onClick={() => router.push('/Pages/singleProduct/' + product?._id)} key={product?._id} className={`border-[1px] snap-start cursor-pointer overflow-hidden border-gray-200 relative group transition-all bg-white p-5 rounded-sm min-w-62 h-72`} >
                                {product?.discountPrice &&
                                    <div className="absolute top-0 px-2 py-1 left-0 bg-green text-white text-sm z-50 rounded-br-sm">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
                                <div className="h-9/12 relative overflow-hidden pb-2 ">
                                    <img
                                        src={product?.ImageUrl}
                                        className="h-full w-full object-contain group-hover:scale-110 duration-500"
                                        alt={product?.name}
                                    />
                                </div>
                                <div className="flex justify-center gap-2 items-center flex-col h-3/12">
                                    <p className=" font-light uppercase ">{product?.name}</p>
                                    {product?.discountPrice ? (

                                        <div className="flex gap-5 font-light">

                                            <p className="  line-through text-gray-400 font-normal">₹{product?.price}.00</p>
                                            <p className=" text-green font-normal">₹{product?.discountPrice}.00</p>
                                        </div>
                                    ) : (<p className=" text-green font-normal">₹{product?.price}.00</p>
                                    )}
                                </div>
                            </div>)
                    })}
                </div> */}
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={prevSlide}
            >
                Prev
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={nextSlide}
            >
                Next
            </button>
        </div>
    );
};

export default Carousel;

