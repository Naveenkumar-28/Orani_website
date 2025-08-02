import { useDebounceEffect } from '@/hooks';
import React, { memo, SetStateAction, useCallback, useState } from 'react';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import { SuggestionCard } from './SuggestionCard';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '@/app/redux';

export const SmallDeviceSearchInputField = memo(({ setIsOpen }: { setIsOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { loading, suggestions } = useSelector((state: RootState) => state.suggestion)

    const getProductSuggestion = useCallback(() => {
        dispatch(fetchSuggestions({ limit, search }))
    }, [limit, search])

    useDebounceEffect(() => {
        if (search) {
            getProductSuggestion()
        }
    }, [search], 500)

    const closerHandler = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onClickHandler = useCallback((id: string) => {
        router.push(`/pages/shop/${id}`)
        closerHandler()
    }, [closerHandler])


    return (
        <div className="flex relative items-center w-full flex-col mediaQuary">
            {/* Search input field */}
            <div className=' w-full bg-white border-gray-300 flex items-center justify-between h-14 border-b-2'>
                <div className='flex items-center gap-2'>
                    <div className='px-2' onClick={closerHandler}>
                        <IoArrowBack className='text-2xl text-green cursor-pointer' />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e?.target?.value?.toLowerCase())}
                        className="w-full h-full outline-none placeholder:text-sm text-gray-800"
                        placeholder="What do you need ?"
                    />

                </div>
                {search && (
                    <button onClick={() => setSearch('')} className='px-2 text-2xl cursor-pointer hover:text-green text-gray-400'>
                        <IoClose />
                    </button>
                )}
            </div>

            {/* Conditional rendering of suggestions */}
            {search && (
                <div className=" bg-white w-full mt-2">
                    <ul>
                        {loading ? <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>Loading...</li> :
                            suggestions.length > 0 && !loading ? (
                                suggestions.map((product, index) => (
                                    <SuggestionCard key={index} product={product} search={search} onClickHandler={onClickHandler} />
                                ))) : (
                                <li className='w-full text-gray-600 px-3 h-9 flex justify-center items-center text-sm'>No suggestion found</li>
                            )
                        }

                    </ul>
                </div>
            )}
        </div>
    );
})