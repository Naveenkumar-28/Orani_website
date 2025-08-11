import { Dropdown } from '@/components'
import React, { SetStateAction } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoClose, IoCloseCircle } from 'react-icons/io5'
import { RiFilter3Line } from 'react-icons/ri'
import { TbRefresh } from 'react-icons/tb'

type OrderSearchAndFiltersPropsType = {
    refreshHandler: () => void,
    search: string,
    setSearch: React.Dispatch<SetStateAction<string>>,
    statusFilter: string,
    setStatusFilter: React.Dispatch<SetStateAction<string>>
    isLoading: boolean
}

export function OrderSearchAndFilters({ refreshHandler, search, setSearch, setStatusFilter, statusFilter, isLoading }: OrderSearchAndFiltersPropsType) {


    return (
        <div className='flex justify-between items-center mb-2 sm:py-5 py-2'>
            <div className='flex lg:w-74 w-64 md:text-sm text-xs md:h-11 h-10 items-center rounded-sm ring-2 ring-gray-300 focus-within:ring-green ' >
                <IoIosSearch aria-label='Search-icon' className='md:text-2xl text-xl md:w-12 w-10 text-gray-400 focus-within:text-green' />
                <input aria-label='Search orders' value={search || ''} onChange={(e) => setSearch(e.target.value.trim().toLowerCase())} type="text" className='border-none h-full outline-none flex-1 placeholder:text-gray-400 text-gray-600 md:placeholder:text-base placeholder:text-sm text-sm' placeholder='Search by order id' />
                {search && <IoClose aria-label='Close-icon' onClick={() => setSearch('')} className='text-xl cursor-pointer hover:text-green md:w-12 w-10 text-gray-400' />}
            </div>
            <div className='flex items-center  md:gap-5 gap-4 '>
                <button aria-label="Refresh Orders" onClick={refreshHandler} className='ring-2 ring-gray-200 group text-white p-2 rounded-sm cursor-pointer active:ring-3 hover:ring-green bg-green duration-200 md:size-11 size-10 flex justify-center items-center'>
                    <TbRefresh className={`text-2xl ${isLoading && "animate-spin"} text-white group-hover:text-white duration-200`} />
                </button>
                <Dropdown status={statusFilter} onClick={setStatusFilter} dropdownHeight='md:h-11 h-10' icon={<RiFilter3Line className='md:text-lg text-base text-gray-400' />} dropdownInputPadding='py-2' dropdownOuterWidth='md:w-44 w-40' dropdownPosition='top-12' renderItems={["all", "pending", "confirmed", "shipping", "delivered", "cancelled"]} />
            </div>

        </div>
    )
}
