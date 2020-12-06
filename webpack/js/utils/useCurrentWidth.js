import {useEffect, useState} from "react";

export default function useCurrentWidth(getWidth) {
    let [width, setWidth] = useState(getWidth());

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width;
}