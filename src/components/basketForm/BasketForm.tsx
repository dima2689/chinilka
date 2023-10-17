import './basketForm.scss';
import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { propsBasketForm } from '../../types/Types';

const BasketForm: React.FC<propsBasketForm> = ({ items, SetStatus }) => {
	const [formType, SetFormType] = useState<string>('');

	const order = items.map(({ props }: any) => {
		return {
			title: props.title,
			counter: props.counter,
			price: props.price,
			total: props.price * props.counter
		};
	});

	const renderForm = (type: string) => {
		switch (type) {
			case 'delivery':
				return (
					<BasketFormDelivery items={order} SetStatus={() => SetStatus(true)} />
				);
			case 'pickup':
				return (
					<BasketFormPickUp items={order} SetStatus={() => SetStatus(true)} />
				);
			default:
				return null;
		}
	};

	const form = renderForm(formType);

	return (
		<>
			<Helmet>
				<meta name='description' content='Shopping cart' />
				<title>Корзина</title>
			</Helmet>
			<div className='basket-form'>
				<h2>Как вам удобно получить товар?</h2>
				<div className='form-type_selector'>
					<div
						className='form-type_selector--delivery'
						onClick={() => SetFormType('delivery')}
					>
						<svg
							width='64'
							height='39'
							viewBox='0 0 64 39'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M21 37.25C22.4587 37.25 23.8576 36.6705 24.8891 35.6391C25.9205 34.6076 26.5 33.2087 26.5 31.75C26.5 30.2913 25.9205 28.8924 24.8891 27.8609C23.8576 26.8295 22.4587 26.25 21 26.25C19.5413 26.25 18.1424 26.8295 17.1109 27.8609C16.0795 28.8924 15.5 30.2913 15.5 31.75C15.5 33.2087 16.0795 34.6076 17.1109 35.6391C18.1424 36.6705 19.5413 37.25 21 37.25V37.25ZM48.5 37.25C49.9587 37.25 51.3576 36.6705 52.3891 35.6391C53.4205 34.6076 54 33.2087 54 31.75C54 30.2913 53.4205 28.8924 52.3891 27.8609C51.3576 26.8295 49.9587 26.25 48.5 26.25C47.0413 26.25 45.6424 26.8295 44.6109 27.8609C43.5795 28.8924 43 30.2913 43 31.75C43 33.2087 43.5795 34.6076 44.6109 35.6391C45.6424 36.6705 47.0413 37.25 48.5 37.25V37.25Z'
								stroke='#3522B0'
								strokeWidth='3'
								strokeMiterlimit='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M26.6375 31.75H40.25V3.15C40.25 2.71239 40.0762 2.29271 39.7667 1.98327C39.4573 1.67384 39.0376 1.5 38.6 1.5H1.75M14.5375 31.75H8.9C8.68332 31.75 8.46876 31.7073 8.26857 31.6244C8.06839 31.5415 7.88649 31.4199 7.73327 31.2667C7.58006 31.1135 7.45852 30.9316 7.3756 30.7314C7.29268 30.5312 7.25 30.3167 7.25 30.1V16.625'
								stroke='#3522B0'
								strokeWidth='3'
								strokeLinecap='round'
							/>
							<path
								d='M4.5 9.75H15.5'
								stroke='#3522B0'
								strokeWidth='3'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M40.25 9.75H55.6775C55.9964 9.75008 56.3085 9.84259 56.576 10.0163C56.8434 10.1901 57.0548 10.4376 57.1845 10.729L62.107 21.806C62.2008 22.0163 62.2495 22.244 62.25 22.4742V30.1C62.25 30.3167 62.2073 30.5312 62.1244 30.7314C62.0415 30.9316 61.9199 31.1135 61.7667 31.2667C61.6135 31.4199 61.4316 31.5415 61.2314 31.6244C61.0312 31.7073 60.8167 31.75 60.6 31.75H55.375M40.25 31.75H43'
								stroke='#3522B0'
								strokeWidth='3'
								strokeLinecap='round'
							/>
						</svg>
						<h2>Доставка к двери</h2>
					</div>
					<div
						className='form-type_selector--pickup'
						onClick={() => SetFormType('pickup')}
					>
						<svg
							width='49'
							height='45'
							viewBox='0 0 49 45'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M9.09562 1.05C9.38315 0.720704 9.74009 0.456332 10.1419 0.275073C10.5437 0.0938147 10.9808 -2.8502e-05 11.4231 6.49345e-09H37.5769C38.0192 -2.8502e-05 38.4563 0.0938147 38.8581 0.275073C39.2599 0.456332 39.6168 0.720704 39.9044 1.05L47.8944 10.182C48.6078 10.9975 49 12.036 49 13.11V13.875C49.0002 15.3599 48.5267 16.8078 47.6458 18.0163C46.7649 19.2247 45.5206 20.1334 44.0868 20.6152C42.6529 21.0971 41.1012 21.1281 39.6485 20.7038C38.1959 20.2796 36.9148 19.4213 35.9844 18.249C35.3049 19.1063 34.4342 19.7999 33.4389 20.2768C32.4436 20.7536 31.3501 21.001 30.2422 21C29.1342 21.0012 28.0406 20.7539 27.0453 20.2771C26.05 19.8002 25.1793 19.1065 24.5 18.249C23.8207 19.1065 22.95 19.8002 21.9547 20.2771C20.9594 20.7539 19.8658 21.0012 18.7578 21C17.6498 21.0012 16.5563 20.7539 15.5609 20.2771C14.5656 19.8002 13.6949 19.1065 13.0156 18.249C12.0852 19.4213 10.8041 20.2796 9.35146 20.7038C7.89878 21.1281 6.34708 21.0971 4.91324 20.6152C3.47941 20.1334 2.23508 19.2247 1.35418 18.0163C0.473284 16.8078 -0.000167208 15.3599 4.42977e-08 13.875V13.11C3.86106e-05 12.036 0.392173 10.9975 1.10556 10.182L9.09869 1.047L9.09562 1.05ZM14.5469 13.875C14.5469 14.969 14.9905 16.0182 15.7802 16.7918C16.5699 17.5654 17.641 18 18.7578 18C19.8746 18 20.9457 17.5654 21.7354 16.7918C22.5251 16.0182 22.9688 14.969 22.9688 13.875C22.9688 13.4772 23.1301 13.0956 23.4172 12.8143C23.7044 12.533 24.0939 12.375 24.5 12.375C24.9061 12.375 25.2956 12.533 25.5828 12.8143C25.8699 13.0956 26.0312 13.4772 26.0312 13.875C26.0312 14.969 26.4749 16.0182 27.2646 16.7918C28.0543 17.5654 29.1254 18 30.2422 18C31.359 18 32.4301 17.5654 33.2198 16.7918C34.0095 16.0182 34.4531 14.969 34.4531 13.875C34.4531 13.4772 34.6145 13.0956 34.9016 12.8143C35.1888 12.533 35.5783 12.375 35.9844 12.375C36.3905 12.375 36.78 12.533 37.0671 12.8143C37.3543 13.0956 37.5156 13.4772 37.5156 13.875C37.5156 14.969 37.9593 16.0182 38.749 16.7918C39.5387 17.5654 40.6098 18 41.7266 18C42.8434 18 43.9144 17.5654 44.7041 16.7918C45.4939 16.0182 45.9375 14.969 45.9375 13.875V13.11C45.9375 12.7525 45.8072 12.4067 45.57 12.135L37.5769 3H11.4231L3.43 12.135C3.1928 12.4067 3.06247 12.7525 3.0625 13.11V13.875C3.0625 14.969 3.50615 16.0182 4.29586 16.7918C5.08556 17.5654 6.15663 18 7.27344 18C8.39025 18 9.46132 17.5654 10.251 16.7918C11.0407 16.0182 11.4844 14.969 11.4844 13.875C11.4844 13.4772 11.6457 13.0956 11.9329 12.8143C12.22 12.533 12.6095 12.375 13.0156 12.375C13.4217 12.375 13.8112 12.533 14.0984 12.8143C14.3855 13.0956 14.5469 13.4772 14.5469 13.875ZM4.59375 22.5C4.99986 22.5 5.38934 22.658 5.67651 22.9393C5.96367 23.2206 6.125 23.6022 6.125 24V42H9.1875V27C9.1875 26.2044 9.51015 25.4413 10.0845 24.8787C10.6588 24.3161 11.4378 24 12.25 24H21.4375C22.2497 24 23.0287 24.3161 23.603 24.8787C24.1773 25.4413 24.5 26.2044 24.5 27V42H42.875V24C42.875 23.6022 43.0363 23.2206 43.3235 22.9393C43.6107 22.658 44.0001 22.5 44.4062 22.5C44.8124 22.5 45.2018 22.658 45.489 22.9393C45.7762 23.2206 45.9375 23.6022 45.9375 24V42H47.4688C47.8749 42 48.2643 42.158 48.5515 42.4393C48.8387 42.7206 49 43.1022 49 43.5C49 43.8978 48.8387 44.2794 48.5515 44.5607C48.2643 44.842 47.8749 45 47.4688 45H1.53125C1.12514 45 0.735658 44.842 0.448493 44.5607C0.161328 44.2794 4.42977e-08 43.8978 4.42977e-08 43.5C4.42977e-08 43.1022 0.161328 42.7206 0.448493 42.4393C0.735658 42.158 1.12514 42 1.53125 42H3.0625V24C3.0625 23.6022 3.22383 23.2206 3.51099 22.9393C3.79816 22.658 4.18764 22.5 4.59375 22.5ZM12.25 42H21.4375V27H12.25V42ZM27.5625 27C27.5625 26.2044 27.8852 25.4413 28.4595 24.8787C29.0338 24.3161 29.8128 24 30.625 24H36.75C37.5622 24 38.3412 24.3161 38.9155 24.8787C39.4898 25.4413 39.8125 26.2044 39.8125 27V36C39.8125 36.7957 39.4898 37.5587 38.9155 38.1213C38.3412 38.6839 37.5622 39 36.75 39H30.625C29.8128 39 29.0338 38.6839 28.4595 38.1213C27.8852 37.5587 27.5625 36.7957 27.5625 36V27ZM36.75 27H30.625V36H36.75V27Z'
								fill='#3522B0'
							/>
						</svg>
						<h2>Самовывоз</h2>
					</div>
				</div>
				<div className='forms'>{form}</div>
			</div>
		</>
	);
};

