"use client"
import { SmallDeviceMenu } from './SmallDeviceMenu'
import { LogoSection } from './LogoSection'
import { NavMenu } from './NavMenu'
import { HeaderActions } from './HeaderActions'


export function Header() {

    return (
        <>
            <header className="hidden lg:block select-none sticky top-0 z-[99] shadow-lg bg-white">
                {/* Menu Section  */}
                <div
                    className="lg:h-[4.5rem] flex lg:flex-row flex-row items-center lg:py-0 py-5 gap-5 h-16 mediaQuary">
                    <LogoSection />
                    <div className="flex justify-between lg:w-9/12 w-full items-center">
                        <NavMenu />
                        <HeaderActions />
                    </div>
                </div>
            </header>
            {/* Small device menu  */}
            <SmallDeviceMenu />
        </>
    )
}