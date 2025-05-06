import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductHeaderAndMenu from "@/components/HomePage/ProductHeaderAndMenu";
import ProductsSlider from "@/components/HomePage/ProductsSlider";
import axios from 'axios';

function TopRatedSection() {
    const topRatedSliderRef = useRef(null)
    const bestReviewSliderRef = useRef(null)
    const latestProductSliderRef = useRef(null)
    const timeoutRef = useRef(null)
    const [productList, setProductList] = useState({ topRatedProducts: [], bestReviewedProducts: [], latestProducts: [] })
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)

    // button click handler
    const buttonHandler = useCallback(({ name, action }) => {
        switch (name) {
            case "latestProduct":
                if (action == "back") return nextProduct(latestProductSliderRef.current)
                if (action == "forward") return forwardProduct(latestProductSliderRef.current)
                break;
            case "topRatedProduct":
                if (action == "back") return nextProduct(topRatedSliderRef.current)
                if (action == "forward") return forwardProduct(topRatedSliderRef.current)
                break;
            case "bestReviewProduct":
                if (action == "back") return nextProduct(bestReviewSliderRef.current)
                if (action == "forward") return forwardProduct(bestReviewSliderRef.current)
                break;
            default:
                break;
        }
    }, [])


    // Product slider automatically moving every 3s
    useEffect(() => {
        if (loadingSkeleton) return
        clearInterval(timeoutRef.current)
        timeoutRef.current = setInterval(() => {
            nextProduct(latestProductSliderRef.current)
            nextProduct(bestReviewSliderRef.current)
            nextProduct(topRatedSliderRef.current)
        }, 5000)
        return () => clearInterval(timeoutRef.current)
    }, [loadingSkeleton])


    // Product slider navigation to next card
    const nextProduct = useCallback((slider) => {
        const CardsWidth = slider.scrollWidth / 3

        //Once Slider to end ,the first child to append to last child to Slider
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 20) {
            let firstThree = [
                slider.children[0],
                slider.children[1],
                slider.children[2]
            ];

            firstThree.forEach(child => slider.appendChild(child));

            slider.scrollLeft -= CardsWidth
        }

        slider.scrollBy({ left: CardsWidth, behavior: "smooth" });
    }, [])


    // product slider navigation to previous card
    const forwardProduct = useCallback((slider) => {
        const CardsWidth = Math.ceil(slider.scrollWidth / 3)

        // once Slider to start, the last child to append to first child to Slider
        if (slider.scrollLeft == 0) {
            const length = (slider.children.length) - 1
            let firstThree = [
                slider.children[length],
                slider.children[length - 1],
                slider.children[length - 2]
            ];

            firstThree.forEach(child => slider.prepend(child));

            slider.scrollLeft += CardsWidth;
        }

        slider.scrollBy({ left: -CardsWidth, behavior: "smooth" });
    }, [])


    //Getting product list from API
    useEffect(() => {
        const getProductsList = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ProductList`)
                if (response.data.success) {
                    console.log("productList", response.data);
                    const { topRatedProducts, bestReviewedProducts, latestProducts } = response.data;
                    setProductList({ topRatedProducts, bestReviewedProducts, latestProducts })
                }

            } catch (error) {
                console.log(error?.message);
            } finally {

                setLoadingSkeleton(false)
            }
        }
        getProductsList()
    }, [])

    const productSilderData = [
        {
            title: "Latest Products",
            name: "latestProduct",
            onclick: buttonHandler,
            ref: latestProductSliderRef,
            products: productList.latestProducts
        },
        {
            title: "Top Rated Products",
            name: "topRatedProduct",
            onclick: buttonHandler,
            ref: topRatedSliderRef,
            products: productList.topRatedProducts
        },
        {
            title: "Review Products",
            name: "bestReviewProduct",
            onclick: buttonHandler,
            ref: bestReviewSliderRef,
            products: productList.bestReviewedProducts
        },
    ]


    return (
        <section
            className=" container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5">

            {productSilderData.map((product, index) => {
                return (
                    <div key={index} className=" w-full ">
                        <ProductHeaderAndMenu onClickFunction={product.onclick} title={product.title} name={product.name} />
                        <ProductsSlider sliderName={product.name} ref={product.ref} products={product.products} loadingSkeleton={loadingSkeleton} />
                    </div>
                )
            })}
        </section>


    )
}

export default TopRatedSection