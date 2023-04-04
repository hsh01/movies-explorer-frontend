import React from "react";
import styles from './MoviesCardList.module.css';
import { MoviesCard } from "../MoviesCard";
import { Preloader } from "../Preloader";
import { CardModel } from "../../models/movies";

type MoviesListProps = {
    movies: CardModel[];
    savedMovies?: CardModel[];
    handleLike: (v: any) => void;
    loading: boolean;
    saved?: boolean;
}
const MoviesCardList: React.FC<MoviesListProps> = ({
                                                       movies,
                                                       savedMovies,
                                                       handleLike,
                                                       loading,
                                                       saved = false,
                                                   }) => {

    if (loading) return <Preloader />
    return (
        <div className={styles.MoviesCardList}>
            <ul className={styles.Container}>
                {
                    movies.map((movie: CardModel) => {
                        let liked = saved;
                        if (!saved) {
                            liked = !!savedMovies?.find(item => item.movieId === movie.movieId);
                        }
                        return (
                            <MoviesCard key={movie.movieId}
                                        card={movie}
                                        saved={saved}
                                        handleLike={() => handleLike(movie)}
                                        isLiked={liked}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );


};

export { MoviesCardList };