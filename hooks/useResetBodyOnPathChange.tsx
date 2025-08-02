"use client"
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { bodyOverflowHandler } from '../utils/bodyOverFlowHandler';

export function useResetBodyOnPathChange() {
    const pathname = usePathname();
    const previous = useRef(pathname);

    useEffect(() => {
        if (previous.current !== pathname) {
            bodyOverflowHandler(false)
            previous.current = pathname;
        }
    }, [pathname]);
}
