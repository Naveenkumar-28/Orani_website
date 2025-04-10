"use client"
import React, { useCallback, useEffect, useState } from "react"
import BannerSection from '@/components/HomePage/BannerSection'
import BlogSection from '@/components/HomePage/BlogSection'
import TopRatedSection from '@/components/HomePage/TopRatedSection'
import FeaturedProductSection from '@/components/HomePage/FeaturedProductSection'
import ProductCategorieSlider from '@/components/HomePage/ProductCategorieSlider'
import MainSection from '@/components/HomePage/MainSection'
import { useDispatch } from "react-redux"
import { addProductList } from "../redux/slices/productListSlice"
import axios from "axios"
import { useUser } from "@clerk/nextjs"

export default function Home() {
    const [userSaved, setUserSaved] = useState(false);
    const { user, isSignedIn } = useUser()

    const dispatch = useDispatch()


    const GetProductList = useCallback(async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ProductList`)
            if (response.data.success) {
                dispatch(addProductList(response.data.products))
            }

        } catch (error) {
            console.log((error as Error).message);

        }
    }, [])

    useEffect(() => {
        GetProductList()
    }, [])



    useEffect(() => {
        const isUserAction = async () => {
            if (!user || userSaved) return;

            try {
                if (user && isSignedIn) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-user`, {
                        clerkId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        name: user.fullName,
                        image: user.imageUrl,
                    })

                    if (res.status < 300) {
                        console.log(res.data);

                        setUserSaved(true);
                    }
                }
            } catch (error) {
                console.log((error as Error)?.message)
            }
        }

        isUserAction()
    }, [user, isSignedIn]);



    return (

        <div>

            <MainSection />

            {/* Categorie Slider  */}
            <ProductCategorieSlider />

            {/* <!-- Featured Product Section  --> */}
            <FeaturedProductSection />

            {/* Banner Section  */}
            <BannerSection />

            {/* <!-- latest & top rated & review product  --> */}
            <TopRatedSection />

            {/* <!-- Blog Section  --> */}
            <BlogSection />

        </div>
    )
}
