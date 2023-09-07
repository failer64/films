import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataAPI, FilmsFullType } from "../api/api";
import { FilmType } from "../types/types";


type GenresType = {
	id: number
	genre: string
}

export const getFilms = createAsyncThunk<FilmsFullType, argsType>(
	'filmsPage/getFilms',
	async (args) => {
		return await dataAPI.getFilms(args.genre, args.page);
	},
)

export const getGenres = createAsyncThunk(
	'filmsPage/getGenres',
	async () => {
		const data = await dataAPI.getGenres();
		debugger
		return data.genres.slice(0, 10);
	},
)

const initialState = {
	films: [] as Array<FilmType>,
	isFetching: false,
	genre: 1,
	genres: [] as GenresType[]
}

export const filmsSlice = createSlice({
	name: 'filmsPage',
	initialState,
	reducers: {
		changeGenre: (state, action: PayloadAction<number>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.genre = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(getFilms.fulfilled, (state, action) => {
			// Add user to the state array
			// if (state.mode) {
			//     state.films = action.payload.items;
			//     state.mode = false;
			// } else {
			//     state.films.push(...action.payload.items);
			// }
			state.films = action.payload.items;
			state.isFetching = false;
		}).addCase(getFilms.pending, (state) => {
			// Add user to the state array
			state.isFetching = true;
		}).addCase(getGenres.fulfilled, (state, action) => {
			// Add user to the state array
			state.genres = action.payload;
		})
	},
})

// Action creators are generated for each case reducer function
export const { changeGenre } = filmsSlice.actions

export default filmsSlice.reducer

type StateType = typeof initialState

type argsType = {
	genre: number
	page: number
}