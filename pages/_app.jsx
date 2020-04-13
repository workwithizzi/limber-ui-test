import React from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { repo, getRepoData } from '../utils'


// Global styles
import '../styles/main.scss'


export default class MyApp extends App {

	// NEXT's SSR
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// Get project settings from repo and decode
		const repoSettings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH, `decode`)

		// GET encoded array of contentTypes files
		const _encodedCtData = await getRepoData(`/${repoSettings.config_path}`)

		// Initiate an empty array to use for decoded content-types
		const allContentTypesData = []

		// For each file in repo's content-types (config) directory:
		// Decode the file + add data to array so that it can be used
		const compileDecodedCtDataToArray = Promise.all(
			_encodedCtData.map(async file => {
				// GET the encoded data for each file and parse/decode it
				const _getAndDecodeFileData = await getRepoData(`/${repoSettings.config_path}/${file.name}`, `decode`)
				return new Promise(resolve => {
					// Add decoded data to array
					resolve(allContentTypesData.push(_getAndDecodeFileData))
				})
			})
		)
		// awaiting for allContentTypesData array to be finished
		await compileDecodedCtDataToArray

		return {
			pageProps,
			// path: ctx.asPath,
			repoSettings,
			allContentTypesData,
		}
	}

	render() {
		const {
			Component,
			pageProps,
			// path,
			repoSettings,
			allContentTypesData,
		} = this.props

		return (
			<Layout
				// Make data available to Layout & child components
				repoSettings={repoSettings}
				allContentTypes={allContentTypesData}
				// path={path}
				{...pageProps}
			>
				<Component
					// Make data available to all page components
					repoSettings={repoSettings}
					allContentTypes={allContentTypesData}
					// path={path}
					{...pageProps}
				/>
			</Layout>
		)
	}
}
