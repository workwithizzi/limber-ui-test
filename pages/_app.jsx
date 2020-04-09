import React from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { repo, getRepoData } from '../utils'

// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `/limber`

// Global styles
import '../styles/main.scss'


// NOTE:
/**
 * During WAY 1, it gets the data after the DOM is rendered,
 * so WAY 2 should be faster, as content is ready before the DOM is rendered.
 */

export default class MyApp extends App {

	// NEXT's SSR
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// Get project settings from Github repo using API
		const _settings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH, `parse`)

		// GET encoded array of contentTypes files
		const _contentTypes = await getRepoData(replaceThisConst)


		/**
		 * WAY 2: FETCH DATA at SSR time
		 */

		const _tempArray = []

		const resolveTemporaryArray = Promise.all(
			// Loop through list of files in config directory
			_contentTypes.map(async file => {
				// GET the encoded data for each file
				const _encodedData = await getRepoData(`${replaceThisConst}/${file.name}`, `parse`)
				return new Promise(resolve => {
					// Decode data + add data to the array
					resolve(_tempArray.push(_encodedData))
				})
			})
		)
		// awaiting the content to be filled in the _tempArray
		await resolveTemporaryArray

		return {
			pageProps,
			path: ctx.asPath,
			_settings,
			_contentTypes,
			_tempArray,
		}
	}

	/**
 * WAY 1: Use STATE
 */

	// DEFINE state to store data from `_combineContentTypesData` function
	state = {
		content: [],
	}

	// When the page was injected into the DOM, execute `_combineContentTypesData`
	componentDidMount() {
		this._combineContentTypesData(this.props._contentTypes)
	}

	// REMOVED the Promise as we are not needing it anymore, as I removed the `const _tempArray = []` and push data right into the state
	_combineContentTypesData(contentTypes) {
		// Loop through list of files in config directory
		contentTypes.map(async file => {
			// GET the encoded data for each file
			const _encodedData = await getRepoData(`${replaceThisConst}/${file.name}`, `parse`)
			// Decode data + add data to the STATE
			this.setState({
				content: [...this.state.content, _encodedData],
			})
		})
	}

	render() {
		const {
			Component,
			pageProps,
			path,
			_settings,
			_contentTypes,
			_tempArray,
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
					/**
					 * 1st WAY
					 * pass the result from `_combineContentTypesData` to the component
					 */
					// content={this.state.content}
					/**
					 * 2nd WAY
					 * pass the result fetched at the SSR time
					 */
					content={_tempArray}
					{...pageProps}
				/>
			</Layout>
		)
	}
}
