import './itemInfo.scss';
// import { Link } from 'react-router-dom';

import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';

import { basketAddItem } from '../../store/basketSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

import { getAllItemsId } from '../../store/basketSlice';
import AppModal from '../appModal/AppModal';

import { useState } from 'react';
import { useEffect } from 'react';
import { Iphone } from '../../types/Types';

import InnerImageZoom from 'react-inner-image-zoom';

const ItemInfo = (props: Iphone) => {
	const dispatch = useAppDispatch();
	const { title, memory, color, thumbnail, stock, price, id } = props;
	const [counter, setCounter] = useState(1);
	const [addStauts, setaddStauts] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const basketInfo = useAppSelector(getAllItemsId);
	const [screenImgSize, setScreenImgSize] = useState({
		width: 485,
		height: 535,
		zoomWidth: 0.9
	});

	const changeImgSize = () => {
		if (window.screen.width < 1170) {
			setScreenImgSize({
				width: window.screen.width > 720 ? 329 : 282,
				height: window.screen.width > 720 ? 410 : 352,
				zoomWidth: window.screen.width > 720 ? 300 : 282
			});
		} else {
			setScreenImgSize({
				width: 555,
				height: 535,
				zoomWidth: 0.9
			});
		}
	};

	useEffect(() => {
		changeImgSize();
		window.addEventListener('resize', changeImgSize);
		return () => window.removeEventListener('resize', changeImgSize);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (basketInfo.includes(id)) {
			setaddStauts(true);
		}
		// eslint-disable-next-line
	}, [basketInfo]);

	const incCounter = () => {
		if (counter < stock) {
			setCounter(counter + 1);
		}
	};
	const decCounter = () => {
		if (counter > 1) {
			setCounter(counter - 1);
		}
	};

	const onAddItem = (obj: Iphone) => {
		dispatch(basketAddItem(obj));
	};
	const imgZoomProps = {
		width: screenImgSize.width,
		height: screenImgSize.height,
		zoomWidth: screenImgSize.zoomWidth,
		zoomPosition: 'original',
		img: `${thumbnail}`
	};

	return (
		<div>
			<AppModal active={overlay} setActive={setOverlay} />
			<div
				className='you-add-to-cart'
				style={addStauts ? { display: 'flex' } : { display: 'none' }}
			>
				<span>Вы добавили {title} в корзину</span>
			</div>
			<div className='item_iphone_screen-wrp'>
				<div className='item_iphone_screen-img'>
					<InnerImageZoom
						src={imgZoomProps.img}
						width={imgZoomProps.width}
						height={imgZoomProps.height}
						zoomType='hover'
						zoomScale={imgZoomProps.zoomWidth}
					/>
				</div>
				<div className='screen_info'>
					<h3 className='screen_info-name'>{title}</h3>
					<div className='screen_info-stock-info'>
						<h4 className='screen_info-stock-info_price'>{price} руб.</h4>
						<span className='stock_info'>В наличии - {stock}шт</span>
					</div>
					<div className='screen_info-specifications'>
						<div className='specifications_item'>
							<span className='specifications-title'>Память</span>
							<span className='specifications-specific'>{memory}</span>
						</div>
						<div className='specifications-line'></div>
						<div className='specifications_item'>
							<span className='specifications-title'>Цвет</span>
							<span className='specifications-specific'>{color.name}</span>
						</div>
					</div>
					<div className='screen_info_shop-selectors'>
						<div className='shop-selectors-counter'>
							<img src={minus} alt='minus' onClick={decCounter} />
							<span className='counter'>{counter}</span>
							<img src={plus} alt='plus' onClick={incCounter} />
						</div>
						<div
							className='shop-selectors-oneClick'
							onClick={() => setOverlay(true)}
						>
							Купить в 1 клик
						</div>
						<button
							className='shop-selectors-add-to-cart'
							onClick={() => onAddItem({ ...props, counter })}
							disabled={addStauts}
						>
							<div className='svg-basket'>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M1.92516 9.36831C1.89453 9.24549 1.89228 9.11731 1.91858 8.99349C1.94488 8.86967 1.99904 8.75347 2.07696 8.65371C2.15487 8.55395 2.25449 8.47325 2.36824 8.41773C2.482 8.36222 2.60691 8.33335 2.73349 8.33331H17.2668C17.3934 8.33335 17.5183 8.36222 17.6321 8.41773C17.7458 8.47325 17.8455 8.55395 17.9234 8.65371C18.0013 8.75347 18.0554 8.86967 18.0817 8.99349C18.108 9.11731 18.1058 9.24549 18.0752 9.36831L16.566 15.4041C16.4759 15.7647 16.2678 16.0848 15.9749 16.3136C15.682 16.5423 15.321 16.6666 14.9493 16.6666H5.05099C4.67933 16.6666 4.31836 16.5423 4.02544 16.3136C3.73251 16.0848 3.52445 15.7647 3.43433 15.4041L1.92516 9.36915V9.36831Z'
										stroke='white'
										strokeWidth='1.5'
										strokeLinejoin='round'
									/>
									<path
										d='M7.5 11.6666V13.3333M12.5 11.6666V13.3333M5 8.33331L8.33333 3.33331M15 8.33331L11.6667 3.33331'
										stroke='white'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>
							<span className='add-to-cart-txt'>
								{addStauts ? 'В корзине' : 'Добавить в корзину'}
							</span>
						</button>
					</div>
					<div className='screen_info-credit'>
						<h5>Купите в кредит</h5>
						<div className='credit-info'>
							<p>
								Вы можете купить айфон в кредит, но оно вам надо? Нет, оно вам
								не надо.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemInfo;
