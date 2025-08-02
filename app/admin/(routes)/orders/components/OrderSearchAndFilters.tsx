import { Dropdown } from '@/components'
import React, { SetStateAction } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoCloseCircle } from 'react-icons/io5'
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
        <div className='flex justify-between items-center  mb-2 sm:py-5 py-2'>
            <div className='flex md:w-74 w-54 md:text-sm text-xs md:h-10 h-9 items-center px-4 py-2 rounded-sm ring-2 ring-gray-300 focus-within:ring-green ' >
                <input aria-label='Search orders' value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none outline-none w-full text-gray-500 md:placeholder:text-sm placeholder:text-xs' placeholder='Search by order id' />
                {!search ? <IoIosSearch aria-label='Search-icon' className='md:text-2xl text-xl ml-2 text-gray-400' /> : <IoCloseCircle aria-label='Close-icon' onClick={() => setSearch('')} className='text-xl cursor-pointer hover:text-green ml-2 text-gray-400' />}
            </div>
            <div className='flex items-center  md:gap-5 gap-4 '>
                <button aria-label="Refresh Orders" onClick={refreshHandler} className='ring-2 ring-gray-300 group text-white p-2 rounded-sm cursor-pointer hover:ring-green active:ring-3 hover:bg-green duration-200 md:size-10 size-9 flex justify-center items-center'>
                    <TbRefresh className={`text-2xl ${isLoading && "animate-spin"} text-green group-hover:text-white duration-200`} />
                </button>
                <Dropdown status={statusFilter} onClick={setStatusFilter} dropdownHeight='md:h-10 h-9' icon={<RiFilter3Line className='md:text-lg text-base text-gray-400' />} dropdownInputPadding='py-2' dropdownOuterWidth='md:w-44 w-40' dropdownPosition='top-12' renderItems={["all", "pending", "confirmed", "shipping", "delivered", "cancelled"]} />
            </div>

        </div>
    )
}
