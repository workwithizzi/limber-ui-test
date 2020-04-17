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

	const _allArticlesRawData = []
	const _allArticlesDecodedData = []

	useEffect(() => {
		async function _fetchData() {
			// const _allArticles = await getRepoData(`/content`)

			const _allContentDirRaw = await getRepoData(`/content`)
			// console.log(_allContentDirRaw)
			const _getAllContentSubDirRaw = Promise.all(
				_allContentDirRaw.map(async file => {
					// GET the encoded data for each file and parse/decode it
					// const _decodedFileData = await getRepoData(`/content/${file.name}`)
					const _getData = await getRepoData(file.path)
					// console.log(_getData)
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

	// const cleaned = [].concat.apply([], _allArticlesData)
	// const flattened = _allArticlesData => [].concat(..._allArticlesData)
	// console.log(_allArticlesData.flat())
	// console.log(flatData)
	//- ------------------------------------

	// Get all the config data for ALL related CT's
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
		}
	})

	// Return a list of only the CT ids from the config array
	const _relatedCTid = []
	_relatedCTConfigDataArray.map(i => {
		if (i.id && !_relatedCTid.includes(i.id)) {
			return _relatedCTid.push(i.id)
		}
	})

	// const _allArticles = getRepoData(`/content`)
	// async function _getAllArticles() {
	// 	return Promise.all(
	// 		await getRepoData(`/content`)
	// 	)
	// }

	// console.log(_getAllArticles())

	// console.log(_relatedCTid)


	// function _getDirectoryFiles() {
	// 	return Promise.all(
	// 		_articlesLocationsList.map(async dir => {
	// 			return await getRepoData(dir)
	// 		})
	// 	)
	// }


	// Moved this directly into useEffect
	// async function _getArticles() {
	// 	return Promise.all(
	// 		await getRepoData(`/content/pages/home.md`)
	// 	)
	// }

	const _TESTsourceArray = [
		`red`,
		`green`,
		`blue`,
	]
	const _TESTtargetArray = [
		{
			"name": `item one`,
			"id": `one`,
			"color": `purple`,
		},
		{
			"name": `item two`,
			"id": `two`,
			"color": `red`,
		},
		{
			"name": `item three`,
			"id": `three`,
			"color": `blue`,
		},
	]
	// const _TEST1find = _TESTsourceArray.some(v => _TESTtargetArray.includes(v))

	const _TEST2find = _TESTtargetArray.filter(function(i){
		return `red` === i.color
	})


	function _TEST3find() {
		const _result = []
		_TESTsourceArray.map(type => {
			_TESTtargetArray.filter(function(i){
				return type === i.color
			})
		})
	}

	const _TESTresultArray = []
	_TESTsourceArray.map(i => {
		return _TESTresultArray.push(i.path)
	})

	function _TEST4find() {
		const _result = []
		// return _TESTsourceArray.map(type => type)
		return _TESTsourceArray.map(type => {
			return _TESTtargetArray.map(i => {
				// const match = type === i.color
				if (type === i.color && !_result.includes(i.name)) {
					// return i.name
					_result.push(i.name)
				}
				return _result
			})

		})
		// const _TEST4find = _TESTtargetArray.filter(function(i){
		// 	if (router.query.group) {
		// 		return router.query.group === i.group
		// 	} else {
		// 		return router.query.type === i.label
		// 	}
		// })
	}

	// console.log(_TEST4find())


	return (
		<>
			<Header
				title={title}
				subtitle="All related articles are listed on this page"
			/>

			{/* <SimpleDebug>{content}</SimpleDebug> */}

			{/* <SimpleDebug
				label="_TESTrelatedCTConfigDataArray">
				{_TESTrelatedCTConfigDataArray}
			</SimpleDebug> */}

			{/* <SimpleDebug
				label="_articlesLocationsList">
				{_articlesLocationsList}
			</SimpleDebug>

			<SimpleDebug
				label="_relatedCTConfigDataArray">
				{_relatedCTConfigDataArray}
			</SimpleDebug> */}


			<SimpleDebug
				label="Content (data)">
				{content}
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


//- ------------------------------------
//- ------------------------------------
// This 'Add New' button would show a dropdown of all content
// types in the current group or if there's only one content-type,
// it wouldn't be a dropdown, just a button.
// <ArticleCreate data={demo} />

// This list would be created from all available articles
// (md files) with the  current content-type, or if it's a group,
// it would list all articles for all content-types in the group
// <ArticlesList data={demo} />
