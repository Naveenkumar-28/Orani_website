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
        <div className={` ${className} border-2 border-gray-300 focus-within:border-green rounded-sm h-12 items-center`}>
            <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className="w-10/12 ps-3 h-full outline-none placeholder:italic text-gray-500"
                placeholder="Search" />
            <div className="w-2/12 text-xl flex justify-center cursor-pointer hover:text-green" >
                {search ? <IoIosCloseCircle className='text-gray-400 hover:text-green' onClick={() => setSearch('')} /> : <IoSearchOutline className='text-gray-300' />}
            </div>
        </div>
    )
}