type formOrder = {
	items: {
		title: string;
		counter: number;
		price: number;
		total: number;
	}[];
	SetStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const BasketFormDelivery = ({ items, SetStatus }: formOrder) => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			street: '',
			house: '',
			section: '',
			apart: '',
			type: 'Выбрать'
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Обязательное поле'),
			email: Yup.string()
				.email('Некорректный почтовый адрес')
				.required('Обязательное поле'),
			phone: Yup.string()
				.matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
				.min(11, 'Неправильный номер')
				// .max(12, 'Неправильный номер')
				.required('Обязательное поле'),
			street: Yup.string().required('Обязательное поле'),
			house: Yup.number().required('Обязательное поле'),
			section: Yup.string(),
			apart: Yup.number(),
			type: Yup.string().required('Выберите способ оплаты')
		}),
		onSubmit: (value) => {
			console.log({ ...value, items: items });
			formik.resetForm();
			SetStatus(true);
		}
	});
	return (
		<div className='delivery-form'>
			<form className='order-form' onSubmit={formik.handleSubmit}>
				<legend>Заполните данные</legend>
				<input
					type='text'
					placeholder='Ваше имя'
					name='name'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
					<div className='form-error'>{formik.errors.name}</div>
				) : null}
				<input
					type='email'
					placeholder='Email'
					name='email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<div className='form-error'>{formik.errors.email}</div>
				) : null}
				<input
					type='text'
					placeholder='Номер телефона'
					name='phone'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
				/>
				{formik.touched.phone && formik.errors.phone ? (
					<div className='form-error'>{formik.errors.phone}</div>
				) : null}
				<input
					type='text'
					placeholder='Улица'
					name='street'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.street}
				/>
				{formik.touched.street && formik.errors.street ? (
					<div className='form-error'>{formik.errors.street}</div>
				) : null}
				<div className='house-wrp'>
					<input
						type='text'
						placeholder='Дом'
						name='house'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.house}
					/>
					<input
						type='number'
						placeholder='Подъезд'
						name='section'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.section}
					/>
					<input
						type='number'
						placeholder='Кв'
						name='apart'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.apart}
					/>
				</div>
				{formik.touched.house && formik.errors.house ? (
					<div className='form-error'>{formik.errors.house}</div>
				) : null}
				<div className='pay-type'>
					<span className='type'>Способ оплаты:</span>
					<select
						id='type'
						name='type'
						value={formik.values.type}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<option value='Выбрать' disabled key='0'>
							Выбрать
						</option>
						<option value='Нал' key='1'>
							Наличные
						</option>
						<option value='Безнал' key='2'>
							Картой
						</option>
					</select>
				</div>
				{formik.touched.type && formik.errors.type ? (
					<div className='form-error'>{formik.errors.type}</div>
				) : null}
				<button className='sub-form' type='submit'>
					Отправить
				</button>
			</form>
		</div>
	);
};

