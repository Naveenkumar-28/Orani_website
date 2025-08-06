import { SuggestionType } from '@/app/types'
import React from 'react'

export function SuggestionCard({ product, search, onClickHandler }: { product: SuggestionType, search: string, onClickHandler: (id: string) => void }) {
    return (
        <li onClick={() => onClickHandler(product._id)} className="flex overflow-hidden active:scale-98 w-full text-gray-600 px-3 h-9 border-l-transparent hover:border-l-4 duration-200 group" >
            <div className="h-full w-10 overflow-hidden">
                <img className="h-full w-full object-contain" src={product?.imageUrl} alt="productImage" />
            </div>
            <div className="text-sm group-hover:text-neutral-800 rounded-sm h-full w-full cursor-pointer flex items-center ps-2 ">
                <span className='first-letter:capitalize'>
                    {product?.splittedName?.map((splittedName, index) => {
                        return splittedName.toLowerCase() === search.toLowerCase() ? (
                            <b key={index} className="text-green font-semibold">{splittedName}</b>
                        ) : (splittedName)
                    }
                    )}
                </span>
            </div>
        </li>
    )
}
