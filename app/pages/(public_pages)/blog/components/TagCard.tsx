import { RootState } from '@/app/redux/store'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

export const TagCard = memo(() => {
    const { loadingSkeleton } = useSelector((state: RootState) => state.BlogList)

    const tagCardName = [
        { name: 'Fruits' },
        { name: 'Mango' },
        { name: 'Tomatoe' },
        { name: 'Apple' },
        { name: 'Carrots' },
        { name: 'Orange' },
        { name: 'Pepper' },
        { name: 'Eggplant' },
    ]
    return (
        <div>
            <h1 className="font-normal text-xl mb-6">Tag Cloud</h1>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-600 uppercase">
                {!loadingSkeleton ? (
                    <>
                        {tagCardName.map((card, index) => (
                            <li key={index}
                                className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                {card.name}
                            </li>
                        ))}
                    </>
                ) : (
                    <>
                        {Array.from({ length: tagCardName.length }).map((_, index) => (
                            <li key={index}
                                className="border w-20 h-6 py-1 px-2 rounded-sm border-gray-300 bg-gray-200 animate-pulse"
                            />

                        ))}
                    </>
                )}
            </ul>
        </div>
    )
})