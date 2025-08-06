"use client";
import { AppDispatch } from "@/app/redux/store";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setDefaultAddress } from "../redux";
import { AddressType } from "../types";

type AddressCardProps = {
    address: AddressType
    addressEditHandler: (id: string) => void;
    setDeleteAddress: React.Dispatch<SetStateAction<null | AddressType>>
};

export const AddressCard: React.FC<AddressCardProps> = ({
    address,
    addressEditHandler,
    setDeleteAddress
}) => {
    const { _id, firstName, isChecked, lastName, mobileNumber, postcode, street } = address
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    // Handler to close the dropdown when clicking outside
    useEffect(() => {
        const closeMoreOption = () => {
            setIsActive(false)
        }
        window.addEventListener('click', closeMoreOption)

        return () => { window.removeEventListener('click', closeMoreOption) }
    }, [])

    // Handler to select the address
    const onSelectHandler = useCallback(() => {
        dispatch(setDefaultAddress({ id: _id }))
    }, [_id])

    return (
        <div
            className={`"border-b px-5 py-4 flex flex-col gap-2", ${isChecked && "ring-1 ring-green rounded-sm"} `}
        >
            <div className="flex items-start gap-3">
                <input
                    type="radio"
                    name="address"
                    checked={isChecked}
                    className="mt-1 accent-blue-600 size-4"
                    onChange={onSelectHandler}
                />
                <div onClick={() => {
                    !isChecked && onSelectHandler()
                }} className={`flex flex-col gap-2 w-full ${!isChecked && "cursor-pointer"}`}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-wrap items-center capitalize" >
                            <p className="font-medium lg:text-base text-sm">{`${firstName} ${lastName}`}</p>
                        </div>
                        {isChecked && (
                            <div className="relative">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    setIsActive(true)
                                }} className=" text-lg active:scale-95  cursor-pointer">
                                    <BsThreeDots />
                                </button>
                                {isActive && (
                                    <div onClick={(e) => e.stopPropagation()} className="absolute  right-0 top-0 flex flex-col bg-white px-3 py-2 gap-2 rounded-sm shadow-sm border border-gray-100 ">
                                        <button onClick={() => addressEditHandler(_id)} className="text-sm flex items-center gap-3 text-green cursor-pointer font-ligth hover:underline">
                                            <FaPen className="text-sm" /> Edit
                                        </button>
                                        <div className="border border-gray-100"></div>
                                        <button onClick={() => setDeleteAddress(address)} className="text-sm flex items-center gap-3 font-light text-red-500 cursor-pointer hover:underline">
                                            <IoTrashOutline className="" /> Delete
                                        </button>
                                    </div>

                                )}
                            </div>
                        )}
                    </div>
                    <p className="lg:text-sm text-xs font-normal text-neutral-600">
                        {street}, <span className="text-gray-700 font-normal">{postcode}</span>
                    </p>
                    <p className="font-medium lg:text-sm text-xs text-gray-800">Mobile no : <span className="text-neutral-600">{mobileNumber}</span></p>
                </div>
            </div>
        </div>
    );
};

