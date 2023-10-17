import './shopPage.scss';
import ShopFilters from '../../shopFilters/ShopFilters';
import ItemIphone from '../../itemIphone/ItemIphone';
import { useAppDispatch, useAppSelector } from '../../../hooks/tsHooks';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
	fetchIphons,
	filteredIphoneSelector
} from '../../../store/iphonsSlice';
import React from 'react';
import { Iphone } from '../../../types/Types';

const ShopPage: React.FC = () => {
	const { model } = useParams();
	const routerName =
		typeof model == 'string' ? model.replace(/_/g, ' ') : 'none';
	const dispatch = useAppDispatch();
	const { iphonsLoadingStatus } = useAppSelector((state) => state.iphons);
	const { filterDisplay } = useAppSelector((state) => state.filters);
	const iphons = useAppSelector(filteredIphoneSelector);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchIphons(routerName));
		// eslint-disable-next-line
	}, []);

	const sortArray = (arr: Iphone[]) => {
		switch (filterDisplay) {
			case 'Цены: по возрастанию': {
				return arr.sort((a, b) => a.price - b.price);
			}
			case 'Цены: по убыванию': {
				return arr.sort((a, b) => b.price - a.price);
			}
			default: {
				return arr;
			}
		}
	};

	const renderIphons = (arr: Iphone[]) => {
		if (iphonsLoadingStatus === 'idle' && arr.length > 0) {
			//Проверяем загрузились ли телефоны
			return sortArray(arr).map((props) => {
				return <ItemIphone key={props.id} {...props} model={model} />;
			});
		} else {
			return (
				<h1 className='ErrorMassage_not-found'>
					Ничего не найдено по вашим фильтрам((
				</h1>
			);
		}
	};

	const renderIphon = renderIphons(iphons);
	return (
		<>
			<Helmet>
				<meta name='description' content='Products page' />
				<title>{routerName}</title>
			</Helmet>
			<div className='container'>
				<div className='item_page'>
					<ShopFilters iphon={routerName} />
					<div className='item_page_shop-wrp'>
						<h2>{routerName}</h2>
						<div className='items_grid'>{renderIphon}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShopPage;
