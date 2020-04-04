
const withCSS = require(`@zeit/next-css`)
const withSass = require(`@zeit/next-sass`)

// module.exports = {
// 	webpack(config) {
// 		config.module.rules.push(
// 			{
// 				test: /\.ya?ml$/,
// 				use: `js-yaml-loader`,
// 			}
// 		)
// 		return config
// 	},
// }

module.exports = withCSS(
	withSass({
		webpack(config) {
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
