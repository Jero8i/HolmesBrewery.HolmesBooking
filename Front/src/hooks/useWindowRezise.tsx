import { useEffect, useState } from "react";

export function useWindowRezise() {

    const [isMedium, setIsMedium] = useState<boolean>(false);
    const [isSmall, setIsSmall] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMedium(window.matchMedia('(max-width: 900px)').matches);
            setIsSmall(window.matchMedia('(max-width: 600px)').matches);
            setIsMobile(window.matchMedia('(max-width: 414px)').matches);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {isMedium, isSmall, isMobile};
}
