import React from 'react'
import App from 'next/app'
import { Layout } from '../components'
import { repo, getRepoData } from '../utils'
import axios from "axios"
import Router from 'next/router'


// Global styles
import '../styles/main.scss'


export default class MyApp extends App {
	signal = axios.CancelToken.source();

	state = {
		isLoading: false,
		repoSettings: [],
		allContentTypesData: [],
	}

	static async getInitialProps({ Component, ctx }) {
		const isServer = !!ctx.req
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// console.log(`------------------------------------------`)
		// console.log(`1`)
		// console.log(`------------------------------------------`)
		// // Get project settings from repo and decode
		// const repoSettings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH)
		// console.log(repoSettings)
		// console.log(`+++++++++++++++++++++++++++++++++++++++++=`)

		// console.log(`------------------------------------------`)
		// console.log(`2`)
		// console.log(`------------------------------------------`)
		// // GET encoded array of contentTypes files
		// const _encodedCtData = await getRepoData(`/${repoSettings.config_path}`)
		// console.log(_encodedCtData)
		// console.log(`+++++++++++++++++++++++++++++++++++++++++=`)

		// // NOTE-YG

		// /**
		//  * Here you have an initialization of the empty array.
		//  * Later on you use it to push the files there from a `map` method.
		//  * In fact, you do not need this array.
		//  * Because `map` RETURNS an array of RESOLVED values anyway here, and it makes `allContentTypesData` redundant
		//  */

		// // Initiate an empty array to use for decoded content-types
		// // const allContentTypesData = []

		// // For each file in repo's content-types (config) directory:
		// // Decode the file + add data to array so that it can be used
		// console.log(`------------------------------------------`)
		// console.log(`3`)
		// console.log(`------------------------------------------`)
		// const compileDecodedCtDataToArray = Promise.all(
		// 	_encodedCtData.map(async file => {
		// 		// GET the encoded data for each file and parse/decode it
		// 		console.log(`EACH FILE`)
		// 		console.log(file)
		// 		const _getAndDecodeFileData = await getRepoData(`/${repoSettings.config_path}/${file.name}`)
		// 		return new Promise(resolve => {
		// 			// Add decoded data to array

		// 			// so, here you supposed to push the `_getAndDecodeFileData` into the `allContentTypesData` array, which was initialized above.
		// 			// but in fact, you can use just the `_getAndDecodeFileData` itself, as far, as the `map` method RETURNS an array, based on the RESOLVED values from the PROMISE.
		// 			// I mean, the `map` is a method, after execution of each, the output result is an array.
		// 			// resolve(allContentTypesData.push(_getAndDecodeFileData))

		// 			// So, instead of pushing to the array ON RESOLVE, you just RETURN the value to `map`, and `map` returns an ARRAY that has RETURNED VALUE from the PROMISE
		// 			resolve(_getAndDecodeFileData)
		// 		})
		// 	})
		// )
		// console.log(compileDecodedCtDataToArray)
		// compileDecodedCtDataToArray.then(data => {
		// 	console.log(data)
		// })
		// console.log(`+++++++++++++++++++++++++++++++++++++++++=`)
		// // awaiting for allContentTypesData array to be finished
		// // once the AWAIT is FULLFILLED, the `allContentTypesData` will have values of the `_getAndDecodeFileData`
		// const allContentTypesData = await compileDecodedCtDataToArray
		// console.log(allContentTypesData)
		// console.log(`------------------------------------------`)
		// const _getAndDecodeFileData = await getRepoData(`/${repoSettings.config_path}/${file.name}`)
		
		// const res = await axios.get(`http://localhost:3000/api/allContentTypes`)
		// // console.log(res)
		// const repoSettings = res.data.repoSettings
		// const allContentTypesData = res.data.allContentTypesData

		// try {
		// 	const res = await axios.get(`http://localhost:3000/api/allContentTypes`)
		// 	// console.log(res)
		// 	const repoSettings = res.data.repoSettings
		// 	const allContentTypesData = res.data.allContentTypesData
			
		return {
			pageProps,
			// path: ctx.asPath,
			// repoSettings,
			// allContentTypesData,
		}
		// } catch(err) {
		// 	console.log(err)
		// }
		
	}

	componentDidMount() {
		this.getData()
	}

	async getData() {
		try {
			this.setState({ isLoading: true })
			const res = await axios.get(`http://localhost:3000/api/allContentTypes`, { cancelToken: this.signal.token })
			// console.log(res)
			const repoSettings = res.data.repoSettings
			const allContentTypesData = res.data.allContentTypesData
			this.setState({ repoSettings, allContentTypesData, isLoading: false })
		} catch(error) {
			if (axios.isCancel(error)) {
				console.log(`Error: `, error.message) // => prints: Api is being canceled
			} else {
				this.setState({ isLoading: false })
			}
		}
	}

	componentWillUnmount() {
		this.signal.cancel(`Api is being canceled`)
	}

	render() {
		const {
			Component,
			pageProps,
			// path,
			repoSettings,
			allContentTypesData,
		} = this.props

		const {isLoading} = this.state

		return (
			<div>
				{
					!isLoading ?
						(
							<Layout
								// Make data available to Layout & child components
								repoSettings={this.state.repoSettings}
								allContentTypes={this.state.allContentTypesData}
								// repoSettings={repoSettings}
								// allContentTypes={allContentTypesData}
								// path={path}
								{...pageProps}
							>
								<Component
									// Make data available to all page components
									repoSettings={this.state.repoSettings}
									allContentTypes={this.state.allContentTypesData}
									// repoSettings={repoSettings}
									// allContentTypes={allContentTypesData}
									// path={path}
									{...pageProps}
								/>
							</Layout>
						) : (
							<div>
								<p>Loading.... please wait</p>
								<p>Preparing data</p>
								<p>If it takes too long, reload the page</p>
							</div>
						)
				}
			</div>
			
		)
	}
}
