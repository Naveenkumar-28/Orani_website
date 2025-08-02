import React from 'react'

export function CategoryListSkeleton() {
    return (
        <li className="flex justify-between items-center border-b border-gray-300 py-2 animate-pulse">
            <div className="h-4 w-24 bg-gray-300 rounded" /> {/* Simulates category name */}
            <div className="h-4 w-6 bg-gray-300 rounded" />   {/* Simulates count */}
        </li>

    )
}
