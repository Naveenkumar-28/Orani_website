import React, { useEffect } from 'react'
import { Input } from './Input'
import { IoIosArrowDown } from 'react-icons/io'
import { states } from '@/lib/stateList'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components'
import { AddressFormData } from '../types'
import { bodyOverflowHandler } from '@/utils'

type Props = {
    closeHandler: () => void;
    addressformData: AddressFormData;
    isLoading: boolean;
    title?: string;
    buttonTitle?: string;
    onSubmitHandler: (e: React.FormEvent) => void;
}

export function AddressFormModel({
    buttonTitle = "Save Address",
    closeHandler,
    title = "Add new address",
    addressformData,
    isLoading,
    onSubmitHandler }: Props) {

    useEffect(() => {
        bodyOverflowHandler(true)
    }, [])

    return (
        <div className='z-[100] fixed top-0 right-0 w-full h-dvh grid lg:place-items-center place-items-end'>
            <div className="relative flex flex-col lg:px-2 xl:w-6/12 lg:w-8/12 md:w-8/12 sm:w-10/12 w-full max-h-dvh bg-white lg:rounded-md overflow-hidden ">
                <div className='flex justify-between items-center h-22 px-5'>
                    <h2 className="xl:text-2xl font-normal capitalize text-xl">{title}</h2>
                    <button onClick={closeHandler} className='text-2xl ring-2 rounded-sm text-gray-400 cursor-pointer hover:text-red-500 active:scale-95'>
                        <IoClose />
                    </button>
                </div>
                <div className='flex flex-col gap-5 overflow-y-auto px-5 h-[calc(100%-11rem)] py-2'>
                    <div className="flex flex-col gap-5 lg:flex-row w-full">
                        <Input {...addressformData.firstName} />
                        <Input {...addressformData.lastName} />
                    </div>
                    <Input {...addressformData.country} />
                    <Input {...addressformData.street} />

                    <div className="flex flex-col gap-5 lg:flex-row w-full">
                        <div className="w-full">
                            <label className="text-sm font-normal mb-10">Town / City</label>
                            <div className={`${addressformData.city.error ? "ring-red-500" : "focus-within:ring-green"} relative text-sm font-light text-gray-600 rounded-sm ring-1 ring-gray-200 w-full h-14`}>
                                <select value={addressformData.city.value} onChange={addressformData.city.onChange} className='h-full w-full appearance-none outline-none  ps-5 capitalize'  >
                                    <option key={0} value="">Select city</option>
                                    {states.map((state, index) => {
                                        return <option key={index} value={state} className='capitalize'>{state}</option>
                                    })}
                                </select>
                                <i className='absolute right-5 top-1/2 -translate-y-1/2 text-lg '>
                                    <IoIosArrowDown />
                                </i>
                            </div>

                        </div>
                        <Input {...addressformData.postcode} />

                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <Input {...addressformData.mobileNumber} />
                    </div>
                </div>
                <div className='h-22 lg:mb-0 sm:mb-5 mb-2 px-5 flex items-center'>
                    <Button loading={isLoading} loadingContent='Uploading...' disabled={isLoading} title={buttonTitle} className='w-full shadow-none' onClick={onSubmitHandler} />
                </div>
            </div>
            <div onClick={closeHandler} className='bg-black/60 -z-1 absolute top-0 left-0 h-full w-full'></div>
        </div>
    )
}
