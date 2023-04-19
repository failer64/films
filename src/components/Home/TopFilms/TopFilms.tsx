import {Card, Col, Empty, Image, Pagination, Radio, Row, Typography} from "antd";
import React, {FC, memo, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
    selectFilmType,
    selectIsFetching,
    selectTopFilms,
    selectTopFilmsError,
    selectTotalPages
} from "../../../app/selectors/homePageSelector";
import {getTopFilms, setFilmType} from "../../../app/homePage";
import {RadioChangeEvent} from "antd/lib";
import {TopFilmsQueryType, TopFilmsType} from "../../../api/api";
import {useNavigate} from "react-router-dom";

const {Title, Paragraph, Text} = Typography;

export const TopFilms = memo(() => {
    //const [filmType, setFilmType] = useState<TopFilmsQueryType>("TOP_AWAIT_FILMS");
    const [currentPage, setCurrentPage] = useState(1);

    const filmType = useAppSelector(selectFilmType);
    const films = useAppSelector(selectTopFilms);
    let totalPages = useAppSelector(selectTotalPages);
    const isFetching = useAppSelector(selectIsFetching);
    const error = useAppSelector(selectTopFilmsError);

    if (filmType === "TOP_100_POPULAR_FILMS" && !error) {
        totalPages = 20;
    }

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTopFilms({filmType, currentPage}));
    }, [filmType, currentPage])

    const changeFilter = (value: TopFilmsQueryType) => {
        setCurrentPage(1);
        dispatch(setFilmType(value));
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Radio.Group defaultValue={filmType} disabled={isFetching}
                         onChange={(e: RadioChangeEvent) => changeFilter(e.target.value)}
                         style={{marginBottom: '20px'}}>
                <Radio.Button value={'TOP_250_BEST_FILMS'}>Топ 250</Radio.Button>
                <Radio.Button value={'TOP_100_POPULAR_FILMS'}>Популярные</Radio.Button>
                <Radio.Button value={'TOP_AWAIT_FILMS'}>Топ ожидаемых</Radio.Button>
            </Radio.Group>
            {error ? <Empty description={error}/>
                : <Row gutter={[{sm: 8, md: 16, xl: 24}, {xs: 16, sm: 16, xl: 24}]} style={{marginBottom: '20px'}}>
                    {
                        films.map((f, index: number) =>
                            <Col key={index} lg={{span: 6}} md={{span: 8}} sm={{span: 12}}>
                                <CardItem item={f} isFetching={isFetching}/>
                            </Col>
                        )
                    }
                </Row>
            }
            <Pagination hideOnSinglePage onChange={(e) => setCurrentPage(e)} current={currentPage}
                        total={totalPages * 20} pageSize={20} showSizeChanger={false} responsive
                        style={{textAlign: 'center'}} disabled={isFetching}/>
        </div>
    )
})

const CardItem: FC<PropsType> = ({item, isFetching}) => {
    const navigate = useNavigate();
    return <>
        <Card hoverable onClick={() => navigate(`/film/${item.filmId}`)}
              style={{height: '100%'}} loading={isFetching}
              cover={<Image alt="Poster"
                            fallback={'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq'}
                            src={isFetching ? 'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq' : item.posterUrl}
                            preview={false}/>}>
            <Title level={5}>{item.nameRu || item.nameEn}</Title>
            <Paragraph strong>{item.rating}</Paragraph>
            <Paragraph type={'danger'}>{item.year}</Paragraph>
            <Paragraph italic>{item.genres.map(f => f.genre + ' ')}</Paragraph>
            <Text type={"secondary"}>{item.countries.map(f => f.country + ' ')}</Text>
        </Card>
    </>
}

type PropsType = {
    item: TopFilmsType
    isFetching: boolean
}