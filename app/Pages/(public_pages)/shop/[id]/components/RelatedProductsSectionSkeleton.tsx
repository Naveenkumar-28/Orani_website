import React from 'react'
import { RelatedProductSkeleton } from './RelatedProductSkeleton'

export function RelatedProductsSectionSkeleton() {
    return (
        <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
            <div className="flex justify-center flex-col items-center lg:gap-5 gap-3">
                <h6 className="text-green font-medium italic xl:text-xl lg:text-lg text-base">Products</h6>
                <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-2xl font-semibold text-gray-700">
                    Related <span className='text-green'>Products</span>
                </h1>
                <p className="text-gray-400 lg:text-base text-xs line-clamp-2 font-light">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
                </p>
            </div>

            <div className="flex pt-10 pb-5 select-none gap-5 overflow-x-auto snap-x snap-mandatory w-full">
                {[...Array(5)].map((_, index) => (<RelatedProductSkeleton key={index} />))}
            </div>
        </section>

    )
}
