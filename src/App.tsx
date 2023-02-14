import React, {FC, useEffect} from 'react';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import './App.scss'
import {HomePage} from './components/Home/HomePage'
import {FilmsPage} from './components/Content/Content'
import {Item} from './components/Item/Item'
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {useAppSelector} from "./app/store";
import {useDispatch} from "react-redux";
import {changeCurrentPage} from "./app/appInit";

const {Header, Content, Footer} = Layout;

export const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<AntdLayout/>}>
                    <Route index path={'/'} element={<HomePage/>}/>
                    <Route path={'films'} element={<FilmsPage/>}/>
                    <Route path={'film/:filmId'} element={<Item/>}/>
                    <Route path={'*'} element={<div>404</div>}/>
                </Route>
            </Routes>
        </>
    )
}

const AntdLayout: FC = () => {
    const current = useAppSelector(state => state.mainApp.currentPage);
    const dispatch = useDispatch<any>();

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to={'/'}>Главная</Link>
            ),
            key: 'home',
            icon: <HomeOutlined/>
        },
        {
            label: (
                <Link to={'/films'}>Фильмы</Link>
            ),
            key: 'films',
        },
    ]

    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(changeCurrentPage(e.key));
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', backgroundColor: "#fff"}}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
            </Header>
            <Content>
                <Layout style={{maxWidth: '1270px', margin: '0 auto', padding: '50px 15px'}}>
                    <Outlet/>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created blabla</Footer>
        </Layout>
    )
}