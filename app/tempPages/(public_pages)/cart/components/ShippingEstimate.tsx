import { Button, Input } from '@/components'
import React from 'react'

export function ShippingEstimate() {
    return (
        <div className="flex flex-col flex-1/2 xl:flex-1/3">
            <div className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col xl:gap-4 gap-3 mb-5 rounded-sm">
                <div className='flex flex-col gap-1.5'>
                    <h2 className="lg:text-xl text-lg font-normal ">Estimate shipping and tax</h2>
                    <p className="text-gray-400 text-xs xl:text-sm">Enter your destination to get a shipping estimate</p>
                </div>
                <div className="mb-2">
                    <h6 className="lg:text-sm text-xs font-medium mb-2">Country</h6>
                    <Input type={"text"} />
                </div>
                <div className="mb-2">
                    <h6 className="lg:text-sm text-xs font-medium mb-2">State/Province</h6>
                    <Input type={"text"} />

                </div>
                <div className="mb-2">
                    <h6 className="lg:text-sm text-xs font-medium mb-2">Zip/Postal Code</h6>
                    <Input type={"text"} />

                </div>
            </div>
            <Button title={"Estimate"} className='xl:text-lg text-sm w-max py-3' />
        </div>
    )
}

