import {
	createSlice,
	createEntityAdapter,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
import { Iphone } from '../types/Types';
import { RootState } from './store';

type basketType = {
	basketResult: number,
	entities: {}
	ids: []
}

const basketAdater = createEntityAdapter<Iphone>();

const initialState = basketAdater.getInitialState({
	basketResult: 0
} as basketType);

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		basketAddItem: (state, { payload }: PayloadAction<Iphone>) => {
			basketAdater.addOne(state, payload);
		},
		basketRemoveItem: (state, { payload }: PayloadAction<{id: string | number}>) => {
			basketAdater.removeOne(state, payload.id);
		},
		basketSetTotal: (state, { payload }: PayloadAction<number>) => {
			state.basketResult = payload;
		},
		basketUpdateItem: basketAdater.updateOne,
		basketReset: (state) => {
			state.basketResult = 0;
			basketAdater.removeAll(state);
		}
	}
});

const { actions, reducer } = basketSlice;

export const { selectAll } = basketAdater.getSelectors<RootState>((state) => state.basket);

export default reducer;

export const getAllItemsId = createSelector(selectAll, (iphons) => {
	return iphons.map(({ id }) => {
		return id;
	});
});

export const calcAmount = createSelector(selectAll, (iphons) => {
	let sum = 0;
	iphons.forEach((el) => {
		sum += el.price * el.counter;
	});
	return sum;
});

export const {
	basketAddItem,
	basketRemoveItem,
	basketUpdateItem,
	basketSetTotal,
	basketReset
} = actions;
