
import React from 'react'
import { MenuSection } from '@/components'
import { IoCallOutline, IoCompassOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5'
import { ContactSection } from './components'


function Contact() {

    return (
        <section className='mb-50'>
            <MenuSection name={'Contact'} />
            <section
                className="mediaQuary mt-10 text-gray-800 md:mt-15 lg:mt-20 grid flex-wrap gap-15 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mb-20">
                <div className="flex flex-col items-center gap-3">
                    <IoCallOutline className="xl:text-5xl md:text-4xl text-3xl  text-green" />
                    <h1 className="xl:text-xl md:text-lg text-sm font-semibold">Phone</h1>
                    <p className="text-gray-500 md:text-sm text-xs">+01-32566855485</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoCompassOutline className="xl:text-5xl md:text-4xl text-3xl  text-green" />
                    <h1 className="xl:text-xl md:text-lg text-sm font-semibold">Address</h1>
                    <p className="text-gray-500 md:text-sm text-xs">6th,cross street,Puducherry</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoTimeOutline className="xl:text-5xl md:text-4xl text-3xl  text-green" />
                    <h1 className="xl:text-xl md:text-lg text-sm font-semibold">Open Time</h1>
                    <p className="text-gray-500 md:text-sm text-xs">10:00AM to 23:00 pm</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <IoMailOutline className="xl:text-5xl md:text-4xl text-3xl  text-green" />
                    <h1 className="xl:text-xl md:text-lg text-sm font-semibold">Email</h1>
                    <p className="text-gray-500 md:text-sm text-xs">naveenkumar@gamil.com</p>
                </div>
            </section>

            {/* Contact Section  */}
            <ContactSection />

        </section>
    )
}

export default Contact