import React from "react";
import styles from './MoviesCard.module.css';
import { minutesToString } from "../../utils/helpers";
import { CardModel } from "../../models/movies";
import { Locales } from "../../utils/locales";
import { Link } from "react-router-dom";

type MoviesCardProps = {
    card: CardModel;
    isLiked: boolean;
    saved: boolean;
    handleLike: (card: CardModel) => void;
}


const MoviesCard: React.FC<MoviesCardProps> = ({
                                                   card,
                                                   isLiked,
                                                   handleLike,
                                                   saved = false,
                                               }) => {
    return (
        <li className={styles.Container}>
            <h1 className={styles.Name}>{card.nameRU}</h1>
            <div className={styles.Duration}>{minutesToString(card.duration)}</div>
            <Link className={styles.Thumbnail} to={card.trailerLink!} target='_blank'>
                <img className={styles.Thumbnail__Image}
                     src={card.thumbnail}
                     alt={card.nameRU}
                     aria-label={card.nameRU}
                />
            </Link>
            {
                <button
                    className={`${styles.Button} ${isLiked
                        ? saved ? styles.Button_Type_Remove : styles.Button_Type_Liked
                        : ''}`}
                    onClick={() => handleLike(card)}
                >{!isLiked ? Locales.LIKE : ''}</button>
            }
        </li>
    );
};

export { MoviesCard };