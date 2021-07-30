import Head from 'next/head'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME} from '../utils/constant'

const AdminPage = () => (
	<>
		<Head>
			<title>{APP_NAME}</title>
			<meta
				name="description"
				content="OTKD administrácia na správu potvrdení bežcov v spojení s ochorením COVID-19"
			/>
		</Head>
		<MainContentWithHeader />
	</>
)

export default AdminPage
