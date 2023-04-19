import {RootState} from "../store";

export const selectFilms = (state: RootState) =>
    state.filmsPage.films

export const selectIsFetching = (state: RootState) =>
    state.filmsPage.isFetching

export const selectGenre = (state: RootState) =>
    state.filmsPage.genre