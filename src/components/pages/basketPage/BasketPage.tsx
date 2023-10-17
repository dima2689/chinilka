import './basketPage.scss';
import AppBack from '../../appBack/AppBack';
import BasketItem from '../../basketItem/BasketItem';
import BasketForm from '../../basketForm/BasketForm';
import BasketOrdered from '../../basketOrdered/BasketOrdered';

import { selectAll } from '../../../store/basketSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/tsHooks';
import React, { useEffect, useState } from 'react';

import {
	basketRemoveItem,
	basketUpdateItem,
	basketSetTotal
} from '../../../store/basketSlice';
import { calcAmount } from '../../../store/basketSlice';
import { Iphone } from '../../../types/Types';
import store from '../../../store/store';

const BasketPage: React.FC = () => {
	const [itemsArray, setItemsArray] = useState<Iphone[]>();
	const [status, SetStatus] = useState<boolean>(false);
	const amount = useAppSelector(calcAmount); //Кастомный селектор возвращает общую сумму корзины
	const dispatch = useAppDispatch();

	useEffect(() => {
		setItemsArray(selectAll(store.getState()));
		dispatch(basketSetTotal(amount));
		// eslint-disable-next-line
	}, [amount]);

	const onDelete = (obj: { id: number | string }) => {
		dispatch(basketRemoveItem(obj));
		// eslint-disable-next-line
	};

	type changer = Pick<Iphone, 'counter' | 'id' | 'stock'>;

	const onChangeCountInc = ({ counter, id, stock }: changer) => {
		if (stock > counter) {
			dispatch(basketUpdateItem({ id: id, changes: { counter: counter + 1 } }));
		}
	};
	const onChangeCountDec = (el: Iphone) => {
		const { counter, id } = el;
		if (counter > 1) {
			dispatch(basketUpdateItem({ id: id, changes: { counter: counter - 1 } }));
		} else {
			onDelete({ id });
		}
	};

	const renderItems = (arr: Iphone[]) => {
		if (arr && arr.length) {
			return arr.map((el) => {
				return (
					<BasketItem
						key={el.id}
						onDelete={() => onDelete({ id: el.id })}
						{...el}
						onChangeCountInc={() => onChangeCountInc(el)}
						onChangeCountDec={() => onChangeCountDec(el)}
					/>
				);
			});
		} else {
			return false;
		}
	};

	const items = itemsArray ? renderItems(itemsArray) : [];

	return (
		<section className='basket-section'>
			<div className='container'>
				<AppBack />
				{status ? <BasketOrdered /> : null}
				<h2 className='basket_title'>Корзина</h2>
				<div className='basket_items-wrp'>
					{items ? items : <h1 className='basket-empty'>Корзина пуста</h1>}
				</div>
				<div
					className='basket_amount'
					style={amount ? { display: 'table' } : { display: 'none' }}
				>
					<span>Итог:</span> <span>{amount} руб</span>
				</div>
				{items ? (
					<BasketForm SetStatus={() => SetStatus(true)} items={items} />
				) : null}
			</div>
		</section>
	);
};

export default BasketPage;
