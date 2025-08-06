"use client"
import React, { useEffect } from 'react'
import { FullScreenLoader, MenuSection } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { WishCardSkeleton, WishListCard } from './components'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchWishList } from './redux'
import { useUserData } from '@/hooks'


function page() {
    const dispatch = useDispatch<AppDispatch>()
    const { wishList, isLoading: isWishLoading, isSkeletonLoading } = useSelector((state: RootState) => state.WishItems) || []
    const { user, isSignedIn, isLoading } = useUserData()

    useEffect(() => {
        if (!user && !isSignedIn && !isLoading) {
            dispatch(fetchWishList())
        }
    }, [user, isSignedIn, isLoading])

    return (
        <section className="mb-30">
            <MenuSection name={'WishList'} />
            <div className='mediaQuary'>
                {!isSkeletonLoading ? (
                    <>
                        {wishList.length > 0 ? (wishList.map((product, index) => {
                            return (
                                <WishListCard key={index} product={product} />
                            )
                        })) : (
                            <div className='h-40 flex justify-center items-center'>
                                <p className='text-gray-400 lg:text-lg text-md'>Your WishList is Empty</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {Array.from({ length: 5 }).map((_, index) => (<WishCardSkeleton key={index} />))}
                    </>
                )}
            </div>
            <FullScreenLoader loadingState={isWishLoading} />
        </section>
    )
}

export default page