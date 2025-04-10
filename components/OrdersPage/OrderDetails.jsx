import React, { useCallback, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'


function OrderDetails({ setID, id, OrderDetailsList, bodyOverflowHandler }) {
    const [isActive, setIsActive] = useState(false)
    const [order, setOrder] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setIsActive(true)
        }, 200);
    }, [])

    useEffect(() => {
        const filterOrder = OrderDetailsList.find((order) => order?._id == id)
        if (!filterOrder) return setID('')
        const date = new Date(filterOrder?.createdAt)
        const createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        setOrder({ ...filterOrder, createdAt })
    }, [])

    const statusColor = useCallback((color) => {
        return color == 'pending' ? "bg-amber-400" : color == "confirmed" ? "bg-green-500" : color == "shipping" ? 'bg-green' : color == "delivered" ? "bg-black" : color == "rejected" ? "bg-red-500" : color == "cancelled" ? "bg-red-500" : ''
    }, [])



    return (
        <>
            {order && (
                <section className={`fixed top-0 left-0  w-full h-dvh z-100 flex justify-end`}>
                    <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 pb-[4.3rem] duration-200 ${isActive ? "transform-x-0" : "translate-x-full"}`}>
                        <div className='flex justify-between items-center py-5 shadow-lg px-5'>
                            <h1 className='font-medium text-lg'>Order Details</h1>
                            <button onClick={() => {
                                setIsActive(false)
                                setTimeout(() => {
                                    setID('')
                                    bodyOverflowHandler(false)
                                }, 300);
                            }} className='text-3xl cursor-pointer hover:text-red-500'><IoCloseOutline /></button>
                        </div>
                        <section className='overflow-y-auto h-full pt-5 pb-5 flex flex-col gap-3'>
                            <section className='px-5 flex flex-col gap-6 border-b-2 pb-5 text-sm border-gray-100'>

                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Order ID</h1>
                                    <p>{order?._id}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Order Date</h1>
                                    <p>{order?.createdAt}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Order Price</h1>
                                    <p>₹{order?.totalPrice}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Payment Method</h1>
                                    <p >{order?.paymentMethod}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Payment Status</h1>
                                    {order?.paymentStatus ? (
                                        <p className='text-green'>Paid</p>
                                    ) : (
                                        <>
                                            {order?.orderStatus == "cancelled" ? (
                                                <p className='text-red-500'>Payment failed</p>) : (
                                                <p className='text-red-500'>Payment Not Paid</p>
                                            )}
                                        </>

                                    )}

                                </div>

                                <div className='flex justify-between items-center'>
                                    <h1 className='font-medium'>Order Status</h1>
                                    <p className={`${statusColor(order?.orderStatus?.toLowerCase())} capitalize text-white px-3 py-1 rounded-full `}>{order?.orderStatus}</p>
                                </div>
                            </section>
                            <section className='px-5 mb-2 text-sm '>
                                <h1 className='font-medium text-base py-2'>Order Details</h1>
                                <div className='flex justify-between mb-2'>
                                    <h6 className='underline underline-offset-2 w-4/12 '>Title</h6>
                                    <h6 className='underline underline-offset-2 w-4/12 text-center'>Quantity</h6>
                                    <h6 className='underline underline-offset-2 w-4/12 text-end'>Price </h6>
                                </div>
                                <div className='w-full flex flex-col items-center'>
                                    {order?.products?.map((product, index) => {
                                        const total = (product?.quantity * product?.price)
                                        return <div key={index} className='flex justify-between items-center w-full gap-2'>
                                            <p className='capitalize w-4/12 flex flex-wrap'>{product?.name}</p>
                                            <p className='w-4/12 text-center'>{`${product?.quantity}*${product?.price}`}</p>
                                            <p className='w-4/12 text-end'>₹{isNaN(total) ? 0 : total}</p>
                                        </div>
                                    })}
                                </div>
                            </section>
                            <section className='px-5 text-sm flex flex-col gap-2'>
                                <h1 className='font-medium text-base'>Shipping Info</h1>
                                <div className='text-gray-500 capitalize flex flex-col gap-2'>
                                    <p>{order?.shippingAddress?.firstName + order?.shippingAddress?.lastName}</p>
                                    <p>{order?.shippingAddress?.street}</p>
                                    <p>{order?.shippingAddress?.city}</p>
                                    <p>{order?.shippingAddress?.mobileNumber}</p>
                                    <p>{order?.shippingAddress?.postcode}</p>
                                </div>
                            </section>
                        </section>
                    </div>
                    <div onClick={() => {
                        setIsActive(false)
                        setTimeout(() => {
                            setID('')
                            bodyOverflowHandler(false)
                        }, 300);
                    }} className='bg-neut h-full w-full absolute -z-1 bg-black opacity-50 cursor-pointer'>

                    </div>
                </section>
            )}
        </>

    )
}

export default OrderDetails