module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'./index.js'
	],
	env: {
		browser: true,
		es2021: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	settings: {
		'svelte3/typescript': require('typescript'),
		// ignore style tags in Svelte because of Tailwind CSS
		// See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
		'svelte3/ignore-styles': () => true
	},
	plugins: ['svelte3', '@typescript-eslint']
}
