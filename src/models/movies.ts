export type CardModel = {
    id?: number;
    nameRU: string;
    thumbnail: string;
    duration: number;
    liked?: boolean;
}

export type MoviesCardProps = {
    card: CardModel;
    movieListType?: MovieListType;
}

export enum MovieListType {
    ALL = 'all',
    SAVED = 'saved'
}

export type MoviesListProps = {
    movieListType?: MovieListType;
}