import React, { useCallback } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getPageRange } from '@/utils'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

type paginationProps = {
    length: number;
    page: number;
    callback: (page: number) => void;
}

export function Pagination({ length, page, callback }: paginationProps) {

    const onNext = useCallback(() => {
        if (!(page < length)) return
        const value = Math.min(length, page + 1)
        callback(value)
    }, [page, callback, length])

    const onForward = useCallback(() => {
        if (page == 1) return
        const value = Math.max(1, page - 1)
        callback(value)
    }, [page, callback])

    const numberClick = useCallback((num: number) => {
        if (page == num) return
        callback(num)
    }, [page, callback])

    return (
        <>
            {length > 1 && (
                <div className='flex justify-center items-center sm:gap-5 gap-2'>
                    <button
                        onClick={onForward}
                        disabled={page === 1}
                        className={`sm:text-5xl text-xl sm:size-11 size-10 flex justify-center items-center outline-none text-green rounded-full p-2  duration-100 ${page === 1 ? "opacity-50 cursor-not-allowed" : "active:scale-95 cursor-pointer hover:ring-1"
                            }`}
                    >
                        <MdOutlineArrowBackIosNew />
                    </button>
                    <ul className='flex sm:gap-4 gap-2 min-[375px]:gap-2.5'>
                        {getPageRange(page, length).map((p, index) => (
                            <li
                                key={index}
                                onClick={() => typeof p === "number" && numberClick(p)}
                                className={` cursor-pointer flex justify-center items-center md:text-base text-sm 
                                             ${p === page ? "bg-green text-white ring-green" : "text-gray-400 ring-gray-300"}
                                              ${p === "..." ? "pointer-events-none cursor-not-allowed" : "ring-1 rounded-full shadow-sm min-[375px]:size-10 sm:size-11 size-9"}
                                          `} >
                                {p}
                            </li>
                        ))}

                    </ul>
                    <button
                        onClick={onNext}
                        disabled={page === length}
                        className={`sm:text-3xl text-xl sm:size-11 size-10 flex justify-center items-center outline-none text-green rounded-full p-2  duration-100 ${page === length ? "opacity-50 cursor-not-allowed" : "active:scale-95  cursor-pointer hover:ring-1"
                            }`}
                    >
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            )}
        </>
    )
}