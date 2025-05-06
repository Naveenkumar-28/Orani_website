import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

function ProductHeaderAndMenu({ onClickFunction, title, name }) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="font-medium text-2xl">{title}</h1>
            <div id="Review_product_btn" className="flex gap-2">
                <button onClick={() => onClickFunction({ name: name, action: 'back' })} className="bg-green shadow-sm active:shadow-none focus-within:outline-none text-white cursor-pointer text-lg rounded-sm px-2 py-2">

                    <IoChevronBackOutline />
                </button>
                <button onClick={() => onClickFunction({ name: name, action: 'forward' })} className="bg-green shadow-sm active:shadow-none focus-within:outline-none text-white cursor-pointer text-lg rounded-sm px-2 py-2">

                    <IoChevronForwardOutline />
                </button>

            </div>
        </div>
    )
}

export default ProductHeaderAndMenu