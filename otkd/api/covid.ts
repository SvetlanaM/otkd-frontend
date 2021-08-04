import axios, {AxiosResponse} from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL

const TeamsAPI = {
	create_confirmation: async (
		team_number: number,
		runner_id: number,
		document_url: string,
		vaccination_type: string
	): Promise<Omit<AxiosResponse, 'statusText' | 'headers' | 'config'>> => {
		const {data, status} = await axios.post(
			`/team/${team_number}/runner/${runner_id}/document`,
			{
				url: document_url,
				type: vaccination_type,
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
	get: async () => {
		const {data, status} = await axios.get(`/team`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
			},
		})
		return {
			data,
			status,
		}
	},
}

export default TeamsAPI
