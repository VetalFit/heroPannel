import { createReducer } from "@reduxjs/toolkit"
import {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroAdd,
	heroDeleted
} from "../actions";

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, {
	[heroesFetching]: state => { state.heroesLoadingStatus = 'loading' },
	[heroesFetched]: (state, action) => {
		state.heroesLoadingStatus = 'idle';
		state.heroes = action.payload;
	},
	[heroesFetchingError]: state => { state.heroesLoadingStatus = 'error' },
	[heroAdd]: (state, action) => { state.heroes.push(action.payload) },
	[heroDeleted]: (state, action) => { state.heroes = state.heroes.filter(item => item.id !== action.payload) }
},
	[],
	state => state)

/* const heroes = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading'
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HERO_ADD':
			return {
				...state,
				heroes: [...state.heroes, action.payload]
			}
		case 'HERO_DELETED':
			return {
				...state,
				heroes: state.heroes.filter(item => item.id !== action.payload)
			}
		default: return state
	}
} */

export default heroes;