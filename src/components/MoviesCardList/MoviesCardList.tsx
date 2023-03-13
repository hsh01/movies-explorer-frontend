import React, { useEffect, useState } from "react";
import styles from './MoviesCardList.module.css';
import { MoviesCard } from "../MoviesCard";
import { Preloader } from "../Preloader";
import { CardModel, MovieListType, MoviesCardProps, MoviesListProps } from "../../models/movies";

const moviesMock: CardModel[] = [
    {
        id: 1,
        nameRU: '33 слова о дизайне',
        thumbnail: require('../../images/mock/movie_1.png'),
        duration: 102,
        liked: true
    },
    {
        id: 2,
        nameRU: 'Киноальманах «100 лет дизайна»Киноальманах  дизайна»',
        thumbnail: require('../../images/mock/movie_2.png'),
        duration: 102
    },
    {
        id: 3,
        nameRU: 'В погоне за БенксиВ погоне за БенксиВ погоне за Бенкси',
        thumbnail: require('../../images/mock/movie_3.png'),
        duration: 60,
        liked: true
    },
    {
        id: 4,
        nameRU: 'Баския: Взрыв реальности',
        thumbnail: require('../../images/mock/movie_4.png'),
        duration: 61
    },
    {
        id: 5,
        nameRU: 'Бег это свобода',
        thumbnail: require('../../images/mock/movie_5.png'),
        duration: 102
    },
];

const MoviesCardList: React.FC<MoviesListProps> = ({movieListType = MovieListType.ALL}) => {
    const [movies, setMovies] = useState<CardModel[]>();

    useEffect(() => {
        setTimeout(() => {
            setMovies(moviesMock);
        }, 400);
    }, []);

    return (
        <div className={styles.MoviesCardList}>
            <ul className={styles.Container}>
                {
                    movies ? movies.map((movie, index) => (
                        <MoviesCard key={movie.id} card={movie} movieListType={movieListType} />
                    )) : <Preloader />
                }
            </ul>
            <button className={styles.ButtonMore}>Ещё</button>
        </div>
    );


};

export { MoviesCardList };