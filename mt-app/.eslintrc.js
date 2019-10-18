module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
    'plugin:vue/recommended'
  ],
	plugins: [
    'vue'
  ],
	rules: {
		'vue/max-attributes-per-line': 'off',
		'vue/html-self-closing': 'off',
		'vue/html-indent': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off'
	}
}