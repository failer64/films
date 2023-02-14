import React, {useEffect} from "react";
import "./Home.css"
import {TopFilms} from "./TopFilms/TopFilms";
import {Premieres} from "./Premieres/Premieres";
import {changeCurrentPage} from "../../app/appInit";
import {useDispatch} from "react-redux";


export const HomePage = React.memo(() => {
    const dispatch = useDispatch<any>();

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
