import React from 'react'


interface ButtonProps {
    name: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string;
    loading?: boolean;
}

function Button({ name, onClick, width, loading }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={loading}
            className={`bg-[#7fad39] ${width ? width : 'max-w-fit'}  border-2 border-transparent hover:border-[#7fad39] hover:text-[#7fad39] hover:bg-white duration-200 cursor-pointer text-white py-3 font-medium shadow-2xl  rounded-full px-5`}>
            {!loading ? name : 'Loading . . .'}
        </button>
    )
}

export default Button