// - List all articles related to queried group or content-type
//- -----------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Header, ArticleCreate, ArticlesList } from '../components'
import { SimpleDebug, getRepoData } from '../utils'

// Temp data for testing
const demo = {
	content_types: [
		{
			label: `Home Page`,
			name: `index`,
		},
		{
			label: `Default Page`,
			name: `default-page`,
		},
	],
	articles: [
		{
			title: `Home`,
			content_type: `Home Page`,
			status: `Published`,
			date: `03/25/20`,
			path: `#`,
		},{
			title: `About Us`,
			content_type: `Default Page`,
			status: `Published`,
			date: `03/22/20`,
			path: `#`,
		},
	],
}


export default function ArticlesPage({repoSettings, allContentTypes}) {
	const router = useRouter()
	const [content, setContent] = useState([])
	const title = router.query.group || router.query.type

	useEffect(() => {
		_tempGetFilesData()
	}, [])

	// Get all the config data for ALL related CT's into a single array
	const _relatedCTConfigDataArray = allContentTypes.filter(function(i){
		if (router.query.group) {
			return router.query.group === i.group
		} else {
			return router.query.type === i.label
		}
	})

	// Return a list of only the content directories from the config array
	const _articlesLocationsList = []
	_relatedCTConfigDataArray.map(i => {
		if (i.path && !_articlesLocationsList.includes(i.path)) {
			return _articlesLocationsList.push(i.path)
			// eg: [ "content/pages", "content/default-pages" ]
		}
	})

	// Map through the list of of 'paths' and GET all
	// files in each of those directories
	const _tempGetFilesDataArray = []
	async function _tempGetFilesData() {
		return Promise.all(
			// Loop through list of files in config directory
			_articlesLocationsList.map(async dir => {
				// GET the encoded data for each file
				const _fileData = await getRepoData(dir)
				return new Promise(resolve => {
					// Decode data + add data to the array
					resolve(_tempGetFilesDataArray.push(_fileData))
				})
			})
		).finally(() => {
			setContent(_tempGetFilesDataArray)
		})
	}

	return (
		<>
			<Header
				title={title}
				subtitle="All related articles are listed on this page"
			/>
			{/* <SimpleDebug
				label="_relatedCTConfigDataArray">
				{_relatedCTConfigDataArray}
			</SimpleDebug> */}

			<SimpleDebug
				label="_articlesLocationsList">
				{_articlesLocationsList}
			</SimpleDebug>


			<SimpleDebug
				label="Content (data)">
				{content}
			</SimpleDebug>

		</>
	)
}
