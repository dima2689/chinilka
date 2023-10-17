import './basketOrdered.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/tsHooks';
import { basketReset } from '../../store/basketSlice';
import { Link } from 'react-router-dom';

const BasketOrdered = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(basketReset());
	});

	return (
		<div className='ordered'>
			<h2>Данные отправленны ожидайте звонка от оператора!</h2>
			<Link to={`/`} className='go-back'>
				Вернуться на главную!
			</Link>
		</div>
	);
};

export default BasketOrdered;
