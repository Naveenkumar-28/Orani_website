import { Button } from '@/components'
import { useRouter } from 'next/navigation'
import React from 'react'

export function HeroTextSection() {
    const router = useRouter()
    return (
        <div className="w-full bg-black/30 flex flex-col items-center justify-center h-full gap-5">
            <p className="font-bold  lg:text-xl md:text-base text-white text-sm">FRUIT FRESH</p>
            <div className="flex justify-center items-center flex-col text-white text-4xl min-[400px]:text-[2.8rem] font-semibold gap-4 sm:flex-row sm:text-5xl lg:text-7xl xl:text-[5.5rem] sm:font-medium ">
                <p>Vegetable</p>
                <p>100% Organic</p>
            </div>
            <p className="font-normal text-white mb-4 lg:font-bold sm:text-sm text-xs">Free Pickup and
                Delivery
                Available</p>
            <Button onClick={() => router.push(`/pages/shop`)} className='text-xs lg:text-sm xl:text-base font-medium' title='Shop Now' />
        </div>
    )
}
