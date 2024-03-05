import { useSelector } from "react-redux";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { selectAll } from "../heroesFilters/filtresSlice";
import store from "../../store";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {

	const [createHero, { isLoading, isFetching, isError }] = useCreateHeroMutation();

	const [heroName, setHeroName] = useState('');
	const [heroDescr, setHeroDescr] = useState('');
	const [heroElem, setHeroElem] = useState('');
	const { filtersLoadingStatus } = useSelector(state => state.filters)
	const filters = selectAll(store.getState());

	const onAdd = (e) => {
		e.preventDefault();
		const newHero = {
			id: uuidv4(),
			name: heroName,
			description: heroDescr,
			element: heroElem
		}

		createHero(newHero).unwrap();

		setHeroName('')
		setHeroDescr('')
		setHeroElem('')
	}

	const renderFilters = (filters) => {
		if (isLoading && isFetching) {
			return <option>Загрузка элемента</option>
		} else if (isError) {
			return <option>Ошибка загрузки</option>
		}
		if (filters && filters.length > 0) {
			return filters.map(({ name, label }) => {
				// eslint-disable-next-line
				if (name === 'all') return;

				return <option key={name} value={name}>{label}</option>
			})
		}
	}

	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={onAdd}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
					required
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?"
					value={heroName}
					onChange={(e) => setHeroName(e.target.value)} />
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					required
					name="text"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{ "height": '130px' }}
					value={heroDescr}
					onChange={(e) => setHeroDescr(e.target.value)} />
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					required
					className="form-select"
					id="element"
					name="element"
					value={heroElem}
					onChange={(e) => setHeroElem(e.target.value)}>
					<option >Я владею элементом...</option>
					{renderFilters(filters, filtersLoadingStatus)}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;