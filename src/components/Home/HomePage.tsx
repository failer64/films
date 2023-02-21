import React, {useEffect} from "react";
import "./Home.css"
import {TopFilms} from "./TopFilms/TopFilms";
import {Premieres} from "./Premieres/Premieres";
import {changeCurrentPage} from "../../app/appInit";
import {useAppDispatch} from "../../app/store";


export const HomePage = React.memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeCurrentPage('home'));
    }, [])

    return (
        <>
            {/*<Premieres/>*/}
            <TopFilms/>
        </>
    )
})