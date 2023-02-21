import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {dataAPI, PremieresFullType, PremieresType, TopFilmsFullType, TopFilmsQueryType, TopFilmsType} from "../api/api";


export const getPremieres = createAsyncThunk<PremieresFullType, { year: number, month: string }>(
    'homePage/getPremieres',
    async (args) => {
        return await dataAPI.getPremieres(args.year, args.month);
    },
)

export const getTopFilms = createAsyncThunk<TopFilmsFullType, { filmType: TopFilmsQueryType, currentPage: number }>(
    'filmsPage/getTopFilms',
    async (args) => {
        return await dataAPI.getTopFilms(args.filmType, args.currentPage);
    },
)

const initialState = {
    premieres: [] as Array<PremieresType>,
    topFilms: [] as Array<TopFilmsType>,
    pages: 1,
    error: null as null | string,
    errorOfTopFilms: null as null | string,
    isFetching: false,
    filmType: "TOP_AWAIT_FILMS" as TopFilmsQueryType
}

export const homeSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setFilmType: (state, action: PayloadAction<TopFilmsQueryType>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.filmType = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getPremieres.fulfilled, (state, action) => {
                // Add user to the state array
                state.premieres.push(...action.payload.items);
            })
            .addCase(getPremieres.rejected, (state) => {
                state.error = 'Error. Bad request from server';
            })
            .addCase(getTopFilms.fulfilled, (state, action) => {
                // Add user to the state array
                state.topFilms = action.payload.films;
                state.pages = action.payload.pagesCount;
                state.isFetching = false;
            })
            .addCase(getTopFilms.pending, (state) => {
                // Add user to the state array
                state.isFetching = true;
            })
            .addCase(getTopFilms.rejected, (state) => {
                // Add user to the state array
                state.isFetching = false;
                state.errorOfTopFilms = 'Error. No films';
            })
    },
})

// Action creators are generated for each case reducer function
export const {setFilmType} = homeSlice.actions

export default homeSlice.reducer

type StateType = typeof initialState
