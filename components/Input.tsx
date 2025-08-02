import React from 'react'


interface InputProps {
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Input({ type, onChange }: InputProps) {
    return (
        <input type={type} onChange={onChange} className="border rounded-sm text-sm font-light text-gray-600 focus:border-green outline-none ps-5 border-gray-200 w-full h-14" />
    )
}