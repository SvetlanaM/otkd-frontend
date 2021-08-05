import Head from 'next/head'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME, TABLE_HEADER} from '../utils/constant'
import {TeamType} from '../types/teamType'
import TeamsAPI from '../api/covid'
import * as React from 'react'
import {DataGrid, GridColDef} from '@material-ui/data-grid'
import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'

interface AdminPageProps {
	teams: TeamType[]
}

const updateData = async (
	team_number: number,
	runner_id: number,
	documentUrl: string,
	vaccination_type: string
): Promise<any> => {
	return await TeamsAPI.create_confirmation(
		team_number,
		runner_id,
		documentUrl,
		vaccination_type
	).catch(() => alert('Nastala chyba, skuste neskor'))
}

const AdminPage = ({teams}: AdminPageProps) => {
	const temp = teams.map((item, id) => (item['id'] = id + 1))

	const [rows, setRows] = React.useState<any[]>(teams)

	const onToggleEditMode = (id: any) => {
		let vaccination_type = id.props.value ? id.props.value : null
		const {team_number, number, type, url} = rows.find(
			(item) => item.id === Number(id.id)
		)

		updateData(team_number, number, url, vaccination_type)
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

export async function getServerSideProps() {
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
