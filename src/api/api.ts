import axios from "axios";
import {FilmType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/',
    headers: {
        'X-API-KEY': 'a16e5ea3-7e40-47b8-a8dd-0a3e2a36e67d',
    }
});

export const dataAPI = {
    getCurrentFilm(id: number = 1) {
        return (instance.get<FilmType>(`${id}`).then(response => response.data));
    },
    getFilms(genres: number = 1, page: number = 1) {
        return (instance.get<FilmsFullType>(`?page=${page}` + `&genres=${genres}`)).then(response => response.data);
    },
    getTopFilms(filmType: TopFilmsQueryType, page: number = 1) {
        return (instance.get<TopFilmsFullType>(`top?page=${page}&type=${filmType}`).then(response => response.data));
    },
    getMovies(id: number) {
        return (instance.get(`${id}/videos`).then(response => response.data));
    },
    getImages(id: number, page: number = 1) {
        return (instance.get<ImagesType>(`${id}/images?page=${page}`).then(response => response.data));
    },
    getPremieres(year: number, month: string) {
        return (instance.get<PremieresFullType>(`/premieres?year=${year}` + (`&month=${month}`)))
            .then(response => response.data);
    },
    // getUsers(pageSize: number = 5, currentPage: number = 1) {
    //     return (
    //         instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`)
    //             .then(response => response.data)
    //     )
    // },
}
export type PremieresFullType = {
    total: number
    items: Array<PremieresType>
}
export type PremieresType = {
    kinopoiskId: number
    nameRu: string
    nameEn: string
    year: number
    posterUrl: string
    posterUrlPreview: string
    countries: Array<{
        country: string
    }>,
    genres: Array<{
        genre: string
    }>,
    duration: number
    premiereRu: string
}

export type TopFilmsFullType = {
    pagesCount: number
    films: Array<TopFilmsType>
}
export type TopFilmsType = {
    countries: Array<{
        country: string
    }>,
    filmId: number
    filmLength: string
    genres: Array<{
        genre: string
    }>,
    nameEn: string
    nameRu: string
    posterUrl: string
    posterUrlPreview: string
    rating: string
    ratingChange: null
    ratingVoteCount: number
    year: string
}

export type TopFilmsQueryType = 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS'

export type ImagesType = {
    items: Array<{ imageUrl: string, previewUrl: string }>
    total: number
    totalPages: number
}

export type FilmsFullType = {
    items: FilmType[]
    total: number
    totalPages: number
}