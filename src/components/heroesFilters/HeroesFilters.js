import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { filtersChanged, fetchFilters } from "./filtresSlice";
import Spinner from "../spinner/Spinner";
import { useGetFiltersQuery } from "../../api/apiSlice";

const HeroesFilters = () => {
	const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
	const dispatch = useDispatch();

	const {
		data: filters = []
	} = useGetFiltersQuery();

	useEffect(() => {
		dispatch(fetchFilters());
		// eslint-disable-next-line
	}, [])


	if (filtersLoadingStatus === 'loading') {
		return <Spinner />;
	} else if (filtersLoadingStatus === 'error') {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}
	const renderFilters = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Фильтры не найдены</h5>
		}

		return arr.map(({ name, label, className }) => {
			const btnClass = classNames('btn', className, {
				'active': name === activeFilter
			});

			return <button
				key={name}
				id={name}
				className={btnClass}
				onClick={() => dispatch(filtersChanged(name))}
			>{label}</button>
		})
	}

	const element = renderFilters(filters)

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{element}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;