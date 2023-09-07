import React, { FC, lazy } from 'react';
import { HomePage } from './components/Home/HomePage'
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useAppSelector } from "./app/store";
import { useDispatch } from "react-redux";
import { changeCurrentPage } from "./app/appInit";
import Item from "./components/Item";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import './App.scss'
import FilmsPage from "./components/FilmsPage/";

// const FilmsPage = lazy(() =>
// 	import('./components/FilmsPage')
// 		.then(({ FilmsPage }) => ({ default: FilmsPage })),
// );
//const ItemPage = React.lazy(() => import('./components/Item/Item'));

const { Header, Content, Footer } = Layout;


export const App = () => {
	return (
		<>
			<Routes>
				<Route path={'/'} element={<AntdLayout />}>
					<Route index path={'/'} element={<HomePage />} />
					<Route path={'films'} element={<FilmsPage />} />
					<Route path={'film/:filmId'} element={<Item />} />
					<Route path={'*'} element={<div>404</div>} />
				</Route>
			</Routes>
		</>
	)
}

const AntdLayout = () => {
	const current = useAppSelector(state => state.mainApp.currentPage);
	const dispatch = useDispatch<any>();

	const items: MenuProps['items'] = [
		{
			label: (
				<Link to={'/'}>Главная</Link>
			),
			key: 'home',
			icon: <HomeOutlined />
		},
		{
			label: (
				<Link to={'/films'}>Фильмы</Link>
			),
			key: 'films',
		},
	]

	const onClick: MenuProps['onClick'] = (e) => {
		//@ts-ignore
		dispatch(changeCurrentPage(e.key));
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: "#fff" }}>
				<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
			</Header>
			<Content>
				<Layout style={{ maxWidth: '1270px', margin: '0 auto', padding: '50px 15px' }}>
					<Outlet />
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created blabla</Footer>
		</Layout>
	)
}