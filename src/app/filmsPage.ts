import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {dataAPI, FilmsFullType} from "../api/api";
import {FilmType} from "../types/types";


export const getFilms = createAsyncThunk<FilmsFullType, argsType>(
    'filmsPage/getFilms',
    async (args) => {
        return await dataAPI.getFilms(args.genres, args.page);
    },
)

const initialState = {
    films: [] as Array<FilmType>,
    mode: false,
}

export const filmsSlice = createSlice({
    name: 'filmsPage',
    initialState,
    reducers: {
        changeMode: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.mode = true;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getFilms.fulfilled, (state, action) => {
            // Add user to the state array
            if (state.mode) {
                state.films = action.payload.items;
                state.mode = false;
            } else {
                state.films.push(...action.payload.items);
            }
        })
    },
})

// Action creators are generated for each case reducer function
export const {changeMode} = filmsSlice.actions

export default filmsSlice.reducer

type StateType = typeof initialState

type argsType = {
    genres: number | null
    page: number
}