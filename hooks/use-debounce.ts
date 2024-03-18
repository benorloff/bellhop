import { useEffect, useState } from "react";

interface DebounceOptions {
    value: string;
    delay: number;
}

export default function useDebounce({ value, delay }: DebounceOptions) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
}