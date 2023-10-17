import like from '../../assets/smiles/like.png';
import love from '../../assets/smiles/love.png';
import boom from '../../assets/smiles/boom.png';
import party from '../../assets/smiles/party.png';
import silence from '../../assets/smiles/silenc.png';

import './mainAbout.scss';

const MainAbout = () => {
	return (
		<section>
			<div className='container'>
				<div className='about_us'>
					<h2>О нас</h2>
					<div className='about_us_info'>
						<p>
							Год за
							годом девайсы Apple, в частности iPhone, покоряют сердца миллионов
							людей высокой скоростью работы, мультимедийными возможностями,
							простотой в использовании, лаконичным дизайном и множеством
							полезных опций. Согласно статистическим данным, мобильные
							устройства Apple занимают топовые позиции среди самых
							приобретаемых устройств как в России, так и во всем мире. Компания
							неспроста заслужила всеобщее внимание, поскольку гаджеты не имеют
							аналогов и значительно опережают флагманы других производителей по
							ряду ключевых параметров. Безусловно, продукция компании Apple
							имеет более высокую стоимость, но на это есть весомые основания.
						</p>
						<img src={like} alt='like' />
					</div>
				</div>
				<div className='advantages'>
					<h2>Почему именно мы?</h2>
					<div className='advantages_blocks'>
						<AdvItem
							img={love}
							txt={
								'Мы влюблены в наших клиентов и поэтому у нас превосходный сервис!'
							}
						/>
						<AdvItem
							img={boom}
							txt={
								'Наши цены самые низкие на рынке, найдете дешевле - сделаем скидку'
							}
						/>
						<AdvItem
							img={party}
							txt={
								'Постоянные бонусы и скидки, а постоянным покупателям особые предложения'
							}
						/>
						<AdvItem
							img={silence}
							txt={'Я не придумал еще преимуществ, но я вроде и не копирайтер)'}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

const AdvItem = (props: any) => {
	const { img, txt } = props;
	return (
		<div className='advantages_blocks_item'>
			<img src={img} alt='smile' />
			<p>{txt}</p>
		</div>
	);
};

export default MainAbout;
