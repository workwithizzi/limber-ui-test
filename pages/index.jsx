import { Header } from '../components'
import { parseYaml, getRepo } from '../utils'
import React, { useState, useEffect } from 'react'


// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `limber/`


export default function DashboardPage({ allFiles }) {
	const [content, setContent] = useState([])

	useEffect(() => {
		// executed only when there's a FULLFILLED RESULT from
		// the async function _parseContentTypes
		_getData()
			.finally(() => {
				const mapData = data.map(x => x.name)
				setContent(mapData)
			})
	}, [])

	const data = []

	async function _parseContentTypes(fileName) {
		const rawData = await getRepo(`${replaceThisConst}${fileName}`)
		// as far as we are AWAITING the rawData, we need to RESOLVE a promise off of it
		return new Promise(resolve => {
			// inside of a promise we can perform ASYNC operations
			// as far as rawData is a Promise we should handle
			// data.push(parseYaml(rawData)) accordingly

			// Add decoded data to 'data' array
			resolve(data.push(parseYaml(rawData)))
		})
	}

	// async function that resolves the promises from the allFiles.map()
	// and returns data if ALL promises returned data
	const _getData = async() => {
		return Promise.all(
			allFiles.map(async file => {
				await _parseContentTypes(file.name)
			})
		)
	}

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>
			{data.map(type => {
				return (
					<p key={type.label}>{type.label}</p>
				)
			})}
			{
				<pre>{JSON.stringify(content)}</pre>
			}
		</>
	)
}


// GET "list of files in limber config directory"
DashboardPage.getInitialProps = async() => {
	// Create an array using each config file's name
	const allFiles = await getRepo(replaceThisConst)
	return { allFiles }
}
