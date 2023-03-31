import React, { useState } from "react";
import styles from './MoviesCard.module.css';
import { getEmbedLink, minutesToString } from "../../utils/helpers";
import { CardModel } from "../../models/movies";
import { Locales } from "../../utils/locales";

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
    const [showTrailer, setShowTrailer] = useState<boolean>(false);

    return (
        <li className={styles.Container}>
            <h1 className={styles.Name}>{card.nameRU}</h1>
            <div className={styles.Duration}>{minutesToString(card.duration)}</div>
            <div className={styles.Thumbnail} onClick={() => {
                setShowTrailer(true)
            }}>
                {
                    showTrailer ?
                        <iframe src={getEmbedLink(card.trailerLink)}
                                title={card.nameRU}
                                allowFullScreen
                                className={styles.Thumbnail__Trailer}
                        /> :
                        <img className={styles.Thumbnail__Image}
                             src={card.thumbnail}
                             alt={card.nameRU}
                             aria-label={card.nameRU}
                        />
                }
            </div>
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