module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'xo',
		'xo-vue',
	],
	plugins: [
		'import',
		'unicorn',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'import/no-unresolved': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'vue/v-on-function-call': 'warn',
	},
};
