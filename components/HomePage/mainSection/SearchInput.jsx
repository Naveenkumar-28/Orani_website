import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

function SearchInput({ categorySelect }) {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [limit, setLimit] = useState(8)
    const router = useRouter();
    const searchHistoryRef = useRef({})
    const [loading, setLoading] = useState(false)

    const getProductSuggestion = useCallback(async () => {
        if (search) {
            const cacheKey = `suggestion_${search}_${categorySelect}`
            if (searchHistoryRef.current[cacheKey]) {
                return setSuggestions(searchHistoryRef.current[cacheKey])
            }
            setLoading(true)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/suggestion?limit=${limit}&search=${search}&category=${categorySelect != 'all' && categorySelect != '' ? categorySelect : ''}`)
                if (response.data.success) {
                    const { suggestionProducts } = response.data
                    console.log({ suggestionProducts });
                    searchHistoryRef.current[cacheKey] = suggestionProducts;
                    console.log(searchHistoryRef.current);
                    setSuggestions(suggestionProducts);
                }

            } catch (error) {
                console.log(error?.message);
            } finally {
                setLoading(false)
            }
        }
    }, [limit, search, categorySelect])

    useEffect(() => {
        if (search) {
            setSearch('')
        }
    }, [categorySelect])


    useDebounceEffect(() => {
        getProductSuggestion()
    }, [search], 500)

    return (
        <div className="flex relative items-center lg:w-8/12 md:w-8/12 mt-2 lg:mt-0 w-full h-12">
            <div className='md:w-9/12 w-full outline-0 h-full bg-white ps-5 border rounded-ss-sm rounded-es-sm border-gray-300 flex items-center justify-between'>
                <input
                    onBlur={() => setTimeout(() => setIsFocused(false), 300)}
                    onFocus={() => setIsFocused(true)}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e?.target?.value?.toLowerCase())}
                    className="w-full h-full outline-none"
                    placeholder="What do you need?"
                />
                {search && (
                    <button onClick={() => setSearch('')} className='px-2 text-2xl cursor-pointer hover:text-green text-gray-400'>
                        <IoCloseOutline />
                    </button>
                )}
            </div>
            <button className="w-3/12 lg:block hidden duration-500 bg-[#7fad39] rounded-se-sm rounded-ee-sm text-white font-bold uppercase h-full">
                Search
            </button>
            <div className='lg:hidden text-2xl px-4 bg-green h-full flex justify-center items-center text-white rounded-br-sm rounded-tr-sm'>
                <GoSearch />
            </div>

            {isFocused && search && (
                <div className="absolute overflow-y-auto max-h-72 bg-white rounded-md top-13 shadow-md z-10 md:w-9/12 w-full">
                    <ul>
                        {loading ? <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>Loading...</li> :
                            suggestions.length > 0 && !loading ? (suggestions.map((product, index) => {

                                return <li
                                    onClick={() => router.push(`Pages/singleProduct/${product._id}`)}
                                    key={index}
                                    className="flex overflow-hidden w-full text-gray-600 px-3 h-9"
                                >
                                    <div className="h-full w-10 overflow-hidden">
                                        <img className="h-full w-full object-contain" src={product?.ImageUrl} alt="productImage" />
                                    </div>
                                    <div className="text-sm hover:bg-gray-100 rounded-sm h-full w-full cursor-pointer flex items-center ps-2 ">
                                        {product?.splittedName?.map((splittedName, index) => {

                                            return splittedName.toLowerCase() === search.toLowerCase() ? (
                                                <span key={index} className="text-green font-semibold">{splittedName}</span>
                                            ) : (
                                                <span key={index}>{splittedName}</span>
                                            )
                                        }
                                        )}
                                    </div>

                                </li>
                            })) : (
                                <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>No suggestion found</li>
                            )}

                    </ul>
                </div>
            )}
        </div>
    );
}

export default memo(SearchInput);
