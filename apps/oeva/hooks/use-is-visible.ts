import type {MutableRefObject} from "react";
import { useEffect, useState} from "react";

export function useIsVisible(ref: MutableRefObject<HTMLElement | null>): boolean {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            });

            observer.observe(ref.current);
            return () => {
                observer.disconnect();
            };
        }
    }, [ref]);

    return isIntersecting;
}