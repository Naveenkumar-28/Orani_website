import React from 'react'
import { IoCall } from 'react-icons/io5'

export function ContactDetails() {
    return (
        <div className="flex gap-5 items-center ">
            <div className="xl:size-11 size-10 rounded-full bg-gray-100  flex justify-center items-center">
                <IoCall className="text-green text-lg" />
            </div>
            <div className="justify-center items-center flex flex-col lg:text-white">
                <p className="font-semibold text-sm">+91 8489260109</p>
                <p className="font-light text-xs">support 24/7 time</p>
            </div>
        </div>
    )
}
