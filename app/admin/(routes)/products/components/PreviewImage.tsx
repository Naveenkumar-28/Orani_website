import React, { useEffect, useState } from 'react'

export function PreviewImage({ file }: { file: File }) {
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {

        // Create a temporary blob URL
        const url = URL.createObjectURL(file);
        setPreviewURL(url);

        // Cleanup when unmounting
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return (
        <>
            {previewURL && (
                <div className='rounded-sm overflow-hidden h-52 sm:h-62 ring-1 ring-green'>
                    <img src={previewURL} className='h-full w-full object-contain' alt="Upload_Image" />
                </div>
            )}
        </>
    )
}
