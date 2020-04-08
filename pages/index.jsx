import { Header } from '../components'
import { parseYaml, getRepo, SimpleDebug } from '../utils'
import React, { useState, useEffect } from 'react'


// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = ``


export default function DashboardPage({ _filesList }) {
	const [content, setContent] = useState([])
	const _tempArray = []

	useEffect(() => {
		_getData()
	}, [])

	async function _getData() {
		return Promise.all(
			// Loop through list of files in config directory
			_filesList.map(async file => {
				// GET the encoded data for each file
				const _encodedData = await getRepo(`/limber/${file.name}`)
				return new Promise(resolve => {
					// Decode data + add data to the array
					resolve(_tempArray.push(parseYaml(_encodedData)))
				})
			})
		).finally(() => {
			setContent(_tempArray)
		})
		// ALTERNATIVE: Christian's Idea using concat
		// return Promise.all(
		// 	// Loop through list of files in config directory
		// 	_filesList.map(async file => {
		// 		// GET the encoded data for each file
		// 		const _encodedData = await getRepo(`${replaceThisConst}${file.name}`)
		// 		return new Promise(resolve => {
		// 			setContent(content.concat(parseYaml(_encodedData)))
		// 		})
		// 	})
		// )
	}

	console.log(_filesList)

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>
			{/* Just testing here. */}
			{content.map(type => {
				return (
					<p key={type.label}>{type.label}</p>
				)
			})}
			{
				<SimpleDebug>{content}</SimpleDebug>
			}
		</>
	)
}


// GET list of files in limber config directory
// and add them to the 'allFiles' array to be used by page component
DashboardPage.getInitialProps = async() => {
	const _filesList = await getRepo(`/limber`)
	return { _filesList }
}
