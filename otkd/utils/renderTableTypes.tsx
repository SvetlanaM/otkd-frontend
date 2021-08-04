import {
	GridCellModeChangeParams,
	GridCellParams,
	GridCellValue,
	GridEditCellPropsParams,
} from '@material-ui/data-grid'
import Link from 'next/link'
import {useMemo} from 'react'

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
				selected={VaccinationTypeEnum[key] == params}
				disabled={params}>
				{VaccinationTypeEnum[key]}
			</option>
		)
	})

export function optionTypes(params: GridCellParams): JSX.Element {
	return (
		<>
			{params.value ? (
				params.value.toString()
			) : (
				<select className="w-full">
					{values(params.value ? params.value.toString() : '')}
				</select>
			)}
		</>
	)
}
