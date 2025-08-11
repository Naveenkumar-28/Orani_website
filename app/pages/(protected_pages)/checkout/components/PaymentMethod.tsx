import { Button, FullScreenLoader } from '@/components'
import Link from 'next/link'
import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePaymentHandler } from '../hooks'
import { useRouter } from 'next/navigation'
import { createSendMessage } from '@/utils'
import { useUserData } from '@/hooks'
import { RootState } from '@/app/redux/store'

export const PaymentMethod = memo(() => {
    const [selectPaymentMethod, setSelelctPaymentMethod] = useState<string | null>(null)
    const [selectTermsAndCondition, setSelectTermsAndCondition] = useState(false)
    const sendMessage = createSendMessage()
    const router = useRouter()

    const { cartList } = useSelector((state: RootState) => state.CartItems)
    const { addresses } = useSelector((state: RootState) => state.Addresses)

    const { handlePayment, isLoading, isPaymentLoading } = usePaymentHandler()
    const { isSignedIn, user } = useUserData()

    const validateHandler = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const selectedAddress = addresses.find((item) => item.isChecked == true)
        const isStock = cartList.every((product) => product.stock > 0)

        if (!cartList.length) {
            sendMessage.error('Please select products before trying to proceed to the checkout page');
            return router.push("/pages/shop")
        }

        if (!addresses.length) return sendMessage.error("Please add new address")
        if (!selectedAddress) return sendMessage.error("Please choose address")
        if (!selectPaymentMethod) return sendMessage.error("Please select a payment method")
        if (!selectTermsAndCondition) return sendMessage.error("Please accept the terms and conditions")
        if (!isStock) return sendMessage.error("One product out of stock")

        if (isSignedIn && user) {
            handlePayment({ addressId: selectedAddress._id, paymentMethod: selectPaymentMethod })
        }

    }, [selectPaymentMethod, selectTermsAndCondition, addresses, cartList, isSignedIn, user, handlePayment, sendMessage])

    return (
        <>
            <form className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 w-full rounded-sm">
                <h5 className="lg:text-xl text-lg font-normal sm:text-xl">Payment Method</h5>
                <div className="flex gap-5 flex-col px-5">
                    <div className=" flex justify-start items-center gap-2 cursor-pointer">
                        <input className='accent-green-600 size-3.5' onClick={() => setSelelctPaymentMethod('CreditCart')} id="CreditCard" name="select_payment" type="radio" />
                        <label htmlFor="CreditCard" className="text-gray-600  cursor-pointer md:text-base text-sm">Credit Cart Payment</label>
                    </div>
                    <div className=" flex justify-start items-center gap-2 cursor-pointer">
                        <input className='accent-green-600 size-3.5' onClick={() => setSelelctPaymentMethod('debitCart')} id="DebitCard" name="select_payment" type="radio" />
                        <label htmlFor="DebitCard" className="text-gray-600   cursor-pointer md:text-base text-sm">Debit Card
                            Payment</label>
                    </div>
                    <div className=" flex justify-start items-center gap-2 cursor-pointer">
                        <input className='accent-green-600 size-3.5' onClick={() => setSelelctPaymentMethod('UPI')} id="upi" name="select_payment" type="radio" />
                        <label htmlFor="upi" className="text-gray-600  cursor-pointer md:text-base text-sm">UPI</label>
                    </div>

                    <div className="flex justify-start gap-2 cursor-pointer">
                        <div>
                            <input defaultChecked={selectTermsAndCondition} onClick={() => setSelectTermsAndCondition((prev) => !prev)} className="size-3.5 mt-1 accent-green-600" id="termsAndConditions" name="termsAndConditions"
                                type="checkbox" />
                        </div>
                        <label htmlFor="termsAndConditions" className="text-gray-700 text-sm cursor-pointer">
                            I have read and accept the <Link href="#" className="text-green">terms and conditions</Link>
                        </label>
                    </div>
                </div>
                <Button title='Place an Order' className='lg:text-lg text-sm py-3' loading={isLoading} disabled={isLoading} loadingContent='Processing . . .' onClick={validateHandler} />
            </form>
            <FullScreenLoader loadingState={isPaymentLoading} />
        </>
    )
})
