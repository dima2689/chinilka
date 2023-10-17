import MainOffer from '../../mainOffer/MainOffer';
import MainSlider from '../../mainslider/MainSlider';
import MainAbout from '../../mainAbout/MainAbout';
import { Helmet } from 'react-helmet';

const MainPage = () => {
	return (
		<>
			<Helmet>
				<meta name='description' content="Продажа и ремонт iphone в Самаре" />
				<title>Чинилка - интернет магазин</title>
			</Helmet>
			<div className='Main_page_wrp'>
				<MainOffer />
				<MainSlider />
				<MainAbout />
			</div>
		</>
	);
};

export default MainPage;
