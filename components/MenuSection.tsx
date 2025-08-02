import React from 'react'

export function MenuSection({ name }: { name: string }) {
    return (
        <div className="lg:h-[200px] h-34 relative lg:mb-10 mb-5 select-none">
            <img className="h-full w-full object-cover" src="/banner/bg_1.jpg" alt="bg_image" />
            <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.04)] flex justify-center items-center">
                <h1 className="font-extrabold text-white lg:text-3xl md:text-2xl sm:text-xl uppercase text-lg">{name}</h1>
            </div>
        </div>
    )
}
