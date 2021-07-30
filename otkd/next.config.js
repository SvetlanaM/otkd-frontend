module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/admin',
				permanent: true,
			},
		]
	},
}
