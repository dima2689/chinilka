import basket from '../../assets/icons/akar-icons_basket_white.svg';
import './itemIphone.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';
import { basketAddItem, getAllItemsId } from '../../store/basketSlice';
import { TonAddItem } from '../../types/Types';

const ItemIphone = (props: any) => {
	const { title, memory, color, thumbnail, stock, model, price, id } = props;
	const routerName = title.replace(/ /g, '_');
	const basketInfo = useAppSelector(getAllItemsId);
	const dispatch = useAppDispatch();

	const onAddItem: TonAddItem = (obj) => {
		dispatch(basketAddItem(obj));
	};

	return (
		<div className='Iphone_item'>
			<Link to={`/${model}/${routerName}`}>
				<img className='Iphone_item_thumbnail' src={thumbnail} alt={model} />
			</Link>
			<div className='Iphone_item_info'>
				<h5>{title}</h5>
				<span className='Iphone_item_info-specifications'>
					{memory} {color.name}
				</span>
				<span className='Iphone_item_info-number'>На складе: {stock}шт</span>
			</div>
			<div className='Iphone_item_pay'>
				<div className='Iphone_item_pay_price'>
					<span>{price}</span> руб
				</div>
				<button
					className='Iphone_item_pay_basket'
					onClick={() => onAddItem({ ...props, counter: 1 })}
					disabled={basketInfo.includes(id) ? true : false}
				>
					<img src={basket} alt='basket' />
					<span>{basketInfo.includes(id) ? 'В корзине' : 'В корзину'}</span>
				</button>
			</div>
		</div>
	);
};

export default ItemIphone;
