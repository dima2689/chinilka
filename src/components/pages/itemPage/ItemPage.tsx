import './itemPage.scss';

import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBack from '../../appBack/AppBack';
import Spiner from '../../spiner/Spiner';
import ItemInfo from '../../itemInfo/ItemInfo';
import ItemImgGrid from '../../itemImgGrid/ItemImgGrid';

import { useEffect, useState } from 'react';
import { Iphone } from '../../../types/Types';

const ItemPage = () => {
	const { title } = useParams();
	const routerName = title?.replace(/_/g, ' ');
	const [iphon, setIphon] = useState<Iphone>();

	useEffect(() => {
		axios
			.get('https://d5d2701mecin7jur8alg.apigw.yandexcloud.net/stock')
			.then((data) =>
				setIphon(data.data.filter((el: Iphone) => el.title === routerName)[0])
			)
			.catch((err) => console.log(err));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Helmet>
				<meta name='description' content='Product Information' />
				<title>{routerName}</title>
			</Helmet>
			<section className='item_iphone'>
				<div className='container'>
					<AppBack />
					{iphon ? <ItemInfo {...iphon} /> : <Spiner />}
					{iphon ? <ItemImgGrid iphone={iphon.model} /> : null}
				</div>
			</section>
		</>
	);
};

export default ItemPage;
