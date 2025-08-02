"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FullScreenLoader, MenuSection } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { AddressFormModel, PaymentMethod } from './components';
import { useAddAddressHandler } from './hooks';
import { AppDispatch, RootState } from '@/app/redux/store';
import { CartTotal } from '../../components';
import { AddressList } from './components/AddressList';
import { bodyOverflowHandler } from '@/utils';
import { fetchAddresses } from './redux/api/fetchAddresses';
import { resetAddNewAddress } from './redux';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export { };

function page() {
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading: isUserLoading, isSignedIn, user } = useSelector((state: RootState) => state.UserDetails)
    const [isEditAddressModelOpen, setEditAddressModelOpen] = useState(false)
    const [isAddAddressModelOpen, setAddAddressModelOpen] = useState(false)
    const [limit, setLimit] = useState(5)
    const { addresses } = useSelector((state: RootState) => state.Addresses)

    const addNewModelCloseHandler = useCallback(() => {

        setAddAddressModelOpen(false)
        bodyOverflowHandler(false)
        dispatch(resetAddNewAddress())

    }, [dispatch, bodyOverflowHandler])

    const EditModelCloseHandler = useCallback(() => {

        setEditAddressModelOpen(false)
        bodyOverflowHandler(false)
        dispatch(resetAddNewAddress())

    }, [dispatch, bodyOverflowHandler])

    const { addressformData, validateAddressForm, isLoading, editAddressHandler, uploadAddressHandler } = useAddAddressHandler({ addNewModelCloseHandler, EditModelCloseHandler })

    const getAddresses = useCallback(async () => {
        dispatch(fetchAddresses({ page: 1, limit, firstTimeLoading: true })).unwrap().then((response) => {
            if (response.addresses.length == 0) {
                setAddAddressModelOpen(true)
            }
        })
    }, [limit])

    useEffect(() => {
        if (!isUserLoading) {
            if (isSignedIn && user) {
                if (!addresses.length) {
                    getAddresses()
                }
            }
        }
    }, [user, isSignedIn])

    return (
        <>
            <MenuSection name={"Checkout"} />

            <div className="mediaQuary mb-48 xl:mt-20 lg:mt-15 mt-10" >
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* <!-- Address section  --> */}
                    <div className='lg:w-7/12'>
                        <AddressList
                            setEditAddressModelOpen={setEditAddressModelOpen}
                            limit={limit}
                            setAddAddressModelOpen={setAddAddressModelOpen}
                        />
                    </div>
                    {/* <!-- Cart Total & Payment  --> */}
                    <div className="lg:flex-5/12  w-full flex flex-col gap-8">

                        {/* <!-- Cart Total  --> */}
                        <CartTotal />

                        {/* <!-- Payment Method  --> */}
                        <PaymentMethod />

                    </div>
                </div>
            </div>

            {/*  <!-- Add new address model  --> */}
            {isAddAddressModelOpen && (
                <AddressFormModel
                    onSubmitHandler={(e: React.FormEvent) => {
                        e.preventDefault()
                        validateAddressForm(uploadAddressHandler)
                    }}
                    addressformData={addressformData}
                    closeHandler={addNewModelCloseHandler}
                    isLoading={isLoading}
                />
            )}

            {/* <!-- Edit address model  --> */}
            {isEditAddressModelOpen && (
                <AddressFormModel
                    buttonTitle='Edit Address'
                    title='Edit Address'
                    onSubmitHandler={(e: React.FormEvent) => {
                        e.preventDefault()
                        validateAddressForm(editAddressHandler)
                    }}
                    addressformData={addressformData}
                    closeHandler={EditModelCloseHandler}
                    isLoading={isLoading}
                />
            )}

            <FullScreenLoader loadingState={isLoading} />
        </>
    )
}

export default page