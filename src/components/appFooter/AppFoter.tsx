import './appFooter.scss';

import map from '../../assets/icons/bx_map-white.svg';
import phone from '../../assets/icons/ci_phone-outline_white.svg';
import time from '../../assets/icons/access-time_hitw.svg';

import React, { useState } from 'react';
import AppModal from '../appModal/AppModal';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
	const [active, setActive] = useState<boolean>(false);
	return (
		<footer>
			<AppModal active={active} setActive={setActive} />
			<div className='container'>
				
					<h3>Чинилка</h3>
			</div>
				</Link>
				<div className='footer_contacts'>
					<div className='footer-item'>
						<img src={map} alt='map' />
						<span className='head_info info-footer'>
							г.Самара ул. Авроры 109
						</span>
					</div>
					<div className='footer-item'>
						<img src={phone} alt='phone' />
						<div className='phone_info info-footer'>
							<span className='phone_number'>+7(927)-900-55-61</span>
							<span
								className='phone_call-footer'
								onClick={() => {
									setActive(true);
								}}
							>
								Обратный звонок
							</span>
						</div>
					</div>
					<div className='footer-item'>
						<img src={time} alt='time' />
						<span className='time_info info-footer'>
							Пн-Пт 10:00 - 20:00 Сб-Вс 10:00 - 18:00
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
