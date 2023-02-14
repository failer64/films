import {configureStore} from "@reduxjs/toolkit";
import filmsReducer from './filmsPage'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import profileReducer from "./filmsProfile";
import homeReducer from "./homePage";
import appReducer from "./appInit";


export const store = configureStore({
    reducer: {
        homePage: homeReducer,
        filmsPage: filmsReducer,
        filmsProfile: profileReducer,
        mainApp: appReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;