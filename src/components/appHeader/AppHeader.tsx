import './appHeader.scss';
import { Link } from 'react-router-dom';

import AppModal from '../appModal/AppModal';
import { useAppSelector } from '../../hooks/tsHooks';


import map from '../../assets/icons/bx_map.svg';
import phone from '../../assets/icons/ci_phone-outline.svg';
import time from '../../assets/icons/access-time.svg';

import { selectAll } from '../../store/basketSlice';

import { useState } from 'react';
import React from 'react';

const AppHeader: React.FC = () => {
	const [active, setActive] = useState(false);
	const [infoType, setinfoType] = useState<string | null>(null);
	const items = useAppSelector(selectAll);

	const infoState = {
		phone: '+7(927)-900-55-61',
		address: 'г.Самара ул. Авроры 109',
		workTime: 'Пн-Пт 10:00 - 20:00 Сб-Вс 10:00 - 18:00'
	};

	const renderInfoForPhone = () => {
		const data = () => {
			switch (infoType) {
				case 'phone':
					return (
						<div className='mobileInfo-items-phone'>
							<span className='phone_number'>{infoState.phone}</span>
							<span
								className='phone_call mobile-type'
								onClick={() => {
									setActive(true);
								}}
							>
								Обратный звонок
							</span>
						</div>
					);
				case 'address':
					return <span className='info-item'>{infoState.address}</span>;
				case 'time':
					return <span className='info-item'>{infoState.workTime}</span>;
				default:
					return;
			}
		};
		if (window.screen.width < 720 && infoType) {
			const blockInfo = data();
			return (
				<div
					className='info_for_phone'
					style={infoType === null ? { display: 'none' } : { display: 'flex' }}
					onClick={() => setinfoType(null)}
				>
					{blockInfo}
				</div>
			);
		} else {
			return;
		}
	};

	return (
		<header>
			<AppModal active={active} setActive={setActive} />
			<div className='container'>
				<div className='appHeader'>
					<Link to={`/`} className='logo'>
						<img src={logo} alt='logo' />
						<span className='logo_txt'>Чинилка</span>
					</Link>
					<div className='header-item' onClick={() => setinfoType('address')}>
						<img src={map} alt='map' />
						<span className='head_info info'>{infoState.address}</span>
					</div>
					<div className='header-item' onClick={() => setinfoType('phone')}>
						<img src={phone} alt='phone' />
						<div className='phone_info info'>
							<span className='phone_number'>{infoState.phone}</span>
							<span
								className='phone_call'
								onClick={() => {
									setActive(true);
								}}
							>
								Обратный звонок
							</span>
						</div>
					</div>
					<div className='header-item' onClick={() => setinfoType('time')}>
						<img src={time} alt='time' />
						<span className='time_info info'>{infoState.workTime}</span>
					</div>
					<Link to={`/basket`} className='basket'>
						<div className='basket-info'>
							{items.length > 0 ? (
								<span className='basket-counter'>{items.length}</span>
							) : null}
							<svg
								width='27'
								height='27'
								viewBox='0 0 27 27'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M2.59875 12.6472C2.55739 12.4814 2.55435 12.3084 2.58986 12.1412C2.62537 11.9741 2.69849 11.8172 2.80367 11.6825C2.90886 11.5479 3.04334 11.4389 3.19691 11.364C3.35048 11.289 3.51911 11.25 3.69 11.25H23.31C23.4809 11.25 23.6495 11.289 23.8031 11.364C23.9567 11.4389 24.0911 11.5479 24.1963 11.6825C24.3015 11.8172 24.3746 11.9741 24.4101 12.1412C24.4456 12.3084 24.4426 12.4814 24.4012 12.6472L22.3639 20.7956C22.2422 21.2824 21.9613 21.7145 21.5659 22.0233C21.1704 22.3321 20.6831 22.4999 20.1814 22.5H6.81862C6.31688 22.4999 5.82956 22.3321 5.43412 22.0233C5.03867 21.7145 4.75779 21.2824 4.63612 20.7956L2.59875 12.6484V12.6472Z'
									stroke='#3522B0'
									strokeWidth='2'
									strokeLinejoin='round'
								/>
								<path
									d='M10.125 15.75V18M16.875 15.75V18M6.75 11.25L11.25 4.5M20.25 11.25L15.75 4.5'
									stroke='#3522B0'
									strokeWidth='2'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					</Link>
				</div>
				{renderInfoForPhone()}
			</div>
		</header>
	);
};

export default AppHeader;
