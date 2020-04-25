import React, { Fragment } from 'react'
import App from 'next/app'
import { Layout } from '../components'
import axios from "axios"


// Global styles
import '../styles/main.scss'


export default class MyApp extends App {
	/**
	 * Cancel Axios request
	 * 
	 * Generate the Token, which will be used in case of the component being unmounted with the pending request.
	 */
	signal = axios.CancelToken.source();

	state = {
		isLoading: false,
		repoSettings: [],
		allContentTypesData: [],
	}

	/**
	 * Define default `getInitialProps` to pass `pageProps` only.
	 * 
	 * We are not doing here requests, i.e. API calls here to the GitHub API.
	 * Because:
	 *  1. we are not able to detect when the Component is being re-rendered/unmounted here.
	 *  2. that specifically needed to control several async API calls.
	 */
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return {
			pageProps,
		}
	}

	// Standard React Lifecycle Method which is being executed when the React App is mounted into the DOM
	componentDidMount() {
		// This is just for time logging purposes.
		const startTime = new Date()
		console.log(`Start time: ${startTime.toISOString()}`)

		// Execute the Function which does API call to the `Next API Route`: `api/allContentTypes.js`
		this.getData(startTime)
	}

	async getData(startTime) {

		try {
			// Set `isLoading` to `true`, it means the API call was started
			this.setState({ isLoading: true })

			// TODO: find an appropriate place for this URL as currently it is used only at 1 place, here

			// API endpoint is hardcoded here
			const baseURL = `http://localhost:3000/`
			const url = `${baseURL}api/allContentTypes`

			// TODO: create a REQUEST_SERVICE to wrap up `request.js` file and have all the API calls at one place
			// Make an API request to the `Next API Route`: `api/allContentTypes.js`
			const res = await axios.get(url, {
				cancelToken: this.signal.token, // pass signal's cancel token to the request, so it can detect a needed request to cancel on the Component unmount
			})

			// Get the response data
			const repoSettings = res.data.repoSettings
			const allContentTypesData = res.data.allContentTypesData

			// Save the response data to the `state` and set the `isLoading` to `false`, it means that that API call has been successfully finished
			this.setState({ repoSettings, allContentTypesData, isLoading: false })

			// Log time, just for awareness
			const endTime = new Date()
			console.log(`End time: ${endTime.toISOString()}`)
			console.log(`Time spent on API calls: ${endTime.getTime() - startTime.getTime()} ms`)
		} catch(error) {
			// API was canceled because of the Component unmount event
			if (axios.isCancel(error)) {
				console.log(`Error: ${error.message}`) // => prints: API is being canceled
			} else {
				// there was a problem with fetching
				this.setState({ isLoading: false })
			}
		}
	}

	// Detect the Component unmount and cancel the API call that wasn't finished/resolved by that time.
	// This is basically why we use `componentDidMount` to fetch the data via GitHub API and not using `getInitialProps`.
	// At `getInitialProps` we are not able to detect the Component unmount and cancel the API call.
	componentWillUnmount() {
		this.signal.cancel(`API is being canceled`)
	}

	render() {
		const {
			Component,
			pageProps,
		} = this.props

		const { isLoading, repoSettings, allContentTypesData } = this.state

		return (
			<Fragment>
				{
					!isLoading ?
						(
							<Layout
								// Make data available to Layout & child components
								repoSettings={repoSettings}
								allContentTypes={allContentTypesData}
							>
								<Component
									// Make data available to all page components
									repoSettings={repoSettings}
									allContentTypes={allContentTypesData}
									{...pageProps}
								/>
							</Layout>
						) : (
							<div>
								<p>Loading... please wait.</p>
								<p>Preparing the data.</p>
								<p>If it takes too long to dispay anything, please reload the page again <span role="img" aria-label="Shy Emojii">😊</span></p>
							</div>
						)
				}
			</Fragment>
		)
	}
}
