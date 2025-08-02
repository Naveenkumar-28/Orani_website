import React from 'react'
import { IoChevronForward, IoMenu } from 'react-icons/io5'

interface Props {
    categorySelect: string;
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    setCategorySelect: (value: string) => void;
}

export function CategoryDropdown({ categorySelect, isShow, setCategorySelect, setIsShow }: Props) {

    const categories = ["all", "oranges", "juice", "vegetables", "fruits"]

    return (
        <div className="h-full">
            <div role="button" onClick={() => setIsShow((pre) => !pre)}
                className="flex items-center justify-between bg-green rounded-sm duration-500 cursor-pointer text-white font-bold text-lg lg:px-2 px-5 h-full">
                <div className="flex items-center gap-2">
                    <IoMenu className=" lg:text-2xl text-xl" />
                    <p className="xl:text-base text-sm font-semibold capitalize">{categorySelect == 'all' ? `${categorySelect} Category` : categorySelect} </p>
                </div>
                <IoChevronForward className={`lg:text-xl text-lg duration-500 ${isShow ? "rotate-90" : "rotate-0"}`} />
            </div>
            <div className={`overflow-hidden transition-[max-height] ease-in-out duration-500 ${isShow ? "max-h-[220px]" : "max-h-0"}`}>
                <ul className="border-b border-r border-l rounded-b-sm bg-white border-gray-300 flex flex-col xl:gap-1">
                    {categories.map((name, index) => {
                        return <li onClick={() => {
                            setCategorySelect(name)
                            setIsShow(false)
                        }} key={index} className={`${categorySelect == name ? "bg-gray-100 hover:text-black font-semibold" : "hover:bg-gray-100  hover:text-black "} px-6 py-2 cursor-pointer  duration-500 capitalize text-sm text-gray-700`}>
                            {name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
