import Head from 'next/head'
import {APP_NAME} from '../../../utils/constant'
import {useRouter} from 'next/router'
import MobileUploadForm from '../../../components/mobile/MobileUploadForm'
import MobileWrapper from '../../../components/mobile/MobileWrapper'
import MobileDescription from '../../../components/mobile/MobileDescription'

type FormInputs = {
	vaccination_type: string
	document_url: string
}

const Title = (): JSX.Element => (
	<h1 className="font-extrabold text-center uppercase text-lg">
		Potvrdenie o bezinfekčnosti vírusom COVID-19
	</h1>
)

const Imei = (): JSX.Element => {
	const router = useRouter()
	const {team_number, runner_id} = router.query

	return (
		<>
			<Head>
				<title>{`Nahrať COVID-19 dokument | ${APP_NAME}`}</title>
				<meta
					name="description"
					content="Nahratie potvrdenia informujúceho o prekonaní ochorenia COVID-19"
				/>
			</Head>
			<MobileWrapper>
				<Title />

				<MobileDescription />
				<MobileUploadForm
					team_number={Number(team_number)}
					runner_id={Number(runner_id)}
				/>
			</MobileWrapper>
		</>
	)
}

export default Imei
