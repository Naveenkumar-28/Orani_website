import React from 'react'
import { BaseField } from '../types'

// type InputPropsType = {
//     title: string,
//     value?: string,
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
//     error?: string,
//     type?: React.HTMLInputTypeAttribute,
//     readOnly?: boolean,
//     defaultValue?: string,
//     defaultChecked?: boolean,
//     placeholder?: string

// }

export function Input({
    title = 'name',
    value = '',
    onChange = () => { },
    error = '',
    type = 'text',
    readOnly = false,
    defaultValue = '',
    defaultChecked = false,
    placeholder = ''
}: BaseField) {

    return (
        <div className="w-full">
            {title && <label className="text-sm font-normal mb-10 capitalize">{title}</label>}
            <input  {...(!defaultValue
                ? { value, onChange }
                : { defaultValue })} defaultChecked={defaultChecked} readOnly={readOnly} type={type}
                placeholder={placeholder} className={`${error ? "ring-red-500" : " focus:ring-green"} ${type == 'number' && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"} btn`} />
        </div>
    )
}
