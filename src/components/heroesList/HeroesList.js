import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './heroesList.scss';

const HeroesList = () => {

	/* 	const filteredHeroesCreator = createSelector(
			state => state.filters.activeFilter,
			state => state.heroes.heroes,
			(filter, heroes) => {
				if (filter === "all") {
					return heroes;
				} else {
					return heroes.filter(item => item.element === filter)
				}
			}
		) */

	const [deleteHero] = useDeleteHeroMutation();

	const {
		data: heroes = [],
		isLoading,
		isFetching,
		isError
	} = useGetHeroesQuery();


	const activeFilter = useSelector(state => state.filters.activeFilter);

	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice();
		if (activeFilter === 'all') {
			return filteredHeroes;
		} else {
			return filteredHeroes.filter(item => item.element === activeFilter)
		}
	}, [heroes, activeFilter])

	const onDelete = useCallback((id) => {
		deleteHero(id);
		// eslint-disable-next-line
	}, [])

	if (isLoading && isFetching) {
		return <Spinner />;
	} else if (isError) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition
					timeout={0}
					classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			)
		}

		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition
					key={id}
					timeout={500}
					classNames="hero">
					<HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filteredHeroes);
	return (
		<TransitionGroup component={'ul'}>
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;