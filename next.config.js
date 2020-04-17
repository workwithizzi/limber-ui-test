require(`dotenv`).config()

const withCSS = require(`@zeit/next-css`)
const withSass = require(`@zeit/next-sass`)

module.exports = withCSS(
	withSass({
		// ENV variables
		env: {
			GITHUB_PRIVATE_TOKEN: process.env.GITHUB_PRIVATE_TOKEN,
		},
		webpack(config) {
			// Added the yaml/js-yaml loader during development.
			// Can be removed before production.
			config.module.rules.push(
				{
					test: /\.ya?ml$/,
					use: `js-yaml-loader`,
				}
			)
			return config
		},
	})
)
