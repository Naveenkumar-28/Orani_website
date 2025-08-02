import { useRef, useCallback } from "react";


export const useThrottleCallback = (callback: (...arg: any[]) => void, delay: number) => {
    const lastCalled = useRef(0);

    return useCallback((...args: any[]) => {
        const now = Date.now();
        if (now - lastCalled.current < delay) return;
        lastCalled.current = now;
        callback(...args);
    }, [callback, delay])
}
