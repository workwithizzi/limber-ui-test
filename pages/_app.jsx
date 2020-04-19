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
		// Get project settings from repo and decode
		const repoSettings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH)

		// GET encoded array of contentTypes files
		const _encodedCtData = await getRepoData(`/${repoSettings.config_path}`)

		// NOTE-YG

		/**
		 * Here you have an initialization of the empty array.
		 * Later on you use it to push the files there from a `map` method.
		 * In fact, you do not need this array.
		 * Because `map` RETURNS an array of RESOLVED values anyway here, and it makes `allContentTypesData` redundant
		 */

		// Initiate an empty array to use for decoded content-types
		// const allContentTypesData = []

		// For each file in repo's content-types (config) directory:
		// Decode the file + add data to array so that it can be used
		const compileDecodedCtDataToArray = Promise.all(
			_encodedCtData.map(async file => {
				// GET the encoded data for each file and parse/decode it
				const _getAndDecodeFileData = await getRepoData(`/${repoSettings.config_path}/${file.name}`)
				return new Promise(resolve => {
					// Add decoded data to array

					// so, here you supposed to push the `_getAndDecodeFileData` into the `allContentTypesData` array, which was initialized above.
					// but in fact, you can use just the `_getAndDecodeFileData` itself, as far, as the `map` method RETURNS an array, based on the RESOLVED values from the PROMISE.
					// I mean, the `map` is a method, after execution of each, the output result is an array.
					// resolve(allContentTypesData.push(_getAndDecodeFileData))

					// So, instead of pushing to the array ON RESOLVE, you just RETURN the value to `map`, and `map` returns an ARRAY that has RETURNED VALUE from the PROMISE
					resolve(_getAndDecodeFileData)
				})
			})
		)
		// awaiting for allContentTypesData array to be finished
		// once the AWAIT is FULLFILLED, the `allContentTypesData` will have values of the `_getAndDecodeFileData`
		const allContentTypesData = await compileDecodedCtDataToArray

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
