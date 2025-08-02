import { Dropdown } from '@/components/Dropdown'
import React from 'react'

type InputPropsType = {
    name?: string
    element?: string,
    title?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    error?: { success: boolean, error: boolean },
    type?: React.HTMLInputTypeAttribute,
    readOnly?: boolean,
    defaultValue?: string,
    defaultChecked?: boolean,
    placeholder?: string,
    options?: string[];
    onClick?: (value: string) => void,
    onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void
}

export function InputField({
    name,
    element = 'input',
    title,
    value = '',
    onChange = () => { },
    error = { success: false, error: false },
    type = 'text',
    readOnly = false,
    defaultValue = '',
    defaultChecked = false,
    placeholder = '',
    options = [],
    onClick = () => { },
    onWheel = () => { }
}: InputPropsType) {

    return (
        <>
            {element == 'input' ? (
                <div className={`w-full flex flex-col gap-2  mb-2`}>
                    {title && <label className="text-sm md:text-base font-normal capitalize">{title}</label>}
                    <input onWheel={onWheel} name={name}  {...(!defaultValue
                        ? { value, onChange }
                        : { defaultValue })} defaultChecked={defaultChecked} readOnly={readOnly} type={type}
                        placeholder={placeholder} className={`${error.error ? "ring-red-500" : error.success && value ? 'ring-green' : " focus:ring-green"} ${type == 'number' && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"} input`} />
                </div>
            ) : element == 'textarea' ? (
                <div className={`w-full min-h-46 flex flex-col gap-2 mb-2`}>
                    {title && <label className="text-sm md:text-base font-normal capitalize">{title}</label>}
                    <textarea name={name} value={value} onChange={onChange}
                        placeholder={placeholder} className={`${error.error ? "ring-red-500" : error.success && value ? 'ring-green' : " focus:ring-green"} ${type == 'number' && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"}  h-full pt-5 input resize-none`} />
                </div>
            ) : element == 'select' ? (

                <div className={`w-full flex flex-col gap-2 mb-2`}>
                    {title && <label className="text-sm md:text-base font-normal capitalize">{title}</label>}
                    <Dropdown dropdownHeight=' md:h-14 h-12' dropdownOuterDiv={`${error.error ? "ring-red-500" : error.success && value ? 'ring-green' : " focus:ring-green"} ring-1 ring-gray-200`} dropdownOuterWidth='py-1' className='text-gray-500 text-sm' onClick={onClick} renderItems={options} status={value} />
                </div>
            ) : null}
        </>
    )
}