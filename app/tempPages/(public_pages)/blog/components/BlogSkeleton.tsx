import React from 'react'
import { BlogCardSkeleton } from "./BlogCardSkeleton";

type BlogSkeletonPropsType = {
    limit: number
}

export function BlogSkeleton({ limit }: BlogSkeletonPropsType) {
    return (
        <>
            <div className="h-[200px] relative mb-20 bg-gray-200 animate-pulse w-full">

            </div>
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-50 ">
                <div className="flex lg:flex-row flex-col lg:gap-10 gap-20 h-full">

                    {/* <!-- Blog Left Section  --> */}
                    <div className="xl:w-9/12 lg:w-8/12 w-full h-full flex flex-col gap-20">


                        {[...Array(limit)].map((_, index) => {
                            return <BlogCardSkeleton key={index} />
                        })}


                    </div>
                    {/* <!-- Blog Right section --> */}
                    <div className="lg:w-4/12   w-full h-full gap-20 flex flex-col">

                        {/* <!-- Search  --> */}
                        <div className=" bg-gray-200 animate-pulse rounded-sm h-12 "></div>

                        {/* <!-- Categorie  --> */}
                        <div>
                            <h4 className="text-xl font-normal mb-5">Categories</h4>
                            <ul className="flex flex-col gap-4 text-sm">
                                {[...Array(3)].map((_, index) => {
                                    return (
                                        <li key={index} className="bg-gray-200 animate-pulse h-8 w-full rounded-sm"></li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* <!-- Recent Blog --> */}
                        <div className="flex flex-col">
                            <h4 className="text-xl font-normal mb-8">Recent Blog</h4>
                            <div className="flex flex-col gap-10">
                                {
                                    [...Array(limit)].map((_, index) => {

                                        return (
                                            <div key={index} className="w-full flex ">
                                                <div className="w-3/12 h-20 bg-gray-200 animate-pulse"></div>
                                                <div className="w-9/12 flex flex-col gap-5 ml-5 ">
                                                    <h5 className="w-full h-15 bg-gray-200 animate-pulse rounded-sm"></h5>
                                                    <div className="flex text-xs gap-2 flex-wrap">
                                                        {[...Array(3)].map((_, index) => {
                                                            return <div key={index} className="bg-gray-200 w-15 h-8 rounded-sm"></div>
                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* <!-- Tag Cloud  --> */}
                        <div>
                            <h1 className="font-normal text-xl mb-6">Tag Cloud</h1>
                            <ul className="flex flex-wrap gap-2 text-xs text-gray-600 uppercase">
                                {[...Array(8)].map((_, index) => {
                                    return <li key={index} className=" bg-gray-200 animate-pulse w-20 h-8 rounded-sm"></li>
                                })}
                            </ul>
                        </div>
                        {/* <!-- Paragraph  --> */}
                        <div>
                            <h1 className="font-normal text-xl mb-6">Paragraph</h1>
                            <p className="bg-gray-200 animate-pulse w-full h-30 rounded-sm"></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
