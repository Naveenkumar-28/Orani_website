"use client";
import React, { memo, useCallback, useState } from "react";
import { AddressCard } from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddressCardSkeleton } from "./AddressCardSkeleton";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { fetchAddresses, setEditAddress } from "../redux";
import { RemoveConfirmation } from "./RemoveConfirmation";
import { bodyOverflowHandler } from "@/utils";
import { AddressType } from "../types";

type Props = {
    limit: number;
    setAddAddressModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditAddressModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddressList: React.FC<Props> = memo(({ limit, setAddAddressModelOpen, setEditAddressModelOpen }) => {
    const [deleteAddress, setDeleteAddress] = useState<AddressType | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const { addresses, isSkeletonLoading, totalPage, page } = useSelector((state: RootState) => state.Addresses)

    const getMoreAddresses = useCallback(() => {
        if (page >= totalPage) return

        dispatch(fetchAddresses({ page: page + 1, limit }))
    }, [page, limit, totalPage])

    // Handler to edit address
    const addressEditHandler = useCallback((id: string) => {
        dispatch(setEditAddress({ _id: id }))
        setEditAddressModelOpen(true)
    }, [dispatch])

    const closeDeleteModelHandler = useCallback(() => {
        setDeleteAddress(null)
        bodyOverflowHandler(false)
    }, [bodyOverflowHandler])

    return (
        <>
            <div className="text-neutral-800">
                <div className=" font-normal text-xl flex justify-between items-center mb-5">
                    <span className="capitalize xl:text-2xl text-xl">Delivery Address</span>
                    <span onClick={() => setAddAddressModelOpen(true)} className="text-white bg-green px-3 py-2 rounded-sm xl:text-base text-sm cursor-pointer active:scale-95 duration-200 flex items-center gap-2"><IoMdAdd /> Add New </span>
                </div>
                {!isSkeletonLoading ? (
                    <>
                        {addresses.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {addresses.map((address, index) => (
                                    <AddressCard
                                        key={index}
                                        addressEditHandler={addressEditHandler}
                                        address={address}
                                        setDeleteAddress={setDeleteAddress}
                                    />
                                ))}
                                {page < totalPage && (
                                    <div onClick={getMoreAddresses} className="text-green flex items-center gap-2 cursor-pointer py-1">
                                        <IoIosArrowDown className="text-xl" />
                                        <span className="font-medium text-sm">View all 4 addresses</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center h-36 flex justify-center items-center text-neutral-500">
                                No address found
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {Array.from({ length: limit }).map((_, index) => {
                            return <AddressCardSkeleton key={index} />
                        })}
                    </>
                )}
            </div>
            {deleteAddress && <RemoveConfirmation address={deleteAddress} closeDeleteModelHandler={closeDeleteModelHandler} />}
        </>

    );
})