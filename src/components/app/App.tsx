import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFoter';
import Spiner from '../spiner/Spiner';

const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const ShopPage = lazy(() => import('../pages/shopPage/ShopPage'));
const ItemPage = lazy(() => import('../pages/itemPage/ItemPage'));
const BasketPage = lazy(() => import('../pages/basketPage/BasketPage'));
const TradeIn = lazy(() => import('../pages/tradeInPage/TradeIn'));

const App: React.FC = () => {
	return (
		<Router>
			<div className='App'>
				<AppHeader />
				<main>
					<Suspense fallback={<Spiner />}>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/:model' element={<ShopPage />} />
							<Route path='/:model/:title' element={<ItemPage />} />
							<Route path='/trade_in' element={<TradeIn />} />
							<Route path='/basket' element={<BasketPage />} />
							{/* <Route path="404" element={} /> */}
						</Routes>
					</Suspense>
				</main>
				<AppFooter />
			</div>
		</Router>
	);
};

export default App;
