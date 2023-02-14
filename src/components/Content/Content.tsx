import React, {FC, useEffect, useState} from "react";
import styles from "./Content.module.css";
import {FilmType} from "../../types/types";
import {changeMode, getFilms} from "../../app/filmsPage";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {selectFilms} from "../../app/selectors/filmsPageSelector";
import {useNavigate} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {Card, Col, Image, Row, Spin} from "antd";
import {Button, Radio, Space, Divider} from 'antd';
import {SizeType} from "antd/es/config-provider/SizeContext";
import {useDispatch} from "react-redux";
import {changeCurrentPage} from "../../app/appInit";

const {Meta} = Card;


export const FilmsPage: FC = React.memo(() => {

    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    //const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState(null as null | number);

    const films = useAppSelector(selectFilms);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (fetching && currentPage < 6) {
            dispatch(getFilms({genres, page: currentPage}));
            setCurrentPage(prevState => prevState + 1);
            setFetching(false);
        }
    }, [fetching, genres])


    useEffect(() => {
        dispatch(changeCurrentPage('films'));
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [])

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 100 && films.length <= 40) {
            setFetching(true);
        }
    }

    const changeGenre = (value: number) => {
        dispatch(changeMode());
        setCurrentPage(1);
        setGenres(value);
        setFetching(true);
    }

    if (!films) return <Spin size={'large'} tip={'Loading'}/>

    return (<>
        <Title>Каталог фильмов:</Title>
        <Radio.Group onChange={(e) => changeGenre(e.target.value)} style={{marginBottom: '20px'}}>
            <Radio.Button value={1}>Драма</Radio.Button>
            <Radio.Button value={2}>Криминал</Radio.Button>
            <Radio.Button value={3}>Сброс</Radio.Button>
        </Radio.Group>
        <Row gutter={[16, 16]}>
            {
                films.map((f, index: number) =>
                    <Col key={index} span={6}>
                        <Cards key={index} film={f}/>
                    </Col>
                )
            }
        </Row>
    </>)
})

const Cards: FC<PropsType> = React.memo(({film}) => {

    const setItem = () => {
        //getItem(film.id || film.filmId);
    }

    const navigate = useNavigate();

    return (<div onClick={() => navigate(`/film/${film.kinopoiskId}`)} className={styles.item}>
        <div className={styles.image}>
            <img src={film.posterUrlPreview} alt="Poster"/>
        </div>
        <div className={styles.name}>{film.nameRu || film.nameOriginal}</div>
        <div className={styles.year}>{film.year}</div>
        <div className={styles.rating}>{film.ratingKinopoisk || film.ratingImdb}</div>
    </div>)
})


type PropsType = {
    film: FilmType
}
