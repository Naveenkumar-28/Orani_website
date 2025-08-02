import { bodyOverflowHandler, createSendMessage } from '@/utils'
import React, { useCallback, useEffect } from 'react'
import { AddressType } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchAddresses, removeAddress } from '../redux'

type Props = { address: AddressType, closeDeleteModelHandler: () => void }

export const RemoveConfirmation: React.FC<Props> = ({ address, closeDeleteModelHandler }) => {

    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()
    const { page, isLoading } = useSelector((state: RootState) => state.Addresses)

    useEffect(() => {
        bodyOverflowHandler(true)
    })

    const removeAddressHandler = useCallback(async () => {
        if (!address._id) return
        closeDeleteModelHandler()
        try {
            await dispatch(removeAddress({ _id: address._id })).unwrap()
            sendMessage.success("Address removed successfully!")
            const previousPage = page
            for (let i = 1; i <= previousPage; i++) {
                dispatch(fetchAddresses({ limit: 5, page: i, refresh: true }))
            }
        } catch (error) {
            sendMessage.error("Address removed failed!")
        }
    }, [dispatch, page])

    return (
        <div className='z-[100] fixed top-0 left-0 w-full h-dvh grid place-items-center'>
            <div className="flex flex-col gap-8 sm:max-w-[35rem] w-11/12 bg-white rounded-sm py-5">
                <div className='flex flex-col justify-between items-center h-2/12 px-5'>
                    <h5 className="lg:text-lg font-medium capitalize mb-2 sm:text-base text-wrap text-sm">Are you sure you want to delete this address?</h5>
                    <div className='flex text-gray-400 mb-3 font-light sm:text-sm text-xs text-wrap'>
                        {`${address?.street} ${address?.city}- ${address?.postcode}`}
                    </div>
                    <div className='flex gap-3'>
                        <button onClick={closeDeleteModelHandler} className='px-3 md:text-base text-sm py-1 active:scale-95 duration-200 text-green rounded-md ring ring-green cursor-pointer'>No</button>
                        <button disabled={isLoading} onClick={removeAddressHandler} className='px-3 py-1 active:scale-95 duration-200 md:text-base text-sm text-white rounded-md ring ring-green cursor-pointer bg-green'>Yes , delete</button>
                    </div>
                </div>

            </div>
            <div onClick={closeDeleteModelHandler} className='bg-black/50 -z-1 absolute top-0 left-0 h-full w-full'></div>
        </div>
    )
}
