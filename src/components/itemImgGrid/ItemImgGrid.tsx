import './itemImgGrid.scss';

import { useEffect, useState } from 'react';
import { useUnsplash } from '../../hooks/useUnsplash';

const ItemImgGrid = ({ iphone }: { iphone: string }) => {
	const [gridType, setGridType] = useState<number>(0);
	const [imgArray, setImgArray] = useState([]);
	const { request, process } = useUnsplash();

	useEffect(() => {
		request(`${iphone}`, 7).then((data) => setImgArray(data));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setGridType(Math.floor(Math.random() * (4 - 1) + 1));
	}, []);

	return (
		<section className='photo_iphons'>
			<div className='container'>
				<h2>Фото (случайные)</h2>
				{process === 'success' ? (
					<GridTypeOne gridType={gridType} arrayImg={imgArray} />
				) : (
					<h1>Ошибка при загрузке картинок</h1>
				)}
			</div>
		</section>
	);
};

const GridTypeOne = ({
	arrayImg,
	gridType
}: {
	arrayImg: any[];
	gridType: number;
}) => {
	const grid = arrayImg.map(({ urls, id }, index) => {
		return (
			<img
				src={urls.regular}
				key={id}
				alt='iphone img'
				className={`img-${index}`}
			/>
		);
	});
	return <div className={`grid-one_img_wrp gridType-${gridType}`}>{grid}</div>;
};

export default ItemImgGrid;
