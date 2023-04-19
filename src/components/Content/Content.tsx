import React, {FC, useEffect, useState} from "react";
import styles from "./Content.module.css";
import {FilmType} from "../../types/types";
import {changeMode, getFilms} from "../../app/filmsPage";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {selectFilms} from "../../app/selectors/filmsPageSelector";
import {useNavigate} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {Col, Radio, Row, Spin} from "antd";
import {changeCurrentPage} from "../../app/appInit";
import {RadioChangeEvent} from "antd/lib";


const FilmsPage: FC = React.memo(() => {

    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
    //const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState(1);

    const films = useAppSelector(selectFilms);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFetching && currentPage < 6) {
            dispatch(getFilms({genres, page: currentPage}));
            setCurrentPage(prevState => prevState + 1);
            setIsFetching(false);
        }
    }, [isFetching, genres])


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
            setIsFetching(true);
        }
    }

    const changeGenre = (value: number) => {
        dispatch(changeMode());
        setCurrentPage(1);
        setGenres(value);
        setIsFetching(true);
    }

    if (!films) return <Spin size={'large'} tip={'Loading'}/>

    return (<>
        <Title>Каталог фильмов:</Title>
        <Radio.Group defaultValue={genres} onChange={(e) => changeGenre(e.target.value)}
                     disabled={isFetching} style={{marginBottom: '20px'}}>
            <Radio.Button value={1}>Триллер</Radio.Button>
            <Radio.Button value={2}>Драма</Radio.Button>
            <Radio.Button value={3}>Криминал</Radio.Button>
            <Radio.Button value={4}>Мелодрама</Radio.Button>
            <Radio.Button value={5}>Детектив</Radio.Button>
        </Radio.Group>

        <Row gutter={[{sm: 8, md: 16, xl: 24}, {xs: 16, sm: 16, xl: 24}]}>
            {
                films.map((f, index: number) =>
                    <Col key={index} lg={{span: 6}} md={{span: 8}} sm={{span: 12}}>
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

export default FilmsPage