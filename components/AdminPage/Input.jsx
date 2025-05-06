import React from 'react'

function Input({ type, onChange, placeholder, value, labelName }) {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-medium'>{labelName}</label>
            <input value={value || ''} placeholder={placeholder} type={type} onChange={onChange} className="border-2 capitalize rounded-sm text-sm text-gray-600 outline focus:border-green outline-transparent px-5 border-gray-200 w-full h-14" />
        </div>
    )
}

export default Input
