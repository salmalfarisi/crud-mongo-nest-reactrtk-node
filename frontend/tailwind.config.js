/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors:{
				'young-blue': {
					'DEFAULT': '#AAD7D9',
					'50': '#E8F5F2',
					'100': '#DFF1EE',
					'200': '#CDE9E7',
					'300': '#BCE1E0',
					'400': '#AAD7D9',
					'500': '#8AC4CB',
					'600': '#6BAFBD',
					'700': '#4D97AC',
					'800': '#3F768D',
					'900': '#31586D',
					'950': '#2A495D'
				},
			}
		},
	},
	plugins: [],
}

