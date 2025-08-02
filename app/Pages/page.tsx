"use client"
import React from "react"
import { BannerSection, FeaturedProductSection, HeroBannerWithCategorySelector, ProductCategorieSlider, BlogSection, ProductSliderSection } from "./components"

export default function Home() {

    return (

        <div>

            <HeroBannerWithCategorySelector />

            {/* Categorie Slider  */}
            <ProductCategorieSlider />

            {/* <!-- Featured Product Section  --> */}
            <FeaturedProductSection />

            {/* Banner Section  */}
            <BannerSection />

            {/* <!-- latest & top rated & review product  --> */}
            <ProductSliderSection />

            {/* <!-- Blog Section  --> */}
            <BlogSection />

        </div>
    )
}
