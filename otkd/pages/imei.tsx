import ImeiAPI from '../api/imei'
import ImeiForm from '../components/ImeiForm'

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
	<div>
		<ImeiForm onSubmit={onSubmit} />
	</div>
)

export default Imei
