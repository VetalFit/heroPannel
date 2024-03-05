import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtresSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === 'string') {
		return next({
			type: action
		})
	}
	return next(action);
}

const store = configureStore({
	reducer: {
		filters,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production'
})


/* const enhancer = (createStore) => (...args) => {
	const store = createStore(...args)

	const oldDispatch = store.dispatch;
	store.dispatch = (action) => {
		if (typeof action === 'string') {
			return oldDispatch({
				type: action
			})
		}
		return oldDispatch(action)
	}
	return store
} */

/* const store = createStore(
	combineReducers({ heroes, filters }),
	compose(applyMiddleware(thunk, stringMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
); */

export default store;