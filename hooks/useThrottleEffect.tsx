import { useEffect, useRef } from "react";

export function useThrottleEffect(effect: () => void, deps: any[], delay: number) {
    const lastRef = useRef(0);

    useEffect(() => {
        const now = Date.now();
        if (now - lastRef.current < delay) return;
        lastRef.current = now;
        effect();
    }, [...deps, delay]);
}
