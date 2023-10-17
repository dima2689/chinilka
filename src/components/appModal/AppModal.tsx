import React, { useState } from 'react';
import { propsAppModal } from '../../types/Types';
import './appModal.scss';

const AppModal: React.FC<propsAppModal> = ({ active, setActive }) => {
	const [phone, setPhone] = useState('');
	const [err, setErr] = useState(false);
	const [type, setType] = useState('default');
	type eventForm =
		| React.FormEvent<HTMLFormElement>
		| React.MouseEvent<HTMLDivElement, MouseEvent>;

	const closeOverlay = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		if ((e.target as HTMLElement).classList[0] === 'modal-overlay') {
			setActive(false);
		}
	};

	const onGetOrder = (e: eventForm) => {
		e.preventDefault();
		if (phone.length === 11) {
			setType('ordered');
			setPhone('');
			setErr(false);
		} else {
			setErr(true);
		}
	};

	const renderText = (type: string) => {
		if (type === 'ordered') {
			return (
				<>
					<h2>Спасибо за заказ, наш оператор свзяжется с вами</h2>
					<button className='cancel-ord' onClick={() => setActive(false)}>
						Закрыть
					</button>
				</>
			);
		} else {
			return (
				<>
					<h2>Один звонок и айфон уже у вас!</h2>
					<p>
						Просто оставьте свой номер телефона, мы перезвоним в течении 15
						минут
					</p>
					<form action='none' onSubmit={(e) => onGetOrder(e)}>
						<input
							type='number'
							placeholder='+7(___)-(___)-(__)-(__)'
							min={11}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							style={!err ? undefined : { border: '1px solid red' }}
						/>
						<div className='overlay_btns'>
							<button className='submit-order' type='submit'>
								Заказать
							</button>
							<button className='cancel' onClick={() => setActive(false)}>
								Отмена
							</button>
						</div>
					</form>
				</>
			);
		}
	};

	const txt = renderText(type);
	return (
		<div
			className='modal-overlay'
			style={active ? { display: 'flex' } : { display: 'none' }}
			onClick={(e) => closeOverlay(e)}
		>
			<div className='modal-overlay_content'>{txt}</div>
		</div>
	);
};

export default AppModal;
