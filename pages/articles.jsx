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

// NOTE-YG: if I WRITE STUFF uppercased, those are the things, I would like to empasize on, I am not yelling. haha :)

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as matter from 'gray-matter'
import axios from "axios"

import { Header, ArticleCreate, ArticlesList } from '../components'
import { SimpleDebug, getRepoData, ContentTypes as CT } from '../utils'

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
	const [markdownContent, setMarkdownContent] = useState([])
	// Title used for <Header> title
	const title = router.query.group || router.query.type

	// CURRENTLY this `useEffect` HAS NO effect to the `articles.jsx` component, as we DO NOT USE the `content` state
	useEffect(() => {
		const abortController = new AbortController()
		// _fetchContentFolder()
		_fetchMarkdownFiles()
		return () => {
			abortController.abort(`Api is being canceled`)
		}
	}, [router.query])

	//- ------------------------------------

	async function _fetchContentFolder() {

		// Just testing an idea of getting ALL articles and filtering
		// to show only the ones relate to the current page.

		const _allContentDirRaw = await getRepoData(`/content`)

		const _getAllContentSubDirRaw = Promise.all(
			// `map` method RETURNS an array, based on the RESOLVED values
			_allContentDirRaw.map(async file => {
				// GET the encoded data for each file and parse/decode it
				// const _decodedFileData = await getRepoData(`/content/${file.name}`)
				const _getData = await getRepoData(file.path)
				return new Promise(resolve => {
					// Add decoded data to array

					// PASS the resolved value of `_getData` to the `map`, and `map` will return a NEW array FILLED with the `_getData`
					resolve(_getData)
				})
			})
		)

		// AWAITING for _getAllContentSubDirRaw to be finished, e.g. await for the `map` method to return an array
		// Assigning the RETURN from a `map` method to a `_allArticlesRawData` varable.
		const _allArticlesRawData = await _getAllContentSubDirRaw

		// Flattern the resultant data as well
		const _flattenRawData = _allArticlesRawData.flat()

		setContent(_flattenRawData)
	}

	// NOTE that the _relatedCTConfigDataArray and _articlesLocationsList are executed 2 times if they are not placed into the `useEffect`

	// Returns array of all decoded config data for ALL related CT's
	const _relatedCTConfigDataArray = allContentTypes.filter(function(i){
		if (router.query.group) {
			return router.query.group === i.group
		} else {
			return router.query.type === i.label
		}
		// eg: {label: "Posts", id: "posts", path: "content/posts", ...}
	})

	/*
	// Returns a list of only the content directories ('path') from the config array
	const _articlesLocationsList = []
	// CHANGED `map` to `forEach`, as `forEach` doesn't return anything after the execution.
	_relatedCTConfigDataArray.forEach(i => {
		if (i.path && !_articlesLocationsList.includes(i.path)) {
			return _articlesLocationsList.push(i.path)
			// eg: ["content/posts"]
		}
	})
	*/
	// Replaced above code with the class ContentTypes and getPaths method
	// Returns a list of only the content directories ('path') from the config array
	const _articlesLocationsList = new CT(_relatedCTConfigDataArray).getPaths()


	async function _fetchMarkdownFiles() {
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
		const _articlesLocationsList = new CT(_relatedCTConfigDataArray).getPaths()
		// fetch all the files from the directories mentioned in `_articlesLocationsList`
		const markdownFilesList = await Promise.all(
			_articlesLocationsList.map(async item => {
				return await await getRepoData(`/${item}`)
			})
		)
		// flattern the output with the list of md files from the directory
		const markdownFilesListFormatted = markdownFilesList.flat()

		// Get the content from the md file
		const markdownFilesContent = await Promise.all(
			markdownFilesListFormatted.map(async item => {
				return await await getRepoData(`/${item.path}`)
			})
		)
		// format md file content into the object
		const formattedMarkdownFilesContent = markdownFilesContent.map(content => 
			matter(content)
		)
		console.log(formattedMarkdownFilesContent)
		setMarkdownContent(formattedMarkdownFilesContent)
	}

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
