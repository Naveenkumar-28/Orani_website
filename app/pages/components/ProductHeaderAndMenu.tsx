import { useThrottleCallback } from '@/hooks'
import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

type PropsType = {
    callback: (value: { name: string, action: string }) => void,
    title: string,
    name: string,
    isLoading: boolean
}

export function ProductHeaderAndMenu({ callback, title, name, isLoading }: PropsType) {

    const onClickThrottled = useThrottleCallback(callback, 1000)

    return (
        <div className="flex justify-between items-center">
            <h1 className="font-medium md:text-2xl text-lg text-gray-700">{title}</h1>
            <div id="Review_product_btn" className="flex gap-2">
                <button disabled={isLoading} onClick={() => onClickThrottled({ name, action: "next" })} className="bg-green active:scale-95 shadow-sm active:shadow-none focus-within:outline-none text-white cursor-pointer sm:text-lg text-base rounded-sm px-2 py-2">
                    <IoChevronBackOutline />
                </button>
                <button disabled={isLoading} onClick={() => onClickThrottled({ name, action: 'forward' })} className="bg-green active:scale-95 shadow-sm active:shadow-none focus-within:outline-none text-white cursor-pointer sm:text-lg text-base rounded-sm px-2 py-2">
                    <IoChevronForwardOutline />
                </button>
            </div>
        </div>
    )
}
