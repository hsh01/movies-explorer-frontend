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
}


export enum MoviesSearchParamsEnum {
    SEARCH_STRING = 'q',
}
