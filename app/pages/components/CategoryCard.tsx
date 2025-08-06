
import { useRouter } from 'next/navigation'
import React from 'react'
type CategoryCardProps = {
    category: {
        _id: number,
        name: string,
        ImageUrl: string
    }
}
export function CategoryCard({ category }: CategoryCardProps) {
    const router = useRouter()
    return (
        <div key={category?._id} className="flex h-[300px] justify-center snap-start" onClick={() => router.push(`/pages/shop?category=${category?.name}`)}>
            <div
                className=" overflow-hidden relative flex items-end w-[90%] cursor-pointer rounded-sm justify-start">
                <img src={category?.ImageUrl}
                    className="h-full group-hover:scale-110 duration-500 w-full object-cover"
                    alt="categories_img" />
                <div
                    className="absolute h-full w-full bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-start pb-5">
                    <p
                        className="py-1 bg-green rounded-br-sm rounded-tr-sm text-white  w-5/6 uppercase font-serif lg:text-xl text-base text-center">
                        {category?.name}</p>
                </div>
            </div>
        </div>
    )
}