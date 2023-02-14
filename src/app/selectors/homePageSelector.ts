import {RootState} from "../store";

export const selectPremieres = (state: RootState) =>
    state.homePage.premieres
export const selectError = (state: RootState) =>
    state.homePage.error
export const selectTopFilms = (state: RootState) =>
    state.homePage.topFilms
export const selectTotalPages = (state: RootState) =>
    state.homePage.pages
export const selectIsFetching= (state: RootState) =>
    state.homePage.isFetching
export const selectTopFilmsError = (state: RootState) =>
    state.homePage.errorOfTopFilms