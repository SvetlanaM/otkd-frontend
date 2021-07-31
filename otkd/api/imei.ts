import axios, {AxiosResponse} from 'axios'

const SERVER_BASE_URL = process.env.SERVER_BASE_URL

const ImeiAPI = {
	update: async (
		team_number: number,
		imei_number: number
	): Promise<Omit<AxiosResponse, 'statusText' | 'headers' | 'config'>> => {
		const {data, status} = await axios.patch(
			`${SERVER_BASE_URL}/team/${team_number}/tracker`,
			JSON.stringify({team_number}),
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8`',
					'Authorization': `Bearer ${encodeURIComponent(
						process.env.AUTH_TOKEN || ''
					)}`,
				},
				data: {
					imei: JSON.stringify({imei_number}),
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
