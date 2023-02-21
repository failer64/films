import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type CurrentPageType = 'home' | 'films' | 'film'

const initialState = {
    currentPage: 'home' as CurrentPageType
}

export const appReducer = createSlice({
    name: 'appInit',
    initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<CurrentPageType>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.currentPage = action.payload;
        },
    },
    extraReducers: () => {
        // Add reducers for additional action types here, and handle loading state as needed
    },
})

// Action creators are generated for each case reducer function
export const {changeCurrentPage} = appReducer.actions

export default appReducer.reducer

type StateType = typeof initialState