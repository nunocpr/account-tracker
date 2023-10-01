import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

type Callback = () => void;
type DebouncedCallback = () => void;

export const useDebounce = (callback: Callback): DebouncedCallback => {
    const ref = useRef<Callback | null>(null);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback: DebouncedCallback = useMemo(() => {
        const func: Callback = () => {
            ref.current?.();
        };

        return debounce(func, 1000);
    }, []);

    return debouncedCallback;
};

export const useAsyncDebounce = (callback: Function, delay: number) => {
    const ref = useRef<Function>();
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = async () => {
            await ref.current?.();
        }

        return debounce(func, delay);
    }, [delay]);

    return debouncedCallback;
}