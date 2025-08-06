import React from 'react'

type InputPropsType = {
    name?: string
    element?: string,
    title?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    error?: string,
    type?: React.HTMLInputTypeAttribute,
    readOnly?: boolean,
    defaultValue?: string,
    defaultChecked?: boolean,
    placeholder?: string
}

export function Input({
    name,
    element = 'input',
    title,
    value = '',
    onChange = () => { },
    error = '',
    type = 'text',
    readOnly = false,
    defaultValue = '',
    defaultChecked = false,
    placeholder = ''
}: InputPropsType) {

    return (
        <>
            {element == 'input' ? (
                <div className={`w-full `}>
                    {title && <label className="text-sm font-normal mb-10 capitalize">{title}</label>}
                    <input name={name}  {...(!defaultValue
                        ? { value, onChange }
                        : { defaultValue })} defaultChecked={defaultChecked} readOnly={readOnly} type={type}
                        placeholder={placeholder} className={`${error ? "ring-red-500" : " focus:ring-green"} ${type == 'number' && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"} btn`} />
                </div>
            ) : (
                <div className={`w-full h-36`}>
                    {title && <label className="text-sm font-normal mb-10 capitalize">{title}</label>}
                    <textarea name={name} value={value} onChange={onChange}
                        placeholder={placeholder} className={`${error ? "ring-red-500" : " focus:ring-green"} ${type == 'number' && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"}  h-full pt-5 btn resize-none`} />
                </div>
            )}
        </>
    )
}
