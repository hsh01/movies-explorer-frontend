import { useCallback, useEffect, useState } from 'react';

export type LimitCountType = {
    more: number;
    available: number;
    current?: number;
    limit: number;
};

export function useWidthDependsLimiter(defaultValues?: LimitCountType) {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [moviesCount, setMoviesCount] = useState<LimitCountType>(defaultValues ?? {
        more: 3,
        available: 0,
        limit: 12,
    });

    function setCountValues() {
        if (windowWidth >= 1080) {
            setMoviesCount({
                ...moviesCount,
                more: 3,
                limit: Math.max(12, moviesCount.current ?? 0, moviesCount.available)
            });
        } else if (windowWidth >= 480) {
            setMoviesCount({
                ...moviesCount,
                more: 2,
                limit: Math.max(8, moviesCount.current ?? 0, moviesCount.available)
            });
        } else if (windowWidth >= 320) {
            setMoviesCount({
                ...moviesCount,
                more: 2,
                limit: Math.max(5, moviesCount.current ?? 0, moviesCount.available)
            });
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
        setCountValues();
        return () => {
            window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
        }
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setCountValues();
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [windowWidth]);

    return {moviesCount, setMoviesCount};
}