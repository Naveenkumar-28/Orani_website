import { RootState } from "@/app/redux/store"
import { useCallback, useRef } from "react"
import { useSelector } from "react-redux"
import Slider from "react-slick"

export const useProductSliderHandlers = () => {
    const topRatedSliderRef = useRef<Slider | null>(null)
    const bestReviewSliderRef = useRef<Slider | null>(null)
    const latestProductSliderRef = useRef<Slider | null>(null)
    const { isLoading, bestReviewedProducts, topRatedProducts, latestProducts } = useSelector((state: RootState) => state.productSliderList)

    // button click handler
    const buttonHandler = useCallback(({ name, action }: { name: string, action: string }) => {
        switch (name) {
            case "latestProduct":
                if (action == "back" && latestProductSliderRef.current) return latestProductSliderRef.current?.slickNext()
                if (action == "forward" && latestProductSliderRef.current) return latestProductSliderRef.current?.slickPrev()
                break;
            case "topRatedProduct":
                if (action == "back" && topRatedSliderRef.current) return topRatedSliderRef.current?.slickNext()
                if (action == "forward" && topRatedSliderRef.current) return topRatedSliderRef.current?.slickPrev()
                break;
            case "bestReviewProduct":
                if (action == "back" && bestReviewSliderRef.current) return bestReviewSliderRef.current?.slickNext()
                if (action == "forward" && bestReviewSliderRef.current) return bestReviewSliderRef.current?.slickPrev()
                break;
            default:
                break;
        }
    }, [])

    // Product slider data
    const productSliderData = [
        {
            title: "Latest Products",
            name: "latestProduct",
            onclick: buttonHandler,
            ref: latestProductSliderRef,
            products: latestProducts
        },
        {
            title: "Top Rated Products",
            name: "topRatedProduct",
            onclick: buttonHandler,
            ref: topRatedSliderRef,
            products: topRatedProducts
        },
        {
            title: "Review Products",
            name: "bestReviewProduct",
            onclick: buttonHandler,
            ref: bestReviewSliderRef,
            products: bestReviewedProducts
        },
    ]

    return {
        productSliderData,
        isLoading,
    }

}