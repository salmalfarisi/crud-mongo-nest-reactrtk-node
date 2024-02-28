/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
		colors:{
			'minceraft': {
				'50': '#f7f7f7',
				'100': '#ededed',
				'200': '#dfdfdf',
				'300': '#c8c8c8',
				'400': '#aaaaaa',
				'500': '#999999',
				'600': '#888888',
				'700': '#7b7b7b',
				'800': '#676767',
				'900': '#545454',
				'950': '#363636',
			},
		},
		fontFamily: {
		  //bodoni: ["Bodoni Moda", "sans-serif"],
		  // gilroy: ["Gilroy-Bold", "sans-serif"],
		  // gabriel: ["Gabriela Smithasa"],
		  micro5: ['"Micro 5"', '"sans-serif"'],
		  ente: ['"Anta"', '"sans-serif"'],
		  minceraft: ['"Minecraft"', '"sans-serif"'],
		  gta: ['"Pricedown Bl"', '"sans-serif"'],
		}
	},
  },
  plugins: [],
}
