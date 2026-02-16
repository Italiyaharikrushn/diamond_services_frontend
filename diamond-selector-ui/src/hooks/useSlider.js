import { useState, useEffect, useRef } from "react";

export const useSlider = (dependencies = []) => {
    const scrollRef = useRef(null);
    const [showButtons, setShowButtons] = useState(false);

    const checkScrollable = () => {
        if (scrollRef.current) {
            const el = scrollRef.current;
            setShowButtons(el.scrollWidth > el.clientWidth);
        }
    };

    useEffect(() => {
        const timer = setTimeout(checkScrollable, 100);

        window.addEventListener("resize", checkScrollable);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkScrollable);
        };
    }, dependencies);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = direction === "left" ? -200 : 200;
            scrollRef.current.scrollBy({
                left: amount,
                behavior: "smooth",
            });
        }
    };

    return { scrollRef, showButtons, scroll, checkScrollable };
};
