import { useRouter } from 'next/navigation'
import React from 'react'

export function HeroTextSection() {
    const router = useRouter()
    return (
        <div className="w-full bg-black/30  flex flex-col items-center justify-center h-full gap-3">
            <p className="font-bold  lg:text-xl md:text-base text-white text-sm">FRUIT FRESH</p>
            <div className="flex justify-center items-center flex-col text-white text-4xl font-semibold gap-4 sm:flex-row sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl sm:font-medium ">
                <p>Vegetable</p>
                <p>100% Organic</p>
            </div>
            <p className="font-normal text-white mb-4 lg:font-bold sm:text-sm text-xs">Free Pickup and
                Delivery
                Available</p>
            <button onClick={() => router.push(`/pages/shop`)}
                className="bg-green active:scale-95 cursor-pointer border-2 border-transparent hover:border-white rounded-full sm:text-base text-xs duration-500 text-white font-medium md:text-base lg:py-3 py-2 shadow-lg lg:px-5 px-3 lg:mt-3">Shop
                Now</button>
        </div>
    )
}
