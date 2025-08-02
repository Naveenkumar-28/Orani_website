import { Button } from '@/components'
import React from 'react'
import { SiMinutemailer } from 'react-icons/si'
import { useEmailVerificationhandler } from '../hooks'


export function EmailVerification({ email }: { email: string }) {

    const {
        emailVerifyHandler,
        isLoading,
        resendVerificationCode,
        timer,
        isError,
        verifyCodeRef,
        resendLoading,
        timerStart
    } = useEmailVerificationhandler({ email })

    return (
        <div className="2xl:w-4/12 max-w-xl xl:w-5/12 mx-auto lg:p-6 p-4 bg-white rounded-xl shadow-md w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col gap-3 ring-1 ring-gray-100">
            <i className="flex justify-center items-center xl:text-5xl md:text-4xl sm:text-3xl text-3xl text-green">
                <SiMinutemailer />
            </i>
            <h1 className="lg:text-2xl sm:text-xl text-lg font-semibold text-center text-green uppercase line-clamp-1">Verify email</h1>
            <h5 className="font-light lg:text-sm text-xs text-gray-400 text-center">Verification code send to your email : <span className='text-xs'>{email}</span></h5>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
                <label className='font-medium'>Verification Code <span className="text-red-500">*</span></label>
                <input ref={verifyCodeRef} type="number" className={`${isError ? "border-red-500" : "focus:border-green border-gray-300 "} text-sm text-gray-600 px-3 w-full border-2 rounded-sm  outline-none h-11 sm:h-12 md:placeholder:text-sm placeholder:text-xs`} placeholder="Enter code" />
            </div>
            <div className="flex justify-end gap-2 text-gray-700 text-xs sm:text-sm px-2">
                {timerStart ? <p ><span className='w-10'>{timer}</span>s</p> : null}
                <button disabled={resendLoading || timerStart} onClick={resendVerificationCode} className={`hover:text-green duration-200 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer ${!resendLoading && "hover:underline hover:underline-offset-2"} `}>Resend</button>
                {resendLoading && <div className='sm:size-4 size-3 border-2 border-t-transparent animate-spin rounded-full'></div>}
            </div>
            <Button className='text-sm md:text-base' title="Verify" onClick={emailVerifyHandler} loadingContent='Verifing . . .' loading={isLoading} disabled={isLoading || resendLoading} />
        </div>
    )
}