"use client"
import React, { useEffect, useState } from 'react'

type AvatarPropsType = {
    user: {
        name: string,
        imageUrl: string | null,
        email: string,
        role: string
    },
    className?: string
}

export function Avatar({ user, className }: AvatarPropsType) {
    const [firstLetter, setFirstLetter] = useState('')
    useEffect(() => {
        const name = user.name.split('')[0]
        setFirstLetter(name)
    }, [user])
    return (
        <div className={`${className} avater bg-violet-600 `}>{firstLetter}</div>
    )
}
