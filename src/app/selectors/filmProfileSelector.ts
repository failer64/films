import {RootState} from "../store";

export const selectFilm = (state: RootState) =>
    state.filmsProfile.film
export const selectPremieres = (state: RootState) =>
    state.homePage.premieres
export const selectFilmTeasers = (state: RootState) =>
    state.filmsProfile.teasers
export const selectFilmImages = (state: RootState) =>
    state.filmsProfile.images
export const selectFilmTotalPages = (state: RootState) =>
    state.filmsProfile.totalPages
export const selectFilmIsFetching = (state: RootState) =>
    state.filmsProfile.isFetching
