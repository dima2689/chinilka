import sliderIcon from '../../assets/icons/layout-plit.svg';
import plitIcon from '../../assets/icons/layout-grid.svg';
import tradeIn from '../../assets/img/trade-in-img.png';
import './mainSlider.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';
import { changeDisplay } from '../../store/iphonsSlice';

import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { displayType, TIphone } from '../../types/Types';

const MainSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [data, SetData] = useState<TIphone[]>();
	const dispatch = useAppDispatch();
	const display = useAppSelector((store) => store.iphons.menuType);
	const onChangeDisplay = (type: displayType) => {
		dispatch(changeDisplay(type));
	};

	useEffect(() => {
		axios
			.get('https://d5d2701mecin7jur8alg.apigw.yandexcloud.net/iphons')
			.then((data) => SetData(data.data))
			.catch((err) => console.log(err));
		// eslint-disable-next-line
	}, []);

	return (
		<section>
			<div className='container'>
				<div className='slider' ref={sliderRef}>
					<h2>Айфоны</h2>
					<div className='slider_btns'>
						<div
							className={display === 'plit' ? 'active_slider_btn' : undefined}
							onClick={(e) => onChangeDisplay('plit')}
						>
							<img src={plitIcon} alt='Плитками' />
							<span>Плитками</span>
						</div>
						<div
							className={display === 'slider' ? 'active_slider_btn' : undefined}
							onClick={(e) => onChangeDisplay('slider')}
						>
							<img src={sliderIcon} alt='Слайдером' />
							<span>Слайдер</span>
						</div>
					</div>
				</div>
			</div>
			{display === 'slider' ? (
				<Slider offset={sliderRef.current} data={data} />
			) : (
				<Plite data={data} />
			)}
		</section>
	);
};

const Slider = (props: any) => {
	const [width, setWidth] = useState(428);
	useEffect(() => {
		setWidth(window.screen.width <= 1170 ? 278 : 428);
	}, []);
	const renderItemsSlider = (arr: TIphone[]) => {
		if (arr) {
			return arr.map(({ name, id, thumbnail }) => {
				const routerName = name.replace(/ /g, '_');
				return (
					<SwiperSlide style={{ width: width }} key={id}>
						<div className='slider_item'>
							<img src={thumbnail} alt={name} />
							<div className='slider_item_info'>
								<h4>{name}</h4>
								<Link to={`/${routerName}`} className='slider_item_info-link'>
									Смотреть товары
								</Link>
							</div>
						</div>
					</SwiperSlide>
				);
			});
		}
	};

	const itemsSlider = renderItemsSlider(props.data);
	return (
		<Swiper
			slidesPerView={'auto'}
			spaceBetween={20}
			className='mySwiper'
			slidesOffsetBefore={props.offset ? props.offset.offsetLeft : 200}
		>
			{itemsSlider}
			<SwiperSlide style={{ width: 428 }} key='99'>
				<div className='slider_item'>
					<img src={tradeIn} alt='trade In' />
					<div className='slider_item_info'>
						<h4>Trade-in</h4>
						<Link to={`/trade_in`} className='slider_item_info-link'>
							Расчитать стоимость
						</Link>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	);
};

const Plite = (props: any) => {
	const renderPlit = (arr: TIphone[]) => {
		if (arr) {
			return arr.map(({ name, id, thumbnail }) => {
				const routerName = name.replace(/ /g, '_');
				return (
					<div className='plite_wrp' key={id}>
						<img src={thumbnail} alt={name} />
						<div className='plite_info'>
							<h5>{name}</h5>
							<Link to={`/${routerName}`}>Смотреть товары</Link>
						</div>
					</div>
				);
			});
		}
	};

	const items = renderPlit(props.data);

	return (
		<div className='container'>
			<div className='plite-grid'>
				{items}
				<div className='plite_wrp' key='99'>
					<img src={tradeIn} alt='trade-in' />
					<div className='plite_info'>
						<h5>Trade-in</h5>
						<Link to={`/trade_in`}>Расчитать стоимость</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainSlider;
