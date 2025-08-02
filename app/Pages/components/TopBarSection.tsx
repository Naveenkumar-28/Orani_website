import React, { memo, useState } from 'react'
import { CategoryDropdown } from './CategoryDropdown'
import { SearchInputField } from './SearchInputField'
import { ContactDetails } from './ContactDetails'

export const TopBarSection = memo(() => {
    const [isShow, setIsShow] = useState(false)
    const [categorySelect, setCategorySelect] = useState('all')


    return (
        <main className=" lg:absolute lg:block hidden top-0 left-0 z-50 w-full lg:py-5 lg:pb-5 xl:h-22 h-20">
            <div
                className="mediaQuary hidden lg:flex items-center h-full lg:flex-row w-full gap-5 flex-col mx-auto">
                <div className="lg:w-3/12 w-full h-full sm:px-0 px-5">
                    <CategoryDropdown categorySelect={categorySelect} isShow={isShow} setCategorySelect={setCategorySelect} setIsShow={setIsShow} />
                </div>
                <div className="lg:w-9/12 w-full">
                    <div className="lg:flex h-full md:justify-between w-full sm:px-0 px-5">

                        {/* Search section  */}
                        <SearchInputField categorySelect={categorySelect} />

                        {/* Contact details  */}
                        <ContactDetails />

                    </div>
                </div>
            </div>
            <div className="lg:block hidden absolute w-full -z-10 top-0 left-0  bg-black/30 h-full">
            </div>
        </main>
    )
})
