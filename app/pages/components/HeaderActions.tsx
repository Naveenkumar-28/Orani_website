import React from 'react'
import { IoMdHeart } from 'react-icons/io'
import { PiShoppingCartFill } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { UserProfile } from './UserProfile'

export function HeaderActions({ closeTopDrawerHandler = () => { }, mobileMode = false }: { closeTopDrawerHandler?: () => void, mobileMode?: boolean }) {
    const router = useRouter()

    const { localStorageCartList } = useSelector((state: RootState) => state.CartItems)
    const { localStorageWishList } = useSelector((state: RootState) => state.WishItems)

    return (
        <div className={`xl:gap-10 gap-5 h-full w-full items-center justify-end flex `}>
            <div className='flex justify-center items-center gap-5'>
                <div className="relative h-full active:scale-95"
                    onClick={() => {
                        router.push('/pages/wishlist')
                        mobileMode && closeTopDrawerHandler()
                    }}>
                    <div className='bg-green size-9 active:scale-95 duration-200 rounded-full  text-white flex justify-center items-center'>
                        <IoMdHeart className="text-xl cursor-pointer" />
                    </div>
                    {localStorageWishList?.length > 0 && (
                        <div className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full text-white h-4 w-4 text-[0.70em] flex justify-center items-center">
                            {localStorageWishList?.length}
                        </div>
                    )}
                </div>
                <div className="relative "
                    onClick={() => {
                        router.push('/pages/cart')
                        mobileMode && closeTopDrawerHandler()
                    }}>
                    <div className='bg-green size-9 active:scale-95 duration-200 rounded-full text-white flex justify-center items-center'>
                        <PiShoppingCartFill className="text-xl cursor-pointer" />
                    </div>
                    {localStorageCartList?.length > 0 && (
                        <div className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full text-white h-4 w-4 text-[0.70em] flex justify-center items-center">
                            {localStorageCartList?.length}
                        </div>
                    )}
                </div>
            </div>
            <UserProfile />
        </div>
    )
}