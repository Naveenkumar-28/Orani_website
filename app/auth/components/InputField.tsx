import React, { useState } from 'react'
import { InputPropsType } from '../login/types'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

export function InputField({ item }: InputPropsType) {
    const [passwordVisiable, setPasswordVisiable] = useState(false)
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-medium capitalize lg:text-base text-sm'>{`${item.labelName} :`}</label>
            <div className={`${item.error ? "border-red-500" : "focus-within:border-green border-gray-200"} flex border-2 lg:h-14 md:h-13 h-12  overflow-hidden items-center  rounded-md`}>
                <input ref={item.ref} placeholder={item.placeHolder} type={item.labelName == 'password' ? passwordVisiable ? 'text' : 'password' : item.type} className={`${item.labelName === 'name' && "capitalize"} text-sm h-full text-gray-600 w-full outline-transparent md:px-5 px-3 md:placeholder:text-sm placeholder:text-xs`} />
                {item.labelName === 'password' && (
                    <button type="button" className="text-xl cursor-pointer text-gray-500 hover:text-gray-600 duration-200 me-5">{!passwordVisiable ? <VscEye onClick={() => setPasswordVisiable(true)} /> : <VscEyeClosed onClick={() => setPasswordVisiable(false)} />}</button>)
                }

            </div>
        </div>
    )
}
