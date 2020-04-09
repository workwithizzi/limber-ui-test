import { Header } from '../components'
import { getRepoData, SimpleDebug, parseYaml } from '../utils'
import React, { useState, useEffect } from 'react'


export default function TestPage({ allContentTypes, repoSettings }) {
	const [content, setContent] = useState([])
	const _tempArray = []

	useEffect(() => {
		_combineContentTypesData()
	}, [])

	async function _combineContentTypesData() {
		return Promise.all(
			// Loop through list of files in config directory
			allContentTypes.map(async file => {
				// GET the encoded data for each file
				const _encodedData = await getRepoData(`/${repoSettings.config_path}/${file.name}`, `parse`)
				return new Promise(resolve => {
					// Decode data + add data to the array
					resolve(_tempArray.push(_encodedData))
				})
			})
		).finally(() => {
			setContent(_tempArray)
		})
	}

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>

			<SimpleDebug label="content">{content}</SimpleDebug>

		</>
	)
}


// GET list of files in limber config directory
// and add them to the '_filesList' array to be used by page component
// DashboardPage.getInitialProps = async() => {
// 	const _filesList = await getRepoData(replaceThisConst)
// 	return { _filesList }
// }


//- -----------------------------------------------------------------
//- -----------------------------------------------------------------

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
