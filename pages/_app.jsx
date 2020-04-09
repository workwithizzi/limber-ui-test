import React, { useState, useEffect } from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { repo, getRepoData } from '../utils'

// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `/limber`

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

		// GET encoded array of contentTypes files
		const _contentTypes = await getRepoData(replaceThisConst)

		return {
			pageProps,
			path: ctx.asPath,
			_settings,
			_contentTypes,
		}
	}

	render() {
		const {
			Component,
			pageProps,
			path,
			_settings,
			_contentTypes,
		} = this.props

		return (
			<Layout
				// Pass _settings through 'Layout' to 'Menu'
				settings={_settings}
				path={path}
				{...pageProps}
			>
				<Component
					// Make _settings available to pages
					settings={_settings}
					contentTypes={_contentTypes}
					path={path}
					{...pageProps}
				/>
			</Layout>
		)
	}
}
