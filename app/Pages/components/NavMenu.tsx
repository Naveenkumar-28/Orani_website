import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMenu() {

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
        return `menu_btn font-normal text-base text-sm xl:text-base uppercase hover:text-green ${pathName === path ? "text-green" : "text-gray-800"}`
    }

    return (
        <ul className="gap-6 xl:gap-10 flex">
            {pages.map((page, index) => {
                return page?.children ? (
                    <li key={index} className="relative group">
                        <Link href={page.href} className={linkClass(page.href)}>{page.name}</Link>
                        <div className="absolute hidden group-hover:block left-[-50%] top-[100%] pt-7">
                            <ul className="w-36 bg-white shadow-2xl py-3 px-5 rounded-sm text-gray-800 text-sm font-light flex flex-col gap-2">
                                {page.children.map(({ name, href }) => (
                                    <li key={name}><Link className="hover:text-green active:scale-95 duration-200" href={href}>{name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </li>) : (
                    <li key={index}><Link className={linkClass(page.href)} href={page.href}>{page.name}</Link></li>
                )
            })}
        </ul>
    );
}
