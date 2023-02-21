import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {dataAPI, ImagesType} from "../api/api";
import {FilmType} from "../types/types";


export const getCurrentFilm = createAsyncThunk<FilmType, number>(
    'profilePage/getCurrentFilm',
    async (id) => {
        return await dataAPI.getCurrentFilm(id);
    },
)
export const getCurrentFilmTeaser = createAsyncThunk<any, number>(
    'profilePage/getCurrentFilmTeaser',
    async (id: number) => {
        return await dataAPI.getMovies(id);
    },
)
export const getCurrentFilmImages = createAsyncThunk<ImagesType, { id: number, currentPage: number }>(
    'profilePage/getCurrentFilmImages',
    async (args) => {
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
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getCurrentFilm.fulfilled, (state, action) => {
                // Add user to the state array
                state.film = action.payload;
            })
            .addCase(getCurrentFilmTeaser.fulfilled, (state, action) => {
                // Add user to the state array
                state.teasers = action.payload.items;
            })
            .addCase(getCurrentFilmImages.fulfilled, (state, action) => {
                // Add user to the state array
                state.images = action.payload.items;
                state.totalPages = action.payload.totalPages;
                state.isFetching = false;
            }).addCase(getCurrentFilmImages.pending, (state) => {
            // Add user to the state array
            state.isFetching = true;
        })
    },
})

// Action creators are generated for each case reducer function
//export const {} = profileSlice.actions

export default profileSlice.reducer

type StateType = typeof initialState
