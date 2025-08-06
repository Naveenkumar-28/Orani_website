"use client"
import React, { memo, useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { HeroTextSection } from "./HeroTextSection";
import { TopBarSection } from './TopBarSection';

export const HeroBannerWithCategorySelector = memo(() => {
    const [image, setImage] = useState('/hero/bg_1.jpg')
    const timeInterval = useRef<ReturnType<typeof setInterval> | null>(null)
    const images = [{ image: '/hero/bg_2.jpg' }, { image: '/hero/bg_1.jpg' }]
    const [imageBack, setImageBack] = useState('/hero/bg_2.jpg')
    const [animate, setAnimate] = useState(true)
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const countRef = useRef(0)

    useEffect(() => {
        if (timeInterval.current) clearInterval(timeInterval.current);

        timeInterval.current = setInterval(() => {
            setAnimate(false);
            if (timeOutRef.current) clearTimeout(timeOutRef.current);

            timeOutRef.current = setTimeout(() => {
                const nextIndex = countRef.current;
                const nextImage = images[nextIndex].image;

                setImageBack(image);
                setImage(nextImage);
                setAnimate(true);

                countRef.current = nextIndex < images.length - 1 ? nextIndex + 1 : 0;
            }, 500);
        }, 6000);

        return () => {
            if (timeInterval.current) clearInterval(timeInterval.current);
            if (timeOutRef.current) clearTimeout(timeOutRef.current);
        };
    }, []);


    return (
        <main className=" lg:mb-32 relative 2xl:container mx-auto mb-10">

            {/* Top bar */}
            <TopBarSection />

            {/* Hero Section */}
            <div className="relative lg:h-[550px] xl:h-[600px] sm:h-[500px] h-[calc(100dvh-4rem)] ">
                <HeroTextSection />
                <Image
                    className={`absolute top-0 left-0 h-full w-full object-cover -z-3`}
                    src={imageBack}
                    alt="bg-image"
                    fill
                    priority
                />
                <Image
                    className={`absolute top-0 left-0 h-full w-full object-cover -z-2 duration-500 ${animate ? 'opacity-100' : "opacity-0"}`}
                    src={image}
                    alt="bg-image"
                    fill
                    priority
                />
            </div>
        </main>

    )
})