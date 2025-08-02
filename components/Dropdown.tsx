"use client"
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

type DropdownProps = {
    icon?: React.ReactNode; // Icon to be displayed before dropdown status
    onClick: (value: string) => void;
    status: string;
    renderItems: string[]
    className?: string;
    dropdownStyle?: string;
    dropdownPosition?: string; // "top-10" or "bottom-10"
    dropdownOuterDiv?: string; // Additional class for outer div
    dropdownOuterWidth?: string; // Additional width for outer div
    dropdownInputPadding?: string;// Additional padding for input field
    dropdownHeight?: string;
}
export function Dropdown({
    icon,
    onClick,
    status,
    renderItems,
    className = "text-gray-600",
    dropdownStyle = "",
    dropdownPosition = "bottom-10",
    dropdownOuterDiv = "ring-2 ring-gray-300",
    dropdownOuterWidth = "w-full",
    dropdownInputPadding = " py-3",
    dropdownHeight = "h-14"
}: DropdownProps) {
    const [isActive, setIsActive] = useState(false)
    const currentStatus = status

    const statusHandler = (value: string) => {

        onClick(value)
    }

    return (
        <div className={`${dropdownOuterDiv} ${dropdownHeight} relative focus-within:ring-green flex items-center ${dropdownOuterWidth}  focus:border-green  px-5 rounded-sm `}>
            <input type="text"
                value={currentStatus || 'Please Select'}
                onFocus={() => setIsActive(true)}
                onBlur={() => setTimeout(() => setIsActive(false), 300)}
                readOnly
                className={`${className} text-sm md:text-base flex w-full cursor-auto items-center outline-none ${dropdownInputPadding} capitalize  `} />
            {icon ? icon : <IoIosArrowDown className='text-gray-400 ' />}
            {isActive && (
                <div className={`absolute bg-white ${dropdownPosition} shadow-md left-0 z-20 w-full ring-2 ring-gray-100  rounded-md overflow-hidden  ${dropdownStyle}`}>
                    {renderItems?.map((status, index) => {
                        return <div key={index} onClick={() => statusHandler(status)} className={` ${status?.toLowerCase() == currentStatus?.toLowerCase() ? "bg-green text-white" : "hover:bg-gray-100"} capitalize py-1 px-5 cursor-pointer duration-200 text-sm md:text-base md:py-2`}>{status}</div>
                    })}
                </div>
            )}
        </div>
    )
}
