import React, { useEffect, useState } from "react";
import styles from './Movies.module.css';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SearchForm } from "../../components/SearchForm";
import { MoviesCardList } from "../../components/MoviesCardList";
import { CardModel } from "../../models/movies";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAuth } from "../../contexts/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { beatfilmMoviesApi } from "../../utils/api/MoviesApi";
import { api } from "../../utils/api/MainApi";
import { clean_words } from "../../utils/helpers";
import { REACT_APP_MOVIES_API_BASE_PATH } from "../../config";
import { ErrorMessagesEnum, LocalStorageEnum } from "../../utils/constants";
import { useWidthDependsLimiter } from "../../hooks/useWidthDependsLimiter";

type MoviesProps = {
    saved?: boolean;
}

const Movies: React.FC<MoviesProps> = ({saved = false}) => {

    const [isShortsOnly, setIsShortsOnly] = useLocalStorage<boolean>(LocalStorageEnum.IS_SHORTS_ONLY, false);
    const [allMovies, setAllMovies] = useLocalStorage<CardModel[]>(LocalStorageEnum.ALL_MOVIES, [], 3600);
    const [displayedMovies, setDisplayedMovies] = useLocalStorage<CardModel[]>(LocalStorageEnum.DISPLAYED_MOVIES, []);
    const [search, setSearch] = useLocalStorage(LocalStorageEnum.LAST_SEARCH, '');
    const [savedMovies, setSavedMovies] = useState<CardModel[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const validator = useFormAndValidation({search});
    const {user} = useAuth();
    const {moviesCount, setMoviesCount} = useWidthDependsLimiter();


    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            if (!allMovies.length) {
                const data = await beatfilmMoviesApi.getMovies();
                setAllMovies([...data.map((item: CardModel & { id: number, image: { formats: { thumbnail: { url: string; }; }; url: string; } }) => {
                    return ({
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
                    });
                })]);
            }
        }
        const fetchSavedMovies = async () => {
            const data = await api.getMovies();
            setSavedMovies([...data]);
        }

        fetchAllMovies()
            .then(fetchSavedMovies)
            .catch(err => {
                let message = err.toString();
                if (message === 'TypeError: Failed to fetch') {
                    message = ErrorMessagesEnum.NO_CONNECTION;
                }
                setError(message);
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
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                });
        } else {
            api.createMovie(movie)
                .then((data: CardModel) => {
                    setSavedMovies([...savedMovies, data]);
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
        const tempMovies = allMovies?.filter((item: CardModel) => {
            const isMovieNameFound = clean_words(search).every(v => clean_words(item.nameRU).some(m => m.includes(v)));
            const isMovieShort = item.duration <= 40;
            return search && (!isShortsOnly || isMovieShort === isShortsOnly) && ((search && isMovieNameFound));
        });

        setDisplayedMovies([...tempMovies]);
    }, [search, isShortsOnly, allMovies]);

    return (
        <div className={styles.Container}>
            <Header user={user} />
            <main className={styles.Main}>
                <SearchForm validator={validator}
                            setSearch={setSearch}
                            isShort={isShortsOnly}
                            setIsShortsOnly={setIsShortsOnly}
                />
                {
                    error &&
                    <div className={`${styles.InfoTip} ${styles.Error}`}>{error}</div>
                }
                {
                    !loading && search && !displayedMovies?.length && !error ?
                        <span className={styles.InfoTip}>{ErrorMessagesEnum.NOTHING_FOUND}</span> :
                        <MoviesCardList saved={saved}
                                        loading={loading}
                                        movies={displayedMovies.slice(0, moviesCount.current ?? moviesCount.limit)}
                                        savedMovies={savedMovies}
                                        handleLike={handleLike}
                        />
                }
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