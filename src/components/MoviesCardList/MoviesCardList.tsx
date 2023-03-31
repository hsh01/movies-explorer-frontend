import React from "react";
import styles from './MoviesCardList.module.css';
import { MoviesCard } from "../MoviesCard";
import { Preloader } from "../Preloader";
import { CardModel } from "../../models/movies";
import { ErrorMessagesEnum } from "../../utils/constants";

type MoviesListProps = {
    movies: CardModel[];
    handleLike: (v: any) => void;
    loading: boolean;
    saved?: boolean;
}
const MoviesCardList: React.FC<MoviesListProps> = ({
                                                       movies,
                                                       handleLike,
                                                       loading,
                                                       saved = false,
                                                   }) => {

    if (loading) return <Preloader />
    return (
            movies.length ?
                <div className={styles.MoviesCardList}>
                    <ul className={styles.Container}>
                        {
                            movies.map((movie: CardModel) => {
                                return (
                                    <MoviesCard key={movie.movieId}
                                                card={movie}
                                                saved={saved}
                                                handleLike={() => handleLike(movie)}
                                                isLiked={movie.liked === true || saved}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
                : <span className={styles.Nothing}>{ErrorMessagesEnum.NOTHING_FOUND}</span>
    );


};

export { MoviesCardList };