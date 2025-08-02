import { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

type CustomSelectType = {
    onChange: (value: number) => void,
    options: { data: string, value: number }[],
    width: string
}

export function CustomSelect({ onChange, options, width = 'w-full' }: CustomSelectType) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Please choose')

    useEffect(() => {
        setValue(options[0].data)
    }, [])

    return (
        <div className={`relative ${width}`}>
            <button
                type="button"
                className={`${open ? 'ring-green' : 'ring-gray-300'} w-full sm:px-4 sm:py-3 py-2 px-3 bg-white ring rounded-lg flex justify-between items-center shadow-sm`}
                onClick={() => setOpen(!open)}
            >
                {value}
                <i className={`${open ? 'rotate-180' : 'rotate-360'} duration-200`}>
                    <BiChevronDown size={20} />
                </i>
            </button>

            {open && (
                <ul className="absolute z-10 w-full mt-2 bg-white ring ring-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setValue(option.data)
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className={`px-4 py-2 capitalize hover:bg-gray-100 cursor-pointer ${value === option.data ? 'bg-gray-100 font-semibold' : ''
                                }`}
                        >
                            {option.data}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
