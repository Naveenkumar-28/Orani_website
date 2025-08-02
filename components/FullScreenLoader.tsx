"use client"
import { LoadingIndicator } from '@/components'
import { bodyOverflowHandler } from '@/utils'
import React, { useEffect } from 'react'

export function FullScreenLoader({ loadingState }: { loadingState: boolean }) {
    useEffect(() => {
        bodyOverflowHandler(loadingState)
    }, [loadingState])
    return (
        <>
            {loadingState &&
                <div className='z-[99] bg-black/40 fixed top-0 left-0 w-full h-dvh grid place-items-center'>
                    <div className='p-3 rounded-full'>
                        <LoadingIndicator borderWidth='border-4' size='size-10' color='text-white' />
                    </div>
                </div>
            }
        </>
    )
}
