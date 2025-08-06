import { RootState } from '@/app/redux/store'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

export const BlogPragraph = memo(() => {
    const { loadingSkeleton } = useSelector((state: RootState) => state.BlogList)
    return (
        <div>
            <h1 className="font-normal text-xl mb-6">Paragraph</h1>
            {!loadingSkeleton ? (
                <p className="text-gray-500 text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit fuga autem
                    sit vero qui molestiae
                    amet nobis sunt minus. Numquam vitae natus, neque sint maiores velit rem nulla harum voluptas?
                </p>

            ) : (
                <p className="">
                    <span className="block bg-gray-200 h-3 w-full rounded-sm animate-pulse mb-1.5"></span>
                    <span className="block bg-gray-200 h-3 w-11/12 rounded-sm animate-pulse mb-1.5"></span>
                    <span className="block bg-gray-200 h-3 w-10/12 rounded-sm animate-pulse mb-1.5"></span>
                    <span className="block bg-gray-200 h-3 w-9/12 rounded-sm animate-pulse"></span>
                </p>

            )}
        </div>
    )
})
