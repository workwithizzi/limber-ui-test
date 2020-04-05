import React from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { getRepoSettings, parseYaml } from '../utils'

import '../styles/main.scss'


export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// Get project settings from repo using Github API
		const _settings = await getRepoSettings()

		return {
			pageProps,
			_settings,
		}
	}

	render() {
		const {
			Component,
			pageProps,
			_settings,
		} = this.props

		// Convert repo settings from yaml into js object
		const _parsedSettings = parseYaml(_settings)

		return (
			<Layout
				settings={_parsedSettings}
				{...pageProps}
			>
				<Component
					settings={_parsedSettings}
					{...pageProps}
				/>
			</Layout>
		)
	}
}
