import React, { useEffect, useState } from "react";
import styles from './SavedMovies.module.css';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SearchForm } from "../../components/SearchForm";
import { MoviesCardList } from "../../components/MoviesCardList";
import { CardModel } from "../../models/movies";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api/MainApi";
import { clean_words } from "../../utils/helpers";
import { ErrorMessagesEnum } from "../../utils/constants";


const SavedMovies: React.FC = () => {

    const [isShortsOnly, setIsShortsOnly] = useState<boolean>(false);
    const [savedMovies, setSavedMovies] = useState<CardModel[]>([]);
    const [displayedMovies, setDisplayedMovies] = useState<CardModel[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const validator = useFormAndValidation({search});
    const {user} = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchSavedMovies = async () => {
            const data = await api.getMovies();
            setSavedMovies([...data]);
        }

        fetchSavedMovies()
            .catch(err => {
                let message = err.toString();
                if (message === 'TypeError: Failed to fetch') {
                    message = ErrorMessagesEnum.NO_CONNECTION;
                }
                setError(message);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const tempMovies = savedMovies?.filter((item: CardModel) => {
            const isMovieNameFound = clean_words(search).every(v => clean_words(item.nameRU).some(m => m.includes(v)));
            const isMovieShort = item.duration <= 40;
            return (!isShortsOnly || isMovieShort === isShortsOnly) && ((search && isMovieNameFound) || !search);
        });
        setDisplayedMovies([...tempMovies]);
    }, [search, isShortsOnly, savedMovies]);

    function handleLike(movie: CardModel) {
        api.deleteMovie(movie._id!)
            .then((data) => {
                if (data.success) {
                    setDisplayedMovies([...displayedMovies.filter((card) => card.movieId !== movie.movieId)]);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }


    return (
        <div className={styles.Container}>
            <Header user={user} />
            <main className={styles.Main}>
                <SearchForm validator={validator} setSearch={setSearch} isShort={isShortsOnly}
                            setIsShortsOnly={setIsShortsOnly} />
                {
                    error &&
                    <div className={`${styles.InfoTip} ${styles.Error}`}>{error}</div>
                }
                <MoviesCardList saved={true} loading={loading} movies={displayedMovies} handleLike={handleLike} />
            </main>
            <Footer />
        </div>
    );
};

export { SavedMovies };