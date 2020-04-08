import React from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { repo, getRepoData } from '../utils'


// Global styles
import '../styles/main.scss'


export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// Get project settings from Github repo using API
		const _settings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH, `parse`)

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

		return (
			<Layout
				// Pass _settings through 'Layout' to 'Menu'
				settings={_settings}
				{...pageProps}
			>
				<Component
					// Make _settings available to pages
					settings={_settings}
					{...pageProps}
				/>
			</Layout>
		)
	}
}
