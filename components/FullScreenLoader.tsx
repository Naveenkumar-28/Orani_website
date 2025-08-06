"use client"
import { bodyOverflowHandler } from '@/utils'
import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'

export function FullScreenLoader({ loadingState }: { loadingState: boolean }) {
    useEffect(() => {
        bodyOverflowHandler(loadingState)
    }, [loadingState])
    return (
        <>
            {loadingState &&
                <div className='z-[99] bg-black/50 fixed top-0 left-0 w-full h-dvh grid place-items-center'>
                    <div className='size-14 flex justify-center items-center bg-white rounded-full text-gr'>
                        {/* <LoadingIndicator borderWidth='border-4 LoadingIndicator' size='size-10' color='text-green' /> */}
                        <CircularProgress sx={{ color: '#7fad39' }} size={40} />
                    </div>
                </div>
            }
        </>
    )
}
