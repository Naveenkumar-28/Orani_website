"use client"
import React, { memo, useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { HeroTextSection } from "./HeroTextSection";
import { TopBarSection } from './TopBarSection';

export const HeroBannerWithCategorySelector = memo(() => {
    const [image, setImage] = useState('/hero/bg_1.jpg')
    const timeInterval = useRef<ReturnType<typeof setInterval> | null>(null)
    const images = [{ image: '/hero/bg_2.jpg' }, { image: '/hero/bg_1.jpg' }]
    const [animate, setAnimate] = useState(true)
    const opacityRef = useRef(true)
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const countRef = useRef(0)

    useEffect(() => {
        if (timeInterval.current) clearInterval(timeInterval.current)
        timeInterval.current = setInterval(() => {
            setAnimate(false)
            opacityRef.current = false
            if (timeOutRef.current) clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                setImage(images[countRef.current].image)
                setAnimate(true)
                opacityRef.current = true
                countRef.current = countRef.current < images.length - 1 ? countRef.current + 1 : 0
            }, 500)

        }, 6000)
        return () => {
            if (timeInterval.current) clearInterval(timeInterval.current);
            if (timeOutRef.current) clearTimeout(timeOutRef.current);
        };

    }, [])

    return (
        <main className=" lg:mb-32 relative 2xl:container mx-auto mb-10">

            {/* Top bar */}
            <TopBarSection />

            {/* Hero Section */}
            <div className="relative lg:h-[550px] xl:h-[600px] sm:h-[500px] h-[calc(100dvh-4rem)] ">
                <HeroTextSection />
                <Image
                    className={`absolute top-0 left-0 h-full w-full object-cover -z-2 duration-500 ${opacityRef.current ? 'scale-100' : 'scale-90'} ${animate ? 'opacity-100' : "opacity-0"}`}
                    src={image}
                    alt="bg-image"
                    fill
                    priority
                />
            </div>
        </main>

    )
})