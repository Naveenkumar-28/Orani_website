import React, { useCallback, useRef, useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { HeaderActions } from './HeaderActions'
import { WEB_SITE_NAME } from '@/constants'
import { FiSearch } from 'react-icons/fi'
import { SmallDeviceSearchInputField } from './SmallDeviceSearchInputField'
import { NavAccordion } from './NavAccordion'

export function SmallDeviceMenu() {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const [isActive, setActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const closeTopDrawerHandler = useCallback(() => {
        setActive(false)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setDrawerOpen(false)
        }, 500)
    }, [])

    const openTopDrawerHandler = useCallback(() => {
        setDrawerOpen(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setActive(true)
        }, 50)
    }, [])

    const onClickHandler = useCallback(() => {
        setIsOpen(true)
    }, [])

    return (
        <header className='lg:hidden select-none sticky top-0 z-[99] shadow-lg bg-white'>
            <div className='mediaQuary'>
                <div className=" w-full flex items-center justify-between py-5  h-16 ">
                    <h1 className='sm:text-[1.7rem] text-2xl text-green font-semibold uppercase'>{WEB_SITE_NAME}</h1>
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <div onClick={onClickHandler} className='sm:w-52 text-gray-500 text-lg min-[425px]:w-52 ring-1 ring-gray-300 flex justify-center items-center rounded-md cursor-pointer h-9 px-2 gap-2 w-28'>
                            <FiSearch className=' text-2xl text-gray-400' />
                            <p className=' font-light text-sm w-full'>Search</p>
                        </div>

                        {isActive ? (<div className="lg:hidden text-gray-700 cursor-pointer flex gap-1 active:scale-95" onClick={closeTopDrawerHandler} id="menu_icon" >
                            <IoClose className="font-extrabold text-3xl" />
                        </div>) : (<div className="lg:hidden text-gray-700 cursor-pointer flex gap-1 active:scale-95" onClick={openTopDrawerHandler} id="menu_icon" >
                            <HiOutlineMenuAlt1 className="font-extrabold text-3xl" />
                        </div>)}
                    </div>
                </div>

                {/* Search Input Field */}
                {isOpen && <div className='bg-white h-full w-full fixed top-0 left-0 z-50'>
                    <SmallDeviceSearchInputField setIsOpen={setIsOpen} />
                </div>}

                {drawerOpen && <div className={` ${isActive ? "max-h-[500px]" : "max-h-0"} transition-[max-height]  lg:hidden duration-500  overflow-hidden `}>
                    <div className='py-5 h-full w-full border-t-2 border-gray-100 bg-white'>
                        <HeaderActions mobileMode={true} closeTopDrawerHandler={closeTopDrawerHandler} />
                        <NavAccordion closeTopDrawerHandler={closeTopDrawerHandler} />
                    </div>
                </div>}
            </div>
        </header>
    )
}