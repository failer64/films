import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCurrentFilm, getCurrentFilmImages, getCurrentFilmTeaser} from "../../app/filmsProfile";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {selectFilm} from "../../app/selectors/filmProfileSelector";
import {changeCurrentPage} from "../../app/appInit";
import {Card, Col, Empty, Image, Pagination, Row, Spin, Typography} from "antd";
import './Item.scss'
import {useDispatch} from "react-redux";

const {Title, Paragraph, Text} = Typography;

export const Item: FC = React.memo(() => {
    const [currentPage, setCurrentPage] = useState(1);
    const {filmId} = useParams();

    const currentFilm = useAppSelector(selectFilm);
    const teasers = useAppSelector(state => state.filmsProfile.teasers);
    const images = useAppSelector(state => state.filmsProfile.images);
    const totalPages = useAppSelector(state => state.filmsProfile.totalPages);
    const isFetching = useAppSelector(state => state.filmsProfile.isFetching);

    const dispatch = useAppDispatch();

    // if (!filmId && (currentFilm !== null)) {
    //     filmId = currentFilm.kinopoiskId.toString();
    // } else {
    //     filmId = '1043658';
    // }

    useEffect(() => {
        dispatch(changeCurrentPage('film'));
        dispatch(getCurrentFilm(Number(filmId)));
        //dispatch(getCurrentFilmTeaser(Number(filmId)));
    }, [filmId])

    useEffect(() => {
        const id = Number(filmId);
        dispatch(getCurrentFilmImages({id, currentPage}));
    }, [currentPage, totalPages])

    if (!currentFilm) return <Spin size={'large'} tip={'Loading'}/>

    return (
        <div>
            <Title>{currentFilm.nameRu || currentFilm.nameOriginal}</Title>
            <Row gutter={[{xs: 0, sm: 0, md: 20}, {xs: 20, sm: 20, md: 0}]} style={{marginBottom: '30px'}}>
                <Col md={{span: 8}} sm={{span: 24}}>
                    <Image alt="Poster"
                           fallback={'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq'}
                           src={currentFilm.posterUrl}
                           preview={false}/>
                </Col>
                <Col md={{span: 16}} style={{fontSize: '22px'}}>
                    <Title level={4}>{currentFilm.slogan}</Title>
                    <Paragraph>
                        <Text strong={true}>Год: </Text>
                        <Text>{currentFilm.year}</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong={true}>Рейтинг: </Text>
                        <Text type="warning">{currentFilm.ratingKinopoisk || currentFilm.ratingImdb}</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong={true}>Ограничение: </Text>
                        <Text>{currentFilm.ratingAgeLimits.replace('age', '')} +</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong={true}>Жанр: </Text>
                        {currentFilm.genres.map((f, index) => <Text key={index}>{f.genre} </Text>)}
                    </Paragraph>
                    <Paragraph>
                        <Text strong={true}>Страна: </Text>
                        {currentFilm.countries.map((f, index) => <Text key={index}>{f.country} </Text>)}
                    </Paragraph>
                    <Paragraph>
                        <Text>{currentFilm.description}</Text>
                    </Paragraph>
                </Col>
            </Row>
            <div className="">
                {teasers[0] &&
                    'da'
                    // <iframe src={`https://youtube.com/embed/_nsfVZcCqnY`}
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    // allowFullScreen
                    // title="Embedded youtube"
                    // >
                    // </iframe>
                }
            </div>
            <div>
                <Title level={3}>Кадры из фильма:</Title>
                {!images.length ? <Empty description={'Not images'}/>
                    : <Row gutter={[{xs: 8, sm: 12, md: 16}, {xs: 8, sm: 12, md: 16}]} style={{marginBottom: '20px'}}>
                        {
                            images.map((i, index: number) => <Col md={{span: 6}} xs={{span: 12}}
                                                                  key={index} className={'image'}>
                                    <Image alt="Poster" src={i.previewUrl} preview={{
                                        src: `${i.imageUrl}`,
                                    }} style={{height: '190px'}}/>
                                </Col>
                            )
                        }
                    </Row>
                }
                <Pagination hideOnSinglePage onChange={(e) => setCurrentPage(e)} current={currentPage}
                            total={totalPages * 20} pageSize={20} showSizeChanger={false} responsive
                            style={{textAlign: 'center'}} disabled={isFetching}/>
            </div>
        </div>
    )
})