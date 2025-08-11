import { useDebounceEffect } from '@/hooks';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { SuggestionCard } from './SuggestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '@/app/redux';
import { AppDispatch, RootState } from '@/app/redux/store';

export const SearchInputField = memo(({ categorySelect }: { categorySelect: string }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8)
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { loading, suggestions } = useSelector((state: RootState) => state.suggestion)

    const getProductSuggestion = useCallback(() => {
        dispatch(fetchSuggestions({ category: categorySelect, limit, search }))
    }, [categorySelect, limit, search])

    useDebounceEffect(() => {
        if (search) {
            getProductSuggestion()
        }
    }, [search], 500)

    const onClickHandler = useCallback((id: string) => {
        router.push(`pages/shop/${id}`)
    }, [])

    return (
        <div className="flex relative items-center lg:w-8/12 md:w-8/12 w-full max-h-12 xl:h-12">
            {/* Search input field */}
            <div className='md:w-9/12 h-full w-full outline-0 bg-white xl:ps-5 ps-3 border rounded-ss-sm rounded-es-sm border-gray-300 flex items-center justify-between'>
                <input
                    onBlur={() => setTimeout(() => setIsFocused(false), 300)}
                    onFocus={() => setIsFocused(true)}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e?.target?.value?.toLowerCase())}
                    className="w-full h-full outline-none placeholder:text-sm text-gray-800"
                    placeholder="What do you need ?"
                />
                {search && (
                    <button onClick={() => setSearch('')} className='px-2 text-2xl cursor-pointer hover:text-green text-gray-400'>
                        <IoCloseOutline />
                    </button>
                )}
            </div>
            <button className="w-3/12 lg:block hidden duration-500 bg-green rounded-se-sm rounded-ee-sm text-white xl:font-bold font-semibold uppercase h-full text-sm">
                Search
            </button>

            {/* Conditional rendering of suggestions */}
            {isFocused && search && (
                <div className="absolute overflow-y-auto max-h-72 bg-white rounded-md xl:top-13 top-11 shadow-md z-10 md:w-9/12 w-full">
                    <ul>
                        {loading ? <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>Loading...</li> :
                            suggestions.length > 0 && !loading ? (
                                suggestions.map((product, index) => (
                                    <SuggestionCard key={index} product={product} search={search} onClickHandler={onClickHandler} />
                                ))) : (
                                <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>No found</li>
                            )
                        }
                    </ul>
                </div>
            )}
        </div>
    );
})
