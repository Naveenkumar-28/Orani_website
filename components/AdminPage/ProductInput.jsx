import React from 'react'

function ProductInput({ value, onChange, placeholder, type }) {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-medium'>Discount Price :</label>
            <Input value={value} onChange={onChange} placeholder={placeholder} type={type} />
        </div>
    )
}

export default ProductInput