import omgImg from '../../assets/smiles/omg.png';
import { Link } from 'react-router-dom';
import './mainOffer.scss';

const MainOffer = () => {
	return (
		<section>
			<div className='container'>
				<div className='mainOffer'>
					<div className='mainoffer_block-offer'>
						<div className='mainoffer_block-offer_txt'>
							<h2>Здесь продают яблоки и ремонтируют !</h2>
							<p>
								Мы открылись совсем недавно, но уже готовы радовать вас ценами и
								высоким сервисом!
							</p>
						</div>
						<img
							className='mainoffer_block-offer_img'
							src={omgImg}
							alt='omgImg'
						/>
					</div>
					<Link to={`/iPhone_12`} className='mainoffer_block_popular'>
						<div className='popular-sticker'>
							<span>Популярное</span>
						</div>
						<div className='mainoffer_block_popular_txt'>
							<h4>Iphone 12</h4>
							<p>
								Смартфон iPhone 12 64Gb Чёрный имеет огромный дисплей Super
								Retina XDR c диагональю 6,1 дюйма...
							</p>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default MainOffer;