const BasketFormPickUp = ({ items, SetStatus }: formOrder) => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Обязательное поле'),
			email: Yup.string()
				.email('Некорректный почтовый адрес')
				.required('Обязательное поле'),
			phone: Yup.string()
				.matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
				.min(11, 'Неправильный номер')
				// .max(12, 'Неправильный номер')
				.required('Обязательное поле'),
			date: Yup.string().required('Обязательное поле')
		}),
		onSubmit: (value) => {
			console.log({ ...value, items: items });
			formik.resetForm();
			SetStatus(true);
		}
	});
	return (
		<div className='delivery-form'>
			<form className='order-form' onSubmit={formik.handleSubmit}>
				<legend>Заполните данные</legend>
				<input
					type='text'
					placeholder='Ваше имя'
					name='name'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
					<div className='form-error'>{formik.errors.name}</div>
				) : null}
				<input
					type='email'
					placeholder='Email'
					name='email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<div className='form-error'>{formik.errors.email}</div>
				) : null}
				<input
					type='text'
					placeholder='Номер телефона'
					name='phone'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
				/>
				{formik.touched.phone && formik.errors.phone ? (
					<div className='form-error'>{formik.errors.phone}</div>
				) : null}
				<div className='select-day'>
					<span className='type'>Самовывоз:</span>
					<label className='date-type' htmlFor='today'>
						<input
							id='today'
							type='radio'
							name='date'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value='today'
						/>
						<span>Сегодня</span>
					</label>
					<label className='date-type' htmlFor='tomorrow'>
						<input
							id='tomorrow'
							type='radio'
							name='date'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value='tomorrow'
						/>
						<span>Завтра</span>
					</label>
				</div>
				<button className='sub-form' type='submit'>
					Отправить
				</button>
			</form>
		</div>
	);
};

export default BasketForm;
