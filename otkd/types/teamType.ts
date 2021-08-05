export interface TeamList {
	teams: Team[]
}
export interface Team {
	team: TeamType
}

export type TeamType = {
	team_number: number
	team_name: string
	number: number
	name: string
	document_validated: boolean
	url: string
	type: string
	created_date: Date
	id: number
}
