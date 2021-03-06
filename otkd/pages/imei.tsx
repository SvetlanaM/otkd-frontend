import Head from 'next/head'
import ImeiAPI from '../api/imei'
import ImeiForm from '../components/ImeiForm'
import MainContentWithHeader from '../components/MainContent'
import {APP_NAME} from '../utils/constant'

type FormInputs = {
	team_number: number
	imei_number: string
}

const onSubmit = async (formData: FormInputs) => {
	const {data, status} = await ImeiAPI.update_tracker(
		formData.team_number,
		formData.imei_number
	)
	if (status !== 200) {
		return data.errors
	}
	return data
}

const Imei = (): JSX.Element => {
	return (
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
}

export default Imei
