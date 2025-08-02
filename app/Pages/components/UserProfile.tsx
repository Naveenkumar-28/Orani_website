import React, { memo, useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { TbArrowsExchange } from 'react-icons/tb'
import { IoLogOutOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { FaUser } from 'react-icons/fa'
import { GoSignIn } from 'react-icons/go'
import { VscSignIn } from 'react-icons/vsc'
import { useUserhandler } from '../hooks'
import { LoadingIndicator, Avatar } from '@/components'

export const UserProfile = memo(() => {
    const { user } = useUserData()
    const router = useRouter()

    const { isLoading,
        isImageUploading,
        changeImageHandler,
        handleClickOutside,
        checkProfilePicHandler,
        logoutHandler,
        fileInputRef,
        isShow,
        profileRef,
        setIsShow } = useUserhandler()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={profileRef} className="flex px-2 relative">
            <div role='button' onClick={() => setIsShow((prev) => !prev)}>
                {!user ? (
                    <div className='avater active:scale-95 text-green ring-1 ring-green hover:ring-2 hover:shadow-md'>
                        <FaUser className='text-lg' />
                    </div>
                ) : (
                    !user.imageUrl ? <Avatar user={user} className='' /> : (
                        <div className='avater active:scale-95 overflow-hidden ring-2 ring-gray-200 hover:ring-gray-300 hover:shadow-md'>
                            <img className='rounded-full object-cover h-full w-full' src={user.imageUrl} alt="profile-image" />
                        </div>)
                )}

            </div>

            <div className={`${isShow ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'} px-3 py-3 mr-2 duration-200 ease-in-out absolute rounded-md ring-1 ring-gray-300 min-w-56 bg-white top-15 right-0 flex flex-col gap-5 shadow-lg`}>
                {user ? (
                    <>
                        <div className=' relative flex justify-center items-center gap-5 '>
                            {!user?.imageUrl ? (
                                <Avatar user={user} className='size-11 text-2xl font-medium ring-gray-200' />
                            ) : (
                                <div className='size-11 text-lg font-semibold ring-gray-200 ring-2 avater overflow-hidden '>
                                    <img className='rounded-full object-cover h-full w-full' src={user.imageUrl} alt="profile-image" />
                                </div>
                            )}
                            <div>
                                <h1 className=' capitalize text-gray-600 line-clamp-1'>{user?.name}</h1>
                                <h1 className='text-gray-400 line-clamp-1 font-extralight text-sm'>{user?.email}</h1>
                            </div>
                        </div>
                        <div className='w-full'>
                            <button disabled={isImageUploading} onClick={changeImageHandler} className='userDetailsBtn'>
                                {!isImageUploading ? <TbArrowsExchange className='lg:text-lg text-base' /> : <LoadingIndicator borderWidth='border-2' color='border-gray-400' size='size-4' />}
                                <span className=' text-sm font-normal'>Change profile picture</span>
                            </button>
                            <button disabled={isLoading} onClick={logoutHandler} className='userDetailsBtn'>
                                {!isLoading ? <IoLogOutOutline className='lg:text-lg text-base' /> : <LoadingIndicator borderWidth='border-2' color='border-gray-400' size='size-4' />}
                                <span className=' text-sm font-normal'> Logout</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='w-full'>
                        <button onClick={() => router.push('/auth/login')} className='userDetailsBtn'>
                            <GoSignIn className='lg:text-lg text-base' /><span className=' text-sm font-normal'> SignIn</span>
                        </button>
                        <button onClick={() => router.push('/auth/register')} className='userDetailsBtn'>
                            <VscSignIn className='lg:text-lg text-base' /><span className=' text-sm font-normal'> SignUp</span>
                        </button>
                    </div>
                )}
            </div>
            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={checkProfilePicHandler}
                className="hidden"
            />

        </div>
    )
})
