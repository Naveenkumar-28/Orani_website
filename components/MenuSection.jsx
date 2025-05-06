import React from 'react'

function menuSection({ name }) {
    return (
        <div className="h-[200px] relative mb-20 select-none">
            <img className="h-full w-full object-cover" src="/banner/bg_1.jpg" alt="img" />
            <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.04)] flex justify-center items-center">
                <h1 className="font-extrabold text-white text-3xl uppercase">My {name}</h1>
            </div>
        </div>
    )
}

export default menuSection