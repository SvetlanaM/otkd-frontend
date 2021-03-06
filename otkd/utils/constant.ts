import {OptionTypes, showDocument} from './renderTableTypes'

export const APP_NAME = 'OTKD administrácia'

export enum VaccinationTypeEnum {
	vaccination = 'Potvrdenie o očkovaní',
	antigen_test = 'Antigénový alebo LAMP test',
	pcr_test = 'RT PCR test',
	cured_confirmation = 'Potvrdenie o prekonaní COVID-19',
}
interface TableHeader {
	field: string
	headerName: string
	editable: boolean
	width: number
	valueGetter?: (e: any) => any
	type?: any
	renderEditCell?: (e: any) => any
	renderCell?: (e: any) => any
}

const setFormatDate = (myDate: any): string => {
	let date = myDate.row.created_date && new Date(myDate.row.created_date)

	return date
		? date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
		: '--'
}

const getEnumValue = (key: any): string => {
	let keyName = key.row.type
	return keyName && VaccinationTypeEnum[keyName]
}

export const TABLE_HEADER: TableHeader[] = [
	{
		field: 'team_number',
		headerName: 'Tím',
		editable: false,
		width: 130,
	},
	{
		field: 'team_name',
		headerName: 'Meno tímu',
		editable: false,
		width: 200,
	},
	{
		field: 'number',
		headerName: 'Bežec',
		editable: false,
		width: 130,
	},
	{
		field: 'name',
		headerName: 'Meno bežca',
		editable: false,
		width: 200,
	},
	{
		field: 'type',
		headerName: 'Typ potvrdenia',
		editable: true,
		width: 200,
		renderEditCell: OptionTypes,
		renderCell: getEnumValue,
	},
	{
		field: 'url',
		headerName: 'Potvrdenie',
		editable: false,
		width: 200,
		type: 'string',
		renderCell: showDocument,
	},
	{
		field: 'created_date',
		headerName: 'Dátum nahratia',
		editable: false,
		width: 200,
		valueGetter: setFormatDate,
		type: 'date',
	},
]
