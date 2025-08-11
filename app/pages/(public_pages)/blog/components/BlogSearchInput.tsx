import React, { SetStateAction } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'

type BlogSearchInputType = {
    search: string,
    setSearch: React.Dispatch<SetStateAction<string>>
    className: string
}

export function BlogSearchInput({ search, setSearch, className = 'flex' }: BlogSearchInputType) {
    return (
        <div className={` ${className} border-2 border-gray-300 focus-within:border-green rounded-md h-12 items-center`}>
            <IoSearchOutline className='text-gray-400 w-12 text-2xl' />
            <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className="h-full focus:w-[calc(100%-6rem)] w-[calc(100%-3rem)] outline-none placeholder:italic placeholder:text-gray-400 text-gray-500"
                placeholder="Search" />
            {search && <IoIosCloseCircle className='text-gray-400 hover:text-green w-12 text-xl cursor-pointer' onClick={() => setSearch('')} />}
        </div>
    )
}
