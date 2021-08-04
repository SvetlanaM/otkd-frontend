import {
	GridCellModeChangeParams,
	GridCellParams,
	GridCellValue,
	GridEditCellPropsParams,
	GridEditRowsModel,
} from '@material-ui/data-grid'
import Link from 'next/link'
import {useCallback, useMemo, useState} from 'react'

export enum VaccinationTypeEnum {
	vaccination = 'Potvrdenie o očkovaní',
	antigen_test = 'Antigénový test',
	pcr_test = 'PCR test',
	cured_confirmation = 'Potvrdenie o prekonaní COVID-19',
}

export function showDocument(params: GridCellParams): JSX.Element {
	return (
		<a
			href={params.value ? params.value.toString() : ''}
			className="text-orange"
			target="blank">
			{params.value ? 'Stiahnuť doklad' : ''}
		</a>
	)
}

const values = (params) =>
	Object.keys(VaccinationTypeEnum).map((key) => {
		return (
			<option
				value={key}
				key={key}
				selected={VaccinationTypeEnum[key] == params}>
				{VaccinationTypeEnum[key]}
			</option>
		)
	})

export function OptionTypes(params: GridCellParams): JSX.Element {
	const {id, value, api, field} = params

	// console.log(id, value, field)
	const handleChange = (event) => {
		api.setEditCellValue({id, field, value: String(event.target.value)}, event)
		// Check if the event is not from the keyboard
		// https://github.com/facebook/react/issues/7407
		if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
			api.commitCellChange({id, field})
			api.setCellMode(id, field, 'view')
		}
	}

	return (
		<>
			<select className="w-full" value={String(value)} onChange={handleChange}>
				{values(params.value ? params.value.toString() : '')}
			</select>
		</>
	)
}
