import React, { FC, useEffect, useState } from "react";
import { FilmType } from "../../types/types";
import { changeGenre, getFilms, getGenres } from "../../app/filmsPage";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectFilms, selectGenre, selectIsFetching } from "../../app/selectors/filmsPageSelector";
import { useNavigate } from "react-router-dom";
import { Card, Col, Image, Radio, Row, Spin, Typography } from "antd";
import { changeCurrentPage } from "../../app/appInit";

const { Title, Paragraph, Text } = Typography;

const FilmsPage: FC = React.memo(() => {

	const [currentPage, setCurrentPage] = useState(1);
	const [fetching, setFetching] = useState(true);
	//const [totalPages, setTotalPages] = useState(0);

	const films = useAppSelector(selectFilms);
	const genre = useAppSelector(selectGenre);
	const genres = useAppSelector(state => state.filmsPage.genres);
	const isFetching = useAppSelector(selectIsFetching);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (fetching && currentPage < 6) {
			dispatch(getGenres());
			dispatch(getFilms({ genre, page: currentPage }));
			setCurrentPage(prevState => prevState + 1);
			setFetching(false);
		}
	}, [fetching, genre])


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

	const onChangeGenre = (value: number) => {
		setCurrentPage(1);
		dispatch(changeGenre(value));
		setFetching(true);
	}

	if (!films) return <Spin size={'large'} tip={'Loading'} />

	return (<>
		<Title>Каталог фильмов:</Title>
		<Radio.Group defaultValue={genre} onChange={(e) => onChangeGenre(e.target.value)}
			disabled={fetching} style={{ marginBottom: '20px' }}>
			{
				genres.map(item =>
					<Radio.Button key={item.id} value={item.id}>{item.genre}</Radio.Button>
				)
			}
		</Radio.Group>

		<Row gutter={[{ sm: 8, md: 16, xl: 24 }, { xs: 16, sm: 16, xl: 24 }]}>
			{
				films.map((f, index: number) =>
					<Col key={index} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
						<Cards key={index} film={f} isFetching={isFetching} />
					</Col>
				)
			}
		</Row>
	</>)
})

const Cards: FC<PropsType> = React.memo(({ film, isFetching }) => {
	const navigate = useNavigate();

	return (
		<Card hoverable onClick={() => navigate(`/film/${film.kinopoiskId}`)}
			style={{ height: '100%' }} loading={isFetching}
			cover={<Image alt="Poster"
				fallback={'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq'}
				src={isFetching ? 'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq' : film.posterUrl}
				preview={false} />}>
			<Title level={5}>{film.nameRu || film.nameOriginal}</Title>
			<Paragraph strong>{film.ratingKinopoisk}</Paragraph>
			<Paragraph type={'success'}>{film.year}</Paragraph>
			<Text type={"secondary"}>{film.countries.map(f => f.country + ' ')}</Text>
		</Card>
	)
})


type PropsType = {
	film: FilmType
	isFetching: boolean
}

export default FilmsPage