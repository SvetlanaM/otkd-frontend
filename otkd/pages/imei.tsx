import Head from 'next/head'
import ImeiAPI from '../api/imei'
import ImeiForm from '../components/ImeiForm'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME} from '../utils/constant'

type FormInputs = {
	team_number: number
	imei_number: number
}

const onSubmit = async (formData: FormInputs) => {
	console.log(formData)
	const {data, status} = await ImeiAPI.update_tracker(
		formData.team_number,
		formData.imei_number
	)

	if (status !== 200) {
		console.log(data.errors)
		return false
	}

	console.log(data.old_data.imei)
	return true
}

const Imei = (): JSX.Element => (
	<>
		<Head>
			<title>{`IMEI | ${APP_NAME}`}</title>
			<meta name="description" content="" />
		</Head>
		<MainContentWithHeader>
			<ImeiForm onSubmit={onSubmit} />
		</MainContentWithHeader>
	</>
)

export default Imei
