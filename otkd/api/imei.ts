import axios, {AxiosResponse} from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL

const ImeiAPI = {
	update_tracker: async (
		team_number: number,
		imei_number: string
	): Promise<Omit<AxiosResponse, 'statusText' | 'headers' | 'config'>> => {
		const {data, status} = await axios.patch(
			`/team/${team_number}/tracker`,
			{
				imei: imei_number,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
				},
			}
		)
		return {
			data,
			status,
		}
	},
}

export default ImeiAPI
