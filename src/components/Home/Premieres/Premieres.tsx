import {Button, Card, Carousel, Image, Typography} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectError, selectPremieres} from "../../../app/selectors/homePageSelector";
import {getPremieres} from "../../../app/homePage";
import styles from "../Home.module.css";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const {Title, Paragraph, Text} = Typography;
const {Meta} = Card;

export const Premieres = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const premieres = useAppSelector(selectPremieres);
    const error = useAppSelector(selectError);

    useEffect(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];

        dispatch(getPremieres({year, month}));
        setLoading(false);
    }, [])


    const settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        pauseOnHover: true,
        //lazyLoad: true,
        arrows: true,
        dots: false,
        nextArrow: <ArrowNext/>,
        prevArrow: <ArrowPrev/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return <div style={{marginBottom: '30px'}}>
        <Title>Премьеры</Title>
        {error === null ?
            <Carousel {...settings}>
                {/*{premieres.map((p, index) => <Item key={index} item={p}/>)}*/}
                {premieres.map((f, index) =>
                    <Card hoverable key={index} loading={loading} onClick={() => navigate(`/film/${f.kinopoiskId}`)}
                          cover={<Image alt="Poster"
                                        fallback={'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq'}
                                        src={loading ? 'https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq' : f.posterUrl}
                                        preview={false}/>}>
                        <Meta title={f.nameRu || f.nameEn} style={{marginBottom: '20px'}}/>
                        <Paragraph type={'success'}>{f.year}</Paragraph>
                        <Paragraph strong>{f.duration} минут</Paragraph>
                        <Paragraph italic>{f.genres.map(f => f.genre + ' ')}</Paragraph>
                        <Text type={"secondary"}>{f.countries.map(f => f.country + ' ')}</Text>
                    </Card>
                )}
            </Carousel>
            : error
        }
    </div>;
}

const ArrowNext = (props: any) => {
    const {onClick} = props;
    return <Button className={styles.button} style={{right: '10px', transform: 'translate(50%, -50%)'}}
                   onClick={onClick} size={'large'} shape="circle" icon={<RightOutlined/>}/>
}
const ArrowPrev = (props: any) => {
    const {onClick} = props;
    return <Button className={styles.button} style={{left: '10px', transform: 'translate(-50%, -50%)'}}
                   onClick={onClick} size={'large'} shape="circle" icon={<LeftOutlined/>}/>
}
/*
const Item: FC<CardPropsType> = React.memo(({item}) => {
    const navigate = useNavigate();

    return (
        <Card hoverable>
            <div onClick={() => navigate(`/film/${item.kinopoiskId}`)} className={styles.item}
                 style={{margin: '0 10px'}}>*
            <div className={styles.poster}>
                <img src={item.posterUrlPreview} alt="Poster"/>
            </div>
            <div className={styles.name}>{item.nameRu}</div>
            <div>
                <span className={styles.year}>{item.year}, </span>
                <span>
					{item.genres.map((g, index) =>
                        <span key={index} className={styles.genre}>{g.genre + ' '}</span>
                    )}
				</span>
            </div>
            </div>
        </Card>
    )
})

type CardPropsType = {
    item: PremieresType
}
*/