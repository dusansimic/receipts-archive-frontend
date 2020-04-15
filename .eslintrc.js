module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'xo',
		'xo-vue'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off'
	}
}
