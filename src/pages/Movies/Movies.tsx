import React from "react";
import styles from './Movies.module.css';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SearchForm } from "../../components/SearchForm";
import { MoviesCardList } from "../../components/MoviesCardList";
import { MovieListType, MoviesListProps } from "../../models/movies";


const Movies: React.FC<MoviesListProps> = ({movieListType = MovieListType.ALL}) => {

    return (
        <div className={styles.Container}>
            <Header user={'fake-user'}/>
            <SearchForm/>
            <MoviesCardList movieListType={movieListType}/>
            <Footer/>
        </div>
    );
};

export { Movies };