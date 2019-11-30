// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
	extends: [
		/*'@wemake-services/stylelint-config-scss',*/
		'stylelint-config-css-modules',
		/*'stylelint-a11y/recommended',*/
		/*'stylelint-config-airbnb',*/
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],

	/*rules: {
		'a11y/media-prefers-reduced-motion': 0,
		'plugin/no-low-performance-animation-properties': 0,
		// ignore special `var-` css variables for `:export`
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^var-/'],
			},
		],
		// custom plugins to work with
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignore: ['flexbox'],
			},
		],
		// a11y
		'a11y/content-property-no-static-value': true,
	},*/
	rules: {
		'selector-max-id': 1,
		'block-no-empty': true,
		'color-no-invalid-hex': true,
		'declaration-colon-space-after': 'always',
		'declaration-colon-space-before': 'never',
		'function-comma-space-after': 'always',
		'media-feature-colon-space-after': 'always',
		'media-feature-colon-space-before': 'never',
		'media-feature-name-no-vendor-prefix': true,
		'max-empty-lines': 5,
		'number-leading-zero': 'always',
		'number-no-trailing-zeros': true,
		'property-no-vendor-prefix': true,
		'selector-list-comma-space-before': 'never',
		'selector-list-comma-newline-after': 'always',
		'string-quotes': 'double',
		'value-no-vendor-prefix': true,
	},
};
