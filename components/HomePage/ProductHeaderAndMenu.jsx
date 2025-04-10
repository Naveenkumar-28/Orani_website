import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

function ProductHeaderAndMenu({ onClickFunction, title }) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="font-medium text-2xl">{title}</h1>
            <div id="Review_product_btn" className="flex gap-2">
                <button onClick={() => onClickFunction('back')} className="bg-[#7fad39] text-white cursor-pointer text-lg rounded-sm px-2 py-2">

                    <IoChevronBackOutline />
                </button>
                <button onClick={() => onClickFunction('forward')} className="bg-[#7fad39] text-white cursor-pointer text-lg rounded-sm px-2 py-2">

                    <IoChevronForwardOutline />
                </button>

            </div>
        </div>
    )
}

export default ProductHeaderAndMenu