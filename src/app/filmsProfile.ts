import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {dataAPI} from "../api/api";
import {FilmType} from "../types/types";


export const getCurrentFilm = createAsyncThunk(
    'profilePage/getCurrentFilm',
    async (id: number) => {
        return await dataAPI.getCurrentFilm(id);
    },
)
export const getCurrentFilmTeaser = createAsyncThunk(
    'profilePage/getCurrentFilmTeaser',
    async (id: number) => {
        return await dataAPI.getMovies(id);
    },
)
export const getCurrentFilmImages = createAsyncThunk(
    'profilePage/getCurrentFilmImages',
    async (args: ArgsType) => {
        return await dataAPI.getImages(args.id, args.currentPage);
    },
)

const initialState = {
    film: null as null | FilmType,
    teasers: [],
    images: [] as Array<{ imageUrl: string, previewUrl: string }>,
    totalPages: 0,
    isFetching: false,
}

export const profileSlice = createSlice({
    name: 'profilePage',
    initialState,
    reducers: {
        changeMode: () => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getCurrentFilm.fulfilled, (state: StateType, action) => {
            // Add user to the state array
            state.film = action.payload;
        })
        builder.addCase(getCurrentFilmTeaser.fulfilled, (state: StateType, action) => {
            // Add user to the state array
            state.teasers = action.payload.items;
        })
        builder.addCase(getCurrentFilmImages.fulfilled, (state: StateType, action) => {
            // Add user to the state array
            state.images = action.payload.items;
            state.totalPages = action.payload.totalPages;
            state.isFetching = false;
        }).addCase(getCurrentFilmImages.pending, (state: StateType, action) => {
            // Add user to the state array
            state.isFetching = true;
        })
    },
})

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions

export default profileSlice.reducer

type StateType = typeof initialState

type ArgsType = {
    id: number
    currentPage: number
}