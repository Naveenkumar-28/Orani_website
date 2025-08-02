import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'

export function NavAccordion({ closeTopDrawerHandler }: { closeTopDrawerHandler: () => void }) {
    const [pagesVisible, setPagesVisible] = useState<boolean>(false)
    const pathName = usePathname();

    const pages = [
        { name: "Home", href: "/pages" },
        { name: "Shop", href: "/pages/shop" },
        {
            name: "Pages", href: "#", children: [
                { name: "Wishlist", href: "/pages/wishlist" },
                { name: "Orders", href: "/pages/orders" },
                { name: "Cart", href: "/pages/cart" },
                { name: "Checkout", href: "/pages/checkout" },
            ]
        },
        { name: "blog", href: "/pages/blog" },
        { name: "Contact", href: "/pages/contact" }
    ]

    const linkClass = (path: string) => {
        return `py-3 w-fit rounded-sm flex justify-start items-center  font-light text-sm uppercase hover:text-green duration-200 ${pathName == path ? "text-green" : 'text-gray-600'}`
    }
    return (
        <ul className=" flex flex-col w-full">
            {pages.map((page, index) => {
                return page?.children ? (
                    <li key={index} className=" rounded-sm flex flex-col justify-start">
                        <div onClick={() => setPagesVisible((prev) => !prev)} className='py-3 flex gap-2 cursor-pointer text-gray-600 hover:text-green duration-200'>
                            <h1 className=' font-light text-sm uppercase'>{page.name}</h1>
                            <FaCaretDown />
                        </div>
                        {pagesVisible && (
                            <ul
                                className="w-full text-gray-700 bg-gray-50 border border-gray-200 px-5 py-3 font-light flex-col flex-nowrap rounded-sm text-sm">
                                {page.children.map((page, index) => (
                                    <li key={index} onClick={closeTopDrawerHandler} className='py-1 w-full hover:text-green'>
                                        <Link href={page.href}>{page.name}</Link>
                                    </li>
                                ))}

                            </ul>
                        )}
                    </li>) : (
                    <li key={index} onClick={closeTopDrawerHandler}
                        className={linkClass(page.href)}>
                        <Link href={page.href}>{page.name}</Link>
                    </li>
                )
            })}

        </ul>
    )
}
