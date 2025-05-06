import React, { useCallback } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

type paginationProps = {
    length: number;
    page: number;
    callback: (page: number) => void;
    setPage: (value: number) => void;

}

function Pagination({ length, page, callback, setPage }: paginationProps) {

    const onNext = useCallback(() => {
        if (!(page < length)) return
        const value = Math.min(length, page + 1)
        setPage(value)
        callback(value)
    }, [page, callback, length])

    const onForward = useCallback(() => {
        if (page == 1) return
        const value = Math.max(1, page - 1)
        setPage(value)
        callback(value)
    }, [page, callback])

    const numberCilck = useCallback((num: number) => {
        if (page == num) return
        setPage(num)
        callback(num)
    }, [page, callback])

    return (
        <>
            {length > 1 && (
                <div className='flex justify-center items-center gap-5'>
                    <button onClick={onForward} className='text-3xl border-2 outline-none border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronLeft /></button>
                    <ul className='flex gap-5'>
                        {[...Array(length)].map((_, index) => {
                            return <li key={index} onClick={() => numberCilck(index + 1)} className={`size-12 cursor-pointer flex justify-center items-center border text-lg rounded-full shadow-sm    ${page == (index + 1) ? "bg-green text-white border-transparent" : "text-gray-400 border-gray-300"}`}>{index + 1}</li>
                        })}
                    </ul>
                    <button onClick={onNext} className='text-3xl border-2 outline-none border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronRight /></button>
                </div>
            )}
        </>
    )
}

export default Pagination