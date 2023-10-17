import './basketItem.scss';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import { TBasketItem } from '../../types/Types';

const BasketItem = ({
	title,
	thumbnail,
	price,
	memory,
	counter,
	color,
	onChangeCountInc,
	onChangeCountDec,
	onDelete
}: TBasketItem) => {
	return (
		<div className='basket_iphone-item'>
			<div className='basket_iphone-item_main-info'>
				<img src={thumbnail} alt={title} />
				<div className='infoPhone'>
					<h4>{title}</h4>
					<span>
						{memory} {color.name}
					</span>
				</div>
			</div>
			<div className='basket_iphone-item_selectors'>
				<div className='basket-selectors-counter'>
					<img src={minus} alt='minus' onClick={onChangeCountDec} />
					<span className='counter'>{counter}</span>
					<img src={plus} alt='plus' onClick={onChangeCountInc} />
				</div>
				<div className='basket-selectors-delete' onClick={onDelete}>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M1 17L17 1.00002' stroke='#364637' />
						<path d='M1 1L17 17' stroke='#364637' />
					</svg>
				</div>
				<h5 className='basket-selectors-price'>{price * counter} руб</h5>
			</div>
		</div>
	);
};
export default BasketItem;
