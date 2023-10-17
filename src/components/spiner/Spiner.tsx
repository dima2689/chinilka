import { FireworkSpinner } from 'react-spinners-kit';
import './spiner.scss';

const Spiner = () => {
	return (
		<div className='spiner_wrp container'>
			<FireworkSpinner size={180} color='#3522B0' />
		</div>
	);
};

export default Spiner;
