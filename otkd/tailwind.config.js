module.exports = {
	purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './utils/**/*.{ts,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				blue: {
					dark: '#1c1d35',
				},
				purple: {
					medium: '#393c5b',
					light: '#a7aac6',
				},
				green: '#5adb82',
				orange: '#e65514',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
	],
}
