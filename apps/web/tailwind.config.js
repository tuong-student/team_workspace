/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		colors: {
			primary: {
				b400: '#0052CC',
				n800: '#172B4D',
				n0: '#FFFFFF'
			},
			secondary: {
				r300: '#FF5630',
				y300: '#FFAB00',
				g300: '#36B37E',
				t300: '#00B8D9',
				p300: '#6554C0'
			},
			neutral: {
				dark: {
					900: '#091E42',
					800: '#172B4D',
					700: '#253858',
					600: '#344563',
					500: '#42526E'
				},
				mid: {
					400: '#505F79',
					300: '#5E6C84',
					200: '#6B778C',
					100: '#7A869A',
					90: '#8993A4',
					80: '#97A0AF',
					70: '#A5ADBA',
					60: '#B3BAC5'
				},
				light: {
					50: '#C1C7D0',
					40: '#DFE1E6',
					30: '#EBECF0',
					20: '#F4F5F7',
					10: '#FAFBFC',
					0: '#FFFFFF'
				}
			},
			red: {
				500: '#BF2600',
				400: '#DE350B',
				300: '#FF5630',
				200: '#FF7452',
				100: '#FF8F73',
				75: '#FFBDAD',
				50: '#FFEBE6'
			},
			yellow: {
				500: '#FF8B00',
				400: '#FF991F',
				300: '#FFAB00',
				200: '#FFC400',
				100: '#FFE380',
				75: '#FFF0B3',
				50: '#FFFAE6'
			},
			green: {
				500: '#006644',
				400: '#00875A',
				300: '#36B37E',
				200: '#57D9A3',
				100: '#79F2C0',
				75: '#ABF5D1',
				50: '#E3FCEF'
			},
			blue: {
				500: '#0747A6',
				400: '#0052CC',
				300: '#0065FF',
				200: '#2684FF',
				100: '#4C9AFF',
				75: '#B3D4FF',
				50: '#DEEBFF'
			},
			teal: {
				500: '#008DA6',
				400: '#00A3BF',
				300: '#00B8D9',
				200: '#00C7E6',
				100: '#79E2F2',
				75: '#B3F5FF',
				50: '#E6FCFF'
			},
			purple: {
				500: '#403294',
				400: '#5243AA',
				300: '#6554C0',
				200: '#8777D9',
				100: '#998DD9',
				75: '#C0B6F2',
				50: '#EAE6FF'
			}
		},
		extend: {}
	},
	plugins: []
}
