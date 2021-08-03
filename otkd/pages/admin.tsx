import Head from 'next/head'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME, TABLE_HEADER} from '../utils/constant'
import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

const AdminPage = () => {
	const rowcheck = (row: any, column: any, display_text: string) => {
		if (column.field === 'action') {
			return (
				<button className="border border-gray-100 p-2 bg-blue-500 text-white rounded-md">
					Save Player
				</button>
			)
		}
		return display_text
	}

	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<meta
					name="description"
					content="OTKD administrácia na správu potvrdení bežcov v spojení s ochorením COVID-19"
				/>
			</Head>
			<MainContentWithHeader>
				<Table
					per_page={50}
					no_content_text={'Pre zadaný výraz nenájdené žiadne výsledky'}
					export_text={'Exportovať dáta'}
					columns={TABLE_HEADER}
					rows={[]}
					striped={true}
					bordered={true}
					hovered={true}
					row_render={rowcheck}
				/>
			</MainContentWithHeader>
		</>
	)
}

export default AdminPage
