export const APP_NAME = 'OTKD administrácia'

type TableHeader = {
	field: string
	use: string
	use_in_search: boolean
	use_in_export: boolean
}

export const TABLE_HEADER: TableHeader[] = [
	{
		field: 'team_number',
		use: 'Číslo tímu',
		use_in_search: true,
		use_in_export: true,
	},
	{
		field: 'team_name',
		use: 'Meno tímu',
		use_in_search: true,
		use_in_export: true,
	},
	{
		field: 'team_number_runner_number',
		use: 'Číslo bežca',
		use_in_search: false,
		use_in_export: true,
	},
	{
		field: 'team_number_runner_fullname',
		use: 'Meno bežca',
		use_in_search: true,
		use_in_export: true,
	},
	{
		field: 'confirmation_type',
		use: 'Typ potvrdenia',
		use_in_search: false,
		use_in_export: true,
	},
	{
		field: 'confirmation_type_updated_date',
		use: 'Dátum nahratia potvrdenia',
		use_in_search: false,
		use_in_export: true,
	},
	{
		field: 'confirmation_type_checkbox',
		use: 'Potvrdenie nahraté?',
		use_in_search: true,
		use_in_export: true,
	},
]
