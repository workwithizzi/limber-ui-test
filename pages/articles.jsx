// Articles Page
// Presents a list of all articles (content/md) files related to the
// current content-type (CT) or group of CTs based on the URL query.
// User will be able to add/edit/delete based on the CT's config
//
// Queries:
//   group: looks for a matching `group` key in the CTs config files
//   type: looks for a matching `label` key in the CTs config files
//
// TODO: Fetch decoded data for each article in the CT/Group
// TODO: Use data in <ArticlesList>
// TODO: Use CT's in <ArticleCreate> for creating new articles

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Header, ArticleCreate, ArticlesList } from '../components'
import { SimpleDebug, getRepoData } from '../utils'

// Temp data for testing components: ArticleCreate & ArticlesList
// This can be removed once we are bringing in the real data
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


export default function ArticlesPage({ allContentTypes }) {
	const router = useRouter()
	const [content, setContent] = useState([])
	// Title used for <Header> title
	const title = router.query.group || router.query.type

	const _allArticlesRawData = []

	useEffect(() => {
		async function _fetchData() {

			// Just testing an idea of getting ALL articles and filtering
			// to show only the ones relate to the current page.

			const _allContentDirRaw = await getRepoData(`/content`)
			// console.log(_allContentDirRaw)
			const _getAllContentSubDirRaw = Promise.all(
				_allContentDirRaw.map(async file => {
					// GET the encoded data for each file and parse/decode it
					// const _decodedFileData = await getRepoData(`/content/${file.name}`)
					const _getData = await getRepoData(file.path)
					return new Promise(resolve => {
						// Add decoded data to array
						resolve(_allArticlesRawData.push(_getData))
					})
				})
			)
			// awaiting for allContentTypesData array to be finished
			await _getAllContentSubDirRaw
			const _flattenRawData = _allArticlesRawData.flat()

			setContent(_flattenRawData)

		}
		_fetchData()
	}, [router.query])

	//- ------------------------------------

	// Returns array of all decoded config data for ALL related CT's
	const _relatedCTConfigDataArray = allContentTypes.filter(function(i){
		if (router.query.group) {
			return router.query.group === i.group
		} else {
			return router.query.type === i.label
		}
		// eg: {label: "Posts", id: "posts", path: "content/posts", ...}
	})

	// Returns a list of only the content directories ('path') from the config array
	const _articlesLocationsList = []
	_relatedCTConfigDataArray.map(i => {
		if (i.path && !_articlesLocationsList.includes(i.path)) {
			return _articlesLocationsList.push(i.path)
			// eg: ["content/posts"]
		}
	})

	return (
		<>
			<Header
				title={title}
				subtitle="All related articles are listed on this page"
			/>

			{/* This creates an 'Add New' button/dropdown. It would show a dropdown of all CTs
			in the current group and take the user to a page for adding a new article (using editor.jsx page).
			If there's only one content-type, it wouldn't be a dropdown, just a button. */}
			<ArticleCreate data={demo} />

			{/* This creates a list from ALL articles in the current CT, or if it's a group,
			it would list ALL articles for ALL CTs in the Group */}
			<ArticlesList data={demo} />


			<SimpleDebug
				label="_articlesLocationsList">
				{_articlesLocationsList}
			</SimpleDebug>

			<SimpleDebug
				label="_relatedCTConfigDataArray">
				{_relatedCTConfigDataArray}
			</SimpleDebug>

		</>
	)
}



//- ------------------------------------
//- ------------------------------------
// Return array of all data for all content-types in the current group

// Option 1: Returning all Data to the `_relatedTypesData` arrray
// let _relatedTypesData
// if (router.query.group) {
// 	title = router.query.group
// 	// Return array of all data for all related CT's
// 	_relatedTypesData = allContentTypes.filter(function(i){
// 		return router.query.group === i.group
// 	})
// }

// if (router.query.type) {
// 	title = router.query.type
// 	// Return array of all data for the CT
// 	_relatedTypesData = allContentTypes.filter(function(i){
// 		return router.query.type === i.label
// 	})
// }

// In the return of the component:
// <SimpleDebug
// 			label="Option 1: Related Types Data">
// 			{_relatedTypesData}
// 		</SimpleDebug>
