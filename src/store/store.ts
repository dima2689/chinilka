import { combineReducers, configureStore } from '@reduxjs/toolkit';
import iphons from './iphonsSlice';
import filters from './filtersSlice';
import basket from './basketSlice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['basket']
};

const rootRedusers = combineReducers({
	iphons,
	filters,
	basket
});

const persistedReducer = persistReducer(persistConfig, rootRedusers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}), // Redux-thunk встроен в стандартные мидлвееры!
	devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;

export default store;
