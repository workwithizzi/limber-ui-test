import { Header } from '../components'
import { parseYaml, getRepo } from '../utils'
import React, { useState, useEffect } from 'react'


// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `limber/`


export default function DashboardPage({ allFiles }) {
	const [content, setContent] = useState([])

	// Make the finished 'data' array available
	// to component as 'content' array
	useEffect(() => {
		_getData()
			.finally(() => {
				setContent(data)
			})
	}, [])

	const data = []

	// Get data from a single config file, decode it, add to 'data' array
	async function _parseContentTypes(fileName) {
		const rawData = await getRepo(`${replaceThisConst}${fileName}`)
		return new Promise(resolve => {
			resolve(data.push(parseYaml(rawData)))
		})
	}

	// Resolves promise from the allFiles.map(),
	// and returns data if ALL promises returned data
	const _getData = async() => {
		return Promise.all(
			allFiles.map(async file => {
				await _parseContentTypes(file.name)
			})
		)
	}

	// Test finished array
	const testArray = content.map(x => x.label)
	console.log(`--Labels--`)
	console.log(testArray)

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


// GET list of files in limber config directory
// and add them to the 'allFiles' array to be used by page component
DashboardPage.getInitialProps = async() => {
	const allFiles = await getRepo(replaceThisConst)
	return { allFiles }
}