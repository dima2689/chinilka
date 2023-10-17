import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { filters, Iphone, displayType } from '../types/Types';
import { RootState } from './store';

const iphonsAdater = createEntityAdapter<Iphone>();

type iphoneAdaterType = {
	iphonsLoadingStatus: 'idle' | 'loading' | 'error',
	menuType: displayType
	entities: {}
	ids: []
}

const initialState = {
	entities: {},
    ids: [],
	iphonsLoadingStatus: 'idle',
	menuType: 'slider'
} as iphoneAdaterType

export const fetchIphons = createAsyncThunk<Iphone[], string>(
	'iphons/fetchIphons',
	async (modelIphon) => {
		return await axios
			.get('https://d5d2701mecin7jur8alg.apigw.yandexcloud.net/stock')
			.then((data) => data.data.filter((el:Iphone ) => modelIphon === el.model));
	}
);

const iphonsSlice = createSlice({
	name: 'iphons',
	initialState,
	reducers: {
		changeDisplay: (state, {payload}: PayloadAction<displayType>) => {
			state.menuType = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIphons.pending, (state) => {
				state.iphonsLoadingStatus = 'loading';
			})
			.addCase(fetchIphons.fulfilled, (state, { payload }) => {
				state.iphonsLoadingStatus = 'idle';
				iphonsAdater.setAll(state, payload);
			})
			.addCase(fetchIphons.rejected, (state) => {
				state.iphonsLoadingStatus = 'error';
			});
	}
});

const { reducer, actions } = iphonsSlice;

export const { selectAll } = iphonsAdater.getSelectors<RootState>((state) => state.iphons);

export default reducer;

export const filteredIphoneSelector= createSelector(
	[selectAll,
	(state => state.filters)],
	(iphons, filter: filters) => {
		return iphons.filter(
			({ color, price, memory }) =>
				(color.name === filter.filterColor || filter.filterColor === 'none') &&
				filter.filterCoast.ot < price &&
				filter.filterCoast.do > price &&
				(filter.filterMemory === memory || filter.filterMemory === 'none')
		);
	}
);

export const {
	changeDisplay
} = actions;
