import React from 'react'
import { IoArrowUp } from 'react-icons/io5'

export function ScrollEndBtn() {
    return (
        <div role='button' className='text-gray-500 xl:text-lg text-base  flex gap-2 items-center hover:text-green cursor-pointer'
            onClick={() => scrollTo({ top: 0 })}>
            <IoArrowUp />
            <p>Scroll end</p>
        </div>
    )
}
