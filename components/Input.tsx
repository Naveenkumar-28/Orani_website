import React from 'react'


interface InputProps {
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ type, onChange }: InputProps) {
    return (
        <input type={type} onChange={onChange} className="border text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent ps-5 border-gray-200 w-full h-14" />
    )
}

export default Input