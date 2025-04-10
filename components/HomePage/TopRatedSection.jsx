import React, { useRef } from 'react'
import ProductHeaderAndMenu from "@/components/HomePage/ProductHeaderAndMenu";
import ProductsSlider from "@/components/HomePage/ProductsSlider";

function TopRatedSection() {
    const topRatedSliderRef = useRef(null)
    const bestReviewSliderRef = useRef(null)
    const latestProductSliderRef = useRef(null)

    const topRatedProductBtn = (btn) => {

        if (btn == "back") {
            nextProduct(topRatedSliderRef.current)

        }
        if (btn == "forward") {
            forwardProduct(topRatedSliderRef.current)
        }
    }
    const bestReviewProductBtn = (btn) => {

        if (btn == "back") {
            nextProduct(bestReviewSliderRef.current)

        }
        if (btn == "forward") {
            forwardProduct(bestReviewSliderRef.current)
        }
    }
    const latestProductBtn = (btn) => {

        if (btn == "back") {
            nextProduct(latestProductSliderRef.current)

        }
        if (btn == "forward") {
            forwardProduct(latestProductSliderRef.current)
        }
    }

    // Product automatically moving every 3s
    // setInterval(() => {
    //     nextProduct(latestProductSliderRef.current)
    //     nextProduct(bestReviewSliderRef.current)
    //     nextProduct(topRatedSliderRef.current)
    // }, 5000)

    const nextProduct = (slider) => {
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
    }


    const forwardProduct = (slider) => {
        const CardsWidth = Math.ceil(slider.scrollWidth / 3)
        console.log(slider.scrollLeft);

        //Once Slider to end ,the first child to append to last child to Slider
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
    }



    return (
        <section
            className="container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5">
            <div className=" w-full">
                <ProductHeaderAndMenu onClickFunction={latestProductBtn} title={"Latest Products"} />
                <ProductsSlider sliderName={"latestProduct"} ref={latestProductSliderRef} id={'latest_product_Slider'} />
            </div>
            <div className="w-full">
                <ProductHeaderAndMenu onClickFunction={topRatedProductBtn} title={"Top Rated Products"} />
                <ProductsSlider sliderName={"topRatedProduct"} ref={topRatedSliderRef} id={'Top_rated_product_Slider'} />
            </div>
            <div className="w-full">
                <ProductHeaderAndMenu onClickFunction={bestReviewProductBtn} title={"Review Products"} />
                <ProductsSlider sliderName={"bestReviewProduct"} ref={bestReviewSliderRef} id={'best_Review_Product_Slider'} />
            </div>
        </section>


    )
}

export default TopRatedSection