import {RootState} from "../store";

export const selectFilm = (state: RootState) =>
    state.filmsProfile.film
export const selectPremieres = (state: RootState) =>
    state.homePage.premieres