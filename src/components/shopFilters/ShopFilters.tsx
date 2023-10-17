import './shopFilters.scss';

import AppBack from '../appBack/AppBack';
import { MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';

import {
	filterChangeDisplay,
	filterChangeCoast,
	filterChangeMemory,
	filterChangeColor,
	filterReset
} from '../../store/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';
import { TIphone } from '../../types/Types';

const ShopFilters = ({ iphon }: { iphon: string }) => {
	const [model, setModel] = useState<TIphone>();
	const [filterMemory, setFilterMemory] = useState<string>();
	const [filterColor, setFilterColor] = useState<string>();
	const [PriceOt, setPriceOt] = useState<number>(NaN);
	const [PriceDo, setPriceDo] = useState<number>(NaN);
	const { filterDisplay } = useAppSelector((state) => state.filters);
	const dispathc = useAppDispatch();

	useEffect(() => {
		dispathc(filterReset());
		// eslint-disable-next-line
	}, []);

	const resetFiltersMenu = () => {
		dispathc(filterReset());
		setFilterColor('');
		setFilterMemory('');
		setPriceOt(NaN);
		setPriceDo(NaN);
	};

	useEffect(() => {
		axios
			.get('https://d5d2701mecin7jur8alg.apigw.yandexcloud.net/iphons')
			.then((data) =>
				setModel(
					data.data.filter((el: TIphone) => {
						return el.name === iphon;
					})[0]
				)
			)
			.catch((err) => console.log(err));
		// eslint-disable-next-line
	}, []);

	const onChangeMemory = (
		e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
	) => {
		setFilterMemory(
			e.currentTarget.textContent ? e.currentTarget.textContent : ''
		);
		dispathc(filterChangeMemory(e.currentTarget.textContent));
	};

	const onChangeColor = (el: string) => {
		setFilterColor(el);
		dispathc(filterChangeColor(el));
	};

	const onChangeCoast = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(PriceOt);

		if (typeof PriceOt == 'number' && typeof PriceDo == 'number') {
			dispathc(
				filterChangeCoast({
					ot: PriceOt >= 0 ? PriceOt : 0,
					do: PriceDo > 5 ? PriceDo : 999999
				})
			);
		}
	};

	const renderMemory = (obj: TIphone) => {
		// Обернуть в usecallback
		if (obj) {
			return obj.memory.map((el, id) => {
				return (
					<div
						className='filter_memory_item'
						style={
							filterMemory === el ? { border: '1px solid #3522B0' } : undefined
						}
						key={id}
						onClick={(e) => onChangeMemory(e)}
					>
						{el}
					</div>
				);
			});
		} else {
			return null;
		}
	};

	const renderColor = (obj: TIphone) => {
		// Обернуть в usecallback
		if (obj) {
			return obj.color.map((el, id) => {
				const style = {
					backgroundColor: el.color,
					border: filterColor === el.name ? '1px solid #3522B0' : undefined
				};
				return (
					<div
						key={id}
						className='filter_color_item'
						style={style}
						onClick={() => onChangeColor(el.name)}
					></div>
				);
			});
		} else {
			return null;
		}
	};

	const memoryItem = model ? renderMemory(model) : [];
	const colorsItem = model ? renderColor(model) : [];
	return (
		<div className='aside'>
			<AppBack />
			<div className='filters'>
				<div className='filters_select'>
					<select
						className='filters_select-select filterItem'
						name='select-element'
						value={filterDisplay}
						onChange={(e) => {
							dispathc(filterChangeDisplay(e.target.value));
						}}
					>
						<option>По умолчанию</option>
						<option>Цены: по возрастанию</option>
						<option>Цены: по убыванию</option>
					</select>
				</div>
				<div className='filters_price filterItem'>
					<form
						name='filters_price'
						className='filters_price_form'
						onSubmit={(e) => onChangeCoast(e)}
					>
						<label htmlFor='filters_price' className='filter_title'>
							Стоимость
						</label>
						<div className='filters_price_form-inputs'>
							<input
								onChange={(e) =>
									setPriceOt(e.target.value ? +e.target.value : NaN)
								}
								type='number'
								name='ot'
								placeholder='От'
								value={PriceOt}
							/>
							<input
								onChange={(e) =>
									setPriceDo(e.target.value ? +e.target.value : NaN)
								}
								type='number'
								name='do'
								placeholder='До'
								value={PriceDo}
							/>
						</div>
						<button type='submit' className='filters_price_form-btn'>
							Показать
						</button>
					</form>
				</div>
				<div className='filters_memmory filterItem'>
					<span className='filter_title'>Объём памяти</span>
					<div className='filters_memmory-grid'>{memoryItem}</div>
				</div>
				<div className='filters_colors filterItem'>
					<span className='filter_title'>Цвет</span>
					<div className='filters_colors-grid'>{colorsItem}</div>
				</div>
				<div className='filters_reset-filters'>
					<div className='filters_reset-filters_btn' onClick={resetFiltersMenu}>
						Cбросить фильтры
					</div>
				</div>
			</div>
		</div>
	);
};
export default ShopFilters;
