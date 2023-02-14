import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {dataAPI} from "../api/api";
import {FilmType} from "../types/types";


export const getFilms = createAsyncThunk<any, argsType, any>(
    'filmsPage/getFilms',
    async (args) => {
        return await dataAPI.getFilms(args.genres, args.page);
    },
)


type argsType = {
    genres: number | null
    page: number
}

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
        builder.addCase(getFilms.fulfilled, (state: StateType, action) => {
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