import Head from 'next/head'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME, TABLE_HEADER, VaccinationTypeEnum} from '../utils/constant'

import 'react-tailwind-table/dist/index.css'
import {Team, TeamList, TeamType} from '../types/teamType'
import TeamsAPI from '../api/covid'
import {useMemo, useState} from 'react'
import * as React from 'react'
import {
	DataGrid,
	GridCellEditCommitParams,
	GridColDef,
	GridColumns,
	GridRowsProp,
	GridValueGetterParams,
} from '@material-ui/data-grid'

import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'

interface AdminPageProps {
	teams: TeamType[]
}

const AdminPage = ({teams}: AdminPageProps) => {
	const temp = teams.map((item, id) => (item['id'] = id + 1))

	const [rows, setRows] = React.useState<any[]>(teams)

	const onToggleEditMode = (id: any) => {
		console.log(id)
		// console.log(id.props.value)
		console.log(rows.find((item) => item.id === Number(id.id)))
	}

	return (
		<>
			{typeof window !== 'undefined' ? (
				<Protect
					sha512={process.env.NEXT_PUBLIC_ADMIN_PASS}
					blur={true}
					boxTitle="Prístup pre administrátora"
					inputPlaceholder="Zadajte heslo"
					buttonLabel="Vstúpiť">
					<Head>
						<title>{APP_NAME}</title>
						<meta
							name="description"
							content="OTKD administrácia na správu potvrdení bežcov v spojení s ochorením COVID-19"
						/>
					</Head>
					<MainContentWithHeader>
						<div style={{minHeight: '500px', width: '100%'}}>
							<DataGrid
								rows={rows}
								columns={columns}
								onEditCellPropsChange={(params) => onToggleEditMode(params)}
							/>
						</div>
					</MainContentWithHeader>
				</Protect>
			) : null}
		</>
	)
}

const columns: GridColDef[] = TABLE_HEADER

export async function getStaticProps() {
	try {
		const {data} = await TeamsAPI.get()

		const sortedTeam =
			data &&
			data.runners.sort((a: TeamType, b: TeamType) =>
				Number(a.team_number) > Number(b.team_number)
					? 1
					: Number(b.team_number) > Number(a.team_number)
					? -1
					: 0
			)

		return {
			props: {
				teams: sortedTeam,
			},
			revalidate: 1,
		}
	} catch (error) {
		console.error(error)
		return {
			props: {
				teams: [],
			},
		}
	}
}

export default AdminPage
