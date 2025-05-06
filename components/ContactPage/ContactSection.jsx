"use client"
import { useUser } from '@clerk/nextjs'
import { useDispatch, useSelector } from 'react-redux'
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import React, { useState } from 'react'
import axios from 'axios'
import Button from "../../components/Button";
import { setMessageData } from '@/app/redux/slices/ContactSlice'

function contactSection() {
    const [loading, setLoading] = useState(false)
    const { isSignedIn } = useUser()

    const dispatch = useDispatch()
    const contactUs = useSelector((state) => state.ContactUs)

    //Submit Handler
    const submitHandler = async (e) => {
        e.preventDefault()
        if (isSignedIn) {
            if (!contactUs.name || !contactUs.email || !contactUs.subject || !contactUs.message) {
                return dispatch(AddNotifyMessage({ message: 'All fields are required', type: 'error' }))
            }
            try {
                setLoading(true)

                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contactMessageSave`, contactUs)
                    .then((response) => {
                        if (response.data.success) {
                            dispatch(AddNotifyMessage({ message: response.data.message }))
                        }

                    }).finally(() => {
                        setLoading(false)
                    })
            } catch (error) {
                console.log({ "ContactPageErrorMessage": error.message })

                dispatch(AddNotifyMessage({ message: "Please try again later", type: 'error' }))
            }


        } else {
            dispatch(AddNotifyMessage({ message: 'Please login after try again', type: 'error' }))
        }
    }

    return (
        <section
            className="flex flex-col lg:flex-row container lg:gap-10 gap-20 lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-30">
            <iframe className="lg:w-6/12 w-full"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120740.26519494173!2d79.77227480911309!3d11.930066574620193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1741860230129!5m2!1sen!2sin"
                width="600" height="450" style={{ border: 0 }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <form className="lg:w-6/12 w-full flex flex-col gap-5">
                <div className="w-full">
                    <input type="text" placeholder="Your Name" value={contactUs.name} onChange={(e) => dispatch(setMessageData({ type: 'NAME', payload: e.target.value }))}
                        className="text-sm font-light capitalize text-gray-600 outline focus:border-green rounded-sm border-2 outline-none px-5 border-gray-200 w-full h-14" />
                </div>
                <div className="w-full">
                    <input type="text" placeholder="Your Email" value={contactUs.email} onChange={(e) => dispatch(setMessageData({ type: 'EMAIL', payload: e.target.value }))}
                        className="text-sm font-light text-gray-600 outline focus:border-green rounded-sm border-2 outline-none px-5 border-gray-200 w-full h-14" />
                </div>
                <div className="w-full">
                    <input type="text" placeholder="Subject" value={contactUs.subject} onChange={(e) => dispatch(setMessageData({ type: 'SUBJECT', payload: e.target.value }))}
                        className="text-sm font-light text-gray-600 outline focus:border-green rounded-sm border-2 outline-none px-5 border-gray-200 w-full h-14" />
                </div>
                <div className="w-full h-36">
                    <textarea placeholder="Message" value={contactUs.message} onChange={(e) => dispatch(setMessageData({ type: 'MESSAGE', payload: e.target.value }))}
                        className="text-sm font-light h-full py-5 resize-none text-gray-600 outline focus:border-green rounded-sm border-2 outline-none px-5 border-gray-200 w-full"></textarea>
                </div>
                <Button title='Send Message' loading={loading} loadingContent='Processing . . .' onClick={submitHandler} />
            </form>

        </section>
    )
}

export default contactSection