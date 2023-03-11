import React, { useState } from "react";
import styles from './MoviesCard.module.css';
import { minutesToString } from "../../utils/helpers";
import { MovieListType, MoviesCardProps } from "../../models/movies";

const MoviesCard: React.FC<MoviesCardProps> = ({
                                                   card: {nameRU, thumbnail, duration, liked},
                                                   movieListType = MovieListType.ALL
                                               }) => {
    const [isLiked, setIsLiked] = useState<boolean>(liked ?? false);

    return (
        <div className={styles.Container}>
            <img className={styles.Thumbnail}
                 src={thumbnail}
                 alt={nameRU}
                 aria-label={nameRU}
            />
            <h1 className={styles.Name}>{nameRU}</h1>
            {
                movieListType === MovieListType.ALL &&
                <button className={`${styles.Button} ${isLiked ? styles.Button_Type_Liked : ''}`}
                        onClick={() => setIsLiked(!isLiked)}
                />
            }
            {
                movieListType === MovieListType.SAVED &&
                <button className={`${styles.Button} ${styles.Button_Type_Remove}`}
                        onClick={() => setIsLiked(!isLiked)}
                />
            }
            <div className={styles.Duration}>{minutesToString(duration)}</div>
        </div>
    );
};

export { MoviesCard };