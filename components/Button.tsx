import React from 'react'


interface ButtonProps {
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    disabled?: boolean;
    loadingContent?: string;
    className?: string;
}

export function Button({
    title = "add",
    loadingContent = "Loading...",
    onClick = () => { },
    className = '',
    loading = false,
    disabled = false
}: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled || loading}
            className={`${className} ${disabled ? "cursor-not-allowed bg-gray-500" : "active:scale-95 cursor-pointer  bg-green hover:border-green hover:text-green hover:bg-white active:ring-1 active:ring-green active:bg-green active:text-white"} border-2 border-transparent  duration-200 text-white py-3 font-normal shadow-2xl  rounded-full px-5`}>
            {loading ? loadingContent : title}
        </button>
    )
}