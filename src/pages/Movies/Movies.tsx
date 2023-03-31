import React, { useEffect, useState } from "react";
import styles from './Movies.module.css';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SearchForm } from "../../components/SearchForm";
import { MoviesCardList } from "../../components/MoviesCardList";
import { CardModel, MoviesSearchParamsEnum } from "../../models/movies";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { beatfilmMoviesApi } from "../../utils/api/MoviesApi";
import { api } from "../../utils/api/MainApi";
import { clean_words } from "../../utils/helpers";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import { REACT_APP_MOVIES_API_BASE_PATH } from "../../config";

type MoviesCount = {
    more: number;
    available: number;
    current?: number;
    limit: number;
};

type MoviesProps = {
    saved?: boolean;
}

const Movies: React.FC<MoviesProps> = ({saved = false}) => {

    const [isShortsOnly, setIsShortsOnly] = useLocalStorage<boolean>('isShortsOnly', false);
    const [allMovies, setAllMovies] = useLocalStorage<CardModel[]>('allMovies', [], 3600);
    const [savedMovies, setSavedMovies] = useState<CardModel[]>([]);
    const [displayedMovies, setDisplayedMovies] = useState<CardModel[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useSearchParamsState(MoviesSearchParamsEnum.SEARCH_STRING, '');
    const validator = useFormAndValidation({search});
    const {user} = useAuth();

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [moviesCount, setMoviesCount] = useState<MoviesCount>({
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

    useEffect(() => {
        setLoading(true);
        const fetchAllMovies = async () => {
            if (!allMovies.length) {
                const data = await beatfilmMoviesApi.getMovies();
                setAllMovies([...data.map((item: any) => ({
                    movieId: item.id,
                    nameRU: item.nameRU,
                    nameEN: item.nameEN,
                    thumbnail: `${REACT_APP_MOVIES_API_BASE_PATH}${item.image.formats.thumbnail.url}`,
                    duration: item.duration,
                    trailerLink: item.trailerLink,
                    country: item.country,
                    director: item.director,
                    year: item.year,
                    description: item.description,
                    image: `${REACT_APP_MOVIES_API_BASE_PATH}${item.image.url}`,
                }))]);
            }
        }
        const fetchSavedMovies = async () => {
            const data = await api.getMovies();
            setSavedMovies([...data]);
        }

        fetchAllMovies()
            .then(fetchSavedMovies)
            .catch(err => {
                setError(err.toString());
            })
            .finally(() => setLoading(false));

    }, []);

    function handleLike(movie: CardModel) {
        const likedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
        if (likedMovie) {
            api.deleteMovie(likedMovie._id!)
                .then((data) => {
                    if (data.success) {
                        setSavedMovies([...savedMovies.filter((card) => card.movieId !== likedMovie.movieId!)]);
                        setDisplayedMovies([...displayedMovies.map(item => {
                            return {...item, liked: likedMovie.movieId === item.movieId ? false : item.liked};
                        })]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                });
        } else {
            api.createMovie({
                movieId: movie.movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.thumbnail,
                duration: movie.duration,
                trailerLink: movie.trailerLink,
                country: movie.country,
                director: movie.director,
                year: movie.year,
                description: movie.description,
                image: movie.image
            })
                .then((data: CardModel) => {
                    setSavedMovies([...savedMovies, data]);
                    setDisplayedMovies([...displayedMovies.map(item => {
                        return {...item, liked: data.movieId === item.movieId ? true : item.liked};
                    })]);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                });
        }
    }

    function handleMoreButtonClick() {
        setMoviesCount({
            ...moviesCount,
            limit: moviesCount.limit + moviesCount.more,
            current: moviesCount.limit + moviesCount.more,
            available: displayedMovies.length
        });
    }

    useEffect(() => {
        setLoading(true);
        const tempMovies = allMovies?.filter((item: CardModel) => {
            const isMovieNameFound = clean_words(search).every(v => clean_words(item.nameRU).some(m => m.includes(v)));
            const isMovieShort = item.duration <= 40;
            return (!isShortsOnly || isMovieShort === isShortsOnly) && ((search && isMovieNameFound) || !search);
        });
        setDisplayedMovies([...tempMovies.map((item) => {
            const liked = savedMovies.find((savedItem) => savedItem.movieId === item.movieId);
            return {...item, liked: !!liked};
        })]);
        setLoading(false);
    }, [search, isShortsOnly, allMovies]);


    return (
        <div className={styles.Container}>
            <Header user={user} />
            <main className={styles.Main}>
                <SearchForm validator={validator} setSearch={setSearch} isShort={isShortsOnly}
                            setIsShortsOnly={setIsShortsOnly} />
                <div className={styles.Error}>{error}</div>
                <MoviesCardList saved={saved}
                                loading={loading}
                                movies={displayedMovies.slice(0, moviesCount.current ?? moviesCount.limit)}
                                handleLike={handleLike}
                />
                {
                    !saved && (moviesCount.current ?? moviesCount.limit) < displayedMovies.length &&
                    <button className={styles.ButtonMore} onClick={handleMoreButtonClick}>Ещё</button>
                }
            </main>
            <Footer />
        </div>
    );
}

export { Movies };