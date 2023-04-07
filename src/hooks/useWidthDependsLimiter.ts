import { useEffect, useState } from 'react';
import { MoviesCountLimitEnum, MoviesCountMoreEnum, WindowWidthEnum } from "../utils/constants";

export type LimitCountType = {
    more: number;
    available: number;
    current?: number;
    limit: number;
};

export function useWidthDependsLimiter(defaultValues?: LimitCountType) {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [moviesCount, setMoviesCount] = useState<LimitCountType>(defaultValues ?? {
        more: MoviesCountMoreEnum.DEFAULT,
        available: 0,
        limit: MoviesCountLimitEnum.DEFAULT,
    });

    function setCountValues() {
        if (windowWidth >= WindowWidthEnum.DEFAULT) {
            setMoviesCount({
                ...moviesCount,
                more: MoviesCountMoreEnum.DEFAULT,
                limit: Math.max(MoviesCountLimitEnum.DEFAULT, moviesCount.current ?? 0, moviesCount.available)
            });
        } else if (windowWidth >= WindowWidthEnum.TABLET) {
            setMoviesCount({
                ...moviesCount,
                more: MoviesCountMoreEnum.TABLET,
                limit: Math.max(MoviesCountLimitEnum.TABLET, moviesCount.current ?? 0, moviesCount.available)
            });
        } else if (windowWidth >= WindowWidthEnum.MOBILE) {
            setMoviesCount({
                ...moviesCount,
                more: MoviesCountMoreEnum.MOBILE,
                limit: Math.max(MoviesCountLimitEnum.MOBILE, moviesCount.current ?? 0, moviesCount.available)
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