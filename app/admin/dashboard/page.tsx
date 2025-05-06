"use client"
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { LuCloudUpload } from 'react-icons/lu'
import { useDispatch } from 'react-redux'

function Dashboard() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const clickHandler = async () => {
        if (!file) return dispatch(AddNotifyMessage({ message: 'Please select Image after try again', type: 'warning' }))
        const form = new FormData()
        form.append('file', file)
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/imageUpload`, form)
            if (response.data.success) {
                console.log(response.data);
                dispatch(AddNotifyMessage({ message: "Upload Successfully" }))
            }

        } catch (error) {
            console.log((error as Error).message);
            dispatch(AddNotifyMessage({ message: 'Upload failed', type: 'error' }))

        } finally {
            setLoading(false)
            setFile(null)
        }
    }

    const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0]
        const maxSize = 1 * 1024 * 1024
        if (!file) return
        if (!(file?.size < maxSize)) {
            return dispatch(AddNotifyMessage({ message: "Image size exceeds the 1MB limit", type: 'error' }))
        }
        setFile(file)
    }

    return (
        <div className=' px-5 p-6 rounded-sm'>
            <div className='border-b-2 border-gray-300 flex justify-between pb-2'>
                <h1 className='font-medium pb-2 text-xl'>Upload Image</h1>
                {file && <div className='flex items-center gap-1'>
                    <p>{file.name}</p>
                    <IoCloseOutline className='text-2xl hover:text-red-600 cursor-pointer' onClick={() => setFile(null)} />
                </div>}

            </div>
            <div className='py-5  overflow-hidden'>
                {file ? (<div className='rounded-sm overflow-hidden h-80'>
                    <img src={URL.createObjectURL(file)} className='h-full w-full object-contain' alt="Upload_Image" />
                </div>) : (
                    <label htmlFor="imageUpload" className='cursor-pointer'>
                        <div className='flex flex-col justify-center items-center h-80 gap-2'>
                            <LuCloudUpload className='text-xl' />
                            <p>Drag & drop or click to upload Image</p>
                        </div>
                        <input onChange={fileHandler} type="file" accept='image/png ,image/jpeg,image/jpg' id='imageUpload' className='hidden' />
                    </label>
                )}
            </div>
            <button disabled={loading} onClick={clickHandler} className='bg-green text-white w-full py-3 rounded-sm cursor-pointer shadow-md'>{loading ? "Upload..." : "Upload"}</button>
        </div>
    )
}

export default Dashboard