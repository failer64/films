export type FilmType = {
    kinopoiskId: number
    //"imdbId": "tt0133093",
    nameRu: string
    //"nameEn": "The Matrix",
    nameOriginal: string
    posterUrl: string
    posterUrlPreview: string
    //"coverUrl": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016cc7177239d4025185c488b1bf43/orig",
    //"logoUrl": "https://avatars.mds.yandex.net/get-ott/1648503/2a00000170a5418408119bc802b53a03007b/orig",
    //"reviewsCount": 293,
    //"ratingGoodReview": 88.9,
    //"ratingGoodReviewVoteCount": 257,
    ratingKinopoisk: number
    //"ratingKinopoiskVoteCount": 524108,
    ratingImdb: number
    //"ratingImdbVoteCount": 1729087,
    //"ratingFilmCritics": 7.8,
    //"ratingFilmCriticsVoteCount": 155,
    //"ratingAwait": 7.8,
    //"ratingAwaitCount": 2,
    //"ratingRfCritics": 7.8,
    //"ratingRfCriticsVoteCount": 31,
    //"webUrl": "https://www.kinopoisk.ru/film/301/",
    year: number
    filmLength: number
    slogan: string
    description: string
    shortDescription: string
    editorAnnotation: string
    //"isTicketsAvailable": false,
    //"productionStatus": "POST_PRODUCTION",
    //"type": "FILM",
    //"ratingMpaa": "r",
    "ratingAgeLimits": string
    //"hasImax": false,
    //"has3D": false,
    //"lastSync": "2021-07-29T20:07:49.109817",
    countries: [{ country: string }]
    genres: [{ genre: string }]
    startYear: number,
    //"endYear": 1996,
    //"serial": false,
    //"shortFilm": false,
    //"completed": false
}