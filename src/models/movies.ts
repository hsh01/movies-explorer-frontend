export type CardModel = {
    _id?: string;
    movieId: string;
    nameRU: string;
    nameEN: string;
    thumbnail: string;
    duration: number;
    trailerLink?: string;
    country: string;
    director: string;
    year: string;
    description: string;
    image: string;
    liked?: boolean;
}


export enum MoviesSearchParamsEnum {
    SEARCH_STRING = 'q',
}

export type MoviesCount = {
    more: number;
    available: number;
    current?: number;
    limit: number;
};