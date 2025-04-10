// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// function SearchInput() {
//     const ProductList = useSelector((state) => state.ProductList)
//     const [isFocused, setIsFocused] = useState(false)
//     const [search, setSearch] = useState('')
//     const [suggestions, setSuggestions] = useState([])
//     const router = useRouter()


//     useEffect(() => {
//         const filteredList = []
//         ProductList.map((product) => {
//             if (product.name.toLowerCase().includes(search.toLowerCase())) {
//                 return filteredList.push({ name: product?.name.split(new RegExp(`(${search})`, 'gi')), _id: product._id, ImageUrl: product.ImageUrl })
//             }

//         })
//         setSuggestions(filteredList)

//     }, [ProductList, search])



//     return (
//         <div className="flex relative  items-center lg:w-8/12 md:w-8/12 mt-2 lg:mt-0 w-full h-12 ">
//             <input onBlur={() => setTimeout(() => setIsFocused(false), 300)} onFocus={() => setIsFocused(true)} type="text" value={search || ''} onChange={(e) => setSearch(e.target.value)}
//                 className="w-9/12  outline-0 h-full bg-white ps-5 border rounded-ss-sm rounded-es-sm border-gray-300"
//                 placeholder="What do you need?" />
//             <button
//                 className="w-3/12 duration-500 bg-[#7fad39] rounded-se-sm rounded-ee-sm text-white font-bold text-balance uppercase h-full">Search</button>
//             {isFocused && suggestions.length > 0 && <div className='absolute overflow-y-auto max-h-72 bg-white rounded-md w-full top-15'>

//                 <ul>
//                     {suggestions.slice(0, 10).map((product, index) => {
//                         return (
//                             <li onClick={() => router.push(`Pages/singleProduct/${product?._id}`)} key={index} className='flex overflow-hidden w-full text-gray-600  px-3 h-9'>
//                                 <div className='h-full w-10 overflow-hidden'>

//                                     <img className='h-full w-full object-contain' src={product.ImageUrl} alt="productImage" />
//                                 </div>


//                                 <div className='text-sm hover:bg-gray-100 rounded-sm h-full w-full cursor-pointer flex items-center px-2'>
//                                     {search.length > 0 ? (
//                                         <>
//                                             {product?.name.map((name, index) => {
//                                                 return <span key={index}>{name.toLowerCase().includes(search.toLowerCase()) ? <b className='text-green font-medium'>{name}</b> : name}</span>
//                                             })}
//                                         </>
//                                     ) : (

//                                         <p>{product?.name}</p>
//                                     )}
//                                 </div>



//                             </li>)
//                     })}
//                 </ul>
//             </div>}

//         </div>
//     )
// }

// export default SearchInput


import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SearchInput() {
    const ProductList = useSelector((state) => state.ProductList) || []
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!search.trim()) {
            setSuggestions([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            const filteredList = ProductList
                .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => ({
                    name: product.name,
                    nameParts: product.name.split(new RegExp(`(${search})`, 'gi')), // Splitting name
                    _id: product._id,
                    ImageUrl: product.ImageUrl,
                }));
            console.log(filteredList);

            setSuggestions(filteredList);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [ProductList, search]);

    return (
        <div className="flex relative items-center lg:w-8/12 md:w-8/12 mt-2 lg:mt-0 w-full h-12">
            <input
                onBlur={() => setTimeout(() => setIsFocused(false), 300)}
                onFocus={() => setIsFocused(true)}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-9/12 outline-0 h-full bg-white ps-5 border rounded-ss-sm rounded-es-sm border-gray-300"
                placeholder="What do you need?"
            />
            <button className="w-3/12 duration-500 bg-[#7fad39] rounded-se-sm rounded-ee-sm text-white font-bold uppercase h-full">
                Search
            </button>

            {isFocused && suggestions.length > 0 && (
                <div className="absolute overflow-y-auto max-h-72 bg-white rounded-md w-full top-15">
                    <ul>
                        {suggestions.slice(0, 10).map((product, index) => (
                            <li
                                onClick={() => router.push(`Pages/singleProduct/${product._id}`)}
                                key={index}
                                className="flex overflow-hidden w-full text-gray-600 px-3 h-9"
                            >
                                <div className="h-full w-10 overflow-hidden">
                                    <img className="h-full w-full object-contain" src={product.ImageUrl} alt="productImage" />
                                </div>

                                <div className="text-sm hover:bg-gray-100 rounded-sm h-full w-full cursor-pointer flex items-center px-2">
                                    {product.nameParts.map((part, idx) => {

                                        return part.toLowerCase() === search.toLowerCase() ? (
                                            <span key={idx} className="text-green font-medium">{part}</span>
                                        ) : (
                                            <span key={idx}>{part}</span>
                                        )
                                    }
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchInput;
