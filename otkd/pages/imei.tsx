import ImeiAPI from '../api/imei'

const tryApiCall = async () => {
	const {data, status} = await ImeiAPI.update_tracker(220, 860599004673080)

	if (status !== 200) {
		console.log(data.errors)
	}

	console.log(data)
}

console.log(tryApiCall().catch((data) => data.errors))
const ImeiForm = (): JSX.Element => <div>...</div>

export default ImeiForm
