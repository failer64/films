import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {dataAPI, PremieresFullType, PremieresType, TopFilmsQueryType, TopFilmsType} from "../api/api";


export const getPremieres = createAsyncThunk<PremieresFullType, ArgsType>(
    'homePage/getPremieres',
    async (args) => {
        return await dataAPI.getPremieres(args.year, args.month);
    },
)

export const getTopFilms = createAsyncThunk(
    'filmsPage/getTopFilms',
    async (args: { filmType: TopFilmsQueryType, currentPage: number }) => {
        return await dataAPI.getTopFilms(args.filmType, args.currentPage);
    },
)

const initialState = {
    premieres: [] as Array<PremieresType>,
    topFilms: [] as Array<TopFilmsType>,
    pages: 1,
    error: null as null | string,
    errorOfTopFilms: null as null | string,
    isFetching: false
}

export const homeSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getPremieres.fulfilled, (state: StateType, action) => {
            // Add user to the state array
            state.premieres.push(...action.payload.items);
        })
        builder.addCase(getPremieres.rejected, (state) => {
            state.error = 'Error. Bad request from server';
        })
        builder.addCase(getTopFilms.fulfilled, (state: StateType, action) => {
            // Add user to the state array
            state.topFilms = action.payload.films;
            state.pages = action.payload.pagesCount;
            state.isFetching = false;
        }).addCase(getTopFilms.pending, (state: StateType) => {
            // Add user to the state array
            state.isFetching = true;
        }).addCase(getTopFilms.rejected, (state: StateType) => {
            // Add user to the state array
            state.isFetching = false;
            state.errorOfTopFilms = 'Error. No films';
        })
    },
})

// Action creators are generated for each case reducer function
export const {} = homeSlice.actions

export default homeSlice.reducer

type StateType = typeof initialState

type ArgsType = {
    year: number
    month: string
}