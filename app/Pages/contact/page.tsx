
import React from 'react'
import MenuSection from '@/components/MenuSection'
import { IoCallOutline, IoCompassOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5'
import ContactSection from "@/components/ContactPage/ContactSection";


function Contact() {

    return (
        <section className='mb-50'>
            <MenuSection name={'Contact'} />
            <section
                className="grid flex-wrap gap-15 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-20">
                <div className="flex flex-col items-center gap-3">
                    <IoCallOutline className="text-5xl text-green" />
                    <h1 className="text-xl font-semibold">Phone</h1>
                    <p className="text-gray-500">+01-32566855485</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoCompassOutline className="text-5xl text-green" />

                    <h1 className="text-xl font-semibold">Address</h1>
                    <p className="text-gray-500">6th,cross street,Puducherry</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoTimeOutline className="text-5xl text-green" />

                    <h1 className="text-xl font-semibold">Open Time</h1>
                    <p className="text-gray-500">10:00AM to 23:00 pm</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoMailOutline className="text-5xl text-green" />

                    <h1 className="text-xl font-semibold">Email</h1>
                    <p className="text-gray-500">naveenkumar@gamil.com</p>
                </div>
            </section>

            {/* Contact Section  */}
            <ContactSection />

        </section>
    )
}

export default Contact