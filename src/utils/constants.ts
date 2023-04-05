export const links = [
    {
        label: 'Статичный сайт',
        href: 'https://hsh01.github.io/how-to-learn/'
    },
    {
        label: 'Адаптивный сайт',
        href: 'https://hsh01.github.io/russian-travel/'
    },
    {
        label: 'Одностраничное приложение',
        href: 'https://hsh01.github.io/react-mesto-auth/'
    },
];

export enum InfoMessagesEnum {
    SAVED_SUCCESS = 'Данные успешно сохранены!',
    REGISTERED_SUCCESS = 'Вы успешно зарегистрировались!',
}

export enum ErrorMessagesEnum {
    NO_CONNECTION = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
    NOTHING_FOUND = 'Ничего не найдено',
    KEYWORDS_REQUIRED = 'Нужно ввести ключевое слово',
}

export enum LocalStorageEnum {
    IS_SHORTS_ONLY = 'isShortsOnly',
    LAST_SEARCH = 'lastSearch',
    ALL_MOVIES = 'allMovies',
    DISPLAYED_MOVIES = 'movies',
    USER = 'user',
}

export enum MoviesCountMoreEnum {
    DEFAULT = 3,
    TABLET = 3,
    MOBILE = 3,
}

export enum MoviesCountLimitEnum {
    DEFAULT = 12,
    TABLET = 8,
    MOBILE = 5,
}

export enum WindowWidthEnum {
    DEFAULT = 1080,
    TABLET = 480,
    MOBILE = 320,
}

export enum MoviesEnum {
    SHORT_MOVIE_LENGTH = 40
}

export const isEmailRegex = '\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,5})+';
