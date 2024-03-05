import { useHttp } from "../../hooks/http.hook";

import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

/* const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
} */

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle'
});


export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	() => {
		const { request } = useHttp();
		return request("http://localhost:3001/heroes")
	}
);

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		/* heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
		heroesFetched: (state, action) => {
			state.heroesLoadingStatus = 'idle';
			state.heroes = action.payload;
		},
		heroesFetchingError: state => { state.heroesLoadingStatus = 'error' }, */
		heroAdd: (state, action) => heroesAdapter.addOne(state, action.payload),
		/* { state.heroes.push(action.payload) } */
		heroDeleted: (state, action) => heroesAdapter.removeOne(state, action.payload)
		/* { state.heroes = state.heroes.filter(item => item.id !== action.payload) } */
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = 'idle';
				heroesAdapter.setAll(state, action.payload)
				/* state.heroes = action.payload */
			})
			.addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
			.addDefaultCase(() => { })
	}
})

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesCreator = createSelector(
	state => state.filters.activeFilter,
	selectAll,
	(filter, heroes) => {
		if (filter === 'all') {
			return heroes;
		} else {
			return heroes.filter(item => item.element === filter)
		}
	}
)

export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroAdd,
	heroDeleted
} = actions;