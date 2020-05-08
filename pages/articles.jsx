// Articles Page
// Presents a list of all articles (content/md) files related to the
// current content-type (CT) or group of CTs based on the URL query.
// User will be able to add/edit/delete based on the CT's config
//
// Queries:
//   group: looks for a matching `group` key in the CTs config files
//   type: looks for a matching `label` key in the CTs config files
//


import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as matter from 'gray-matter'
import axios from 'axios'
import PT from 'prop-types'

import { Header, Debug, ArticleCreate, ArticlesList } from '../components'
import { getRepoData, ContentTypes as CT } from '../utils'


export default function ArticlesPage({ allContentTypes, allContentTypesErrors }) {

	// Cancel Axios request
	// Generate the Token, which will be used in case of the component being unmounted with the pending request.
	const signal = axios.CancelToken.source()

	const router = useRouter()
	const [markdownContent, setMarkdownContent] = useState([])

	useEffect(() => {
		// this is to make sure that we are able operate on the `allContentTypes` as it is also being fetched at the component mount time
		if (allContentTypes.length > 1) {
			_fetchMarkdownFiles(allContentTypes, signal)
		}
		return () => {
			signal.cancel(`API call in the "articles.jsx" is being cancelled`)
		}
	}, [router.query])

	//- ------------------------------------

	// TODO: fix the below NOTE
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


	// Returns a list of only the content directories ('path') from the config array
	const _articlesLocationsList = new CT(_relatedCTConfigDataArray).getPaths()


	// Fetch all the files from the directories mentioned in `_articlesLocationsList`
	async function listMarkdownFiles(data, keepEncoded, signal) {
		return await Promise.all(
			data.map(async item => {
				return await await getRepoData(`/${item}`, keepEncoded, signal)
			})
		)
	}

	// Get the content from the md file
	async function getMarkdownFileContent(data, keepEncoded, signal) {
		return await Promise.all(
			data.map(async item => {
				return await await getRepoData(`/${item.path}`, keepEncoded, signal)
			})
		)
	}


	async function _fetchMarkdownFiles(allContentTypes, signal) {
		// Returns array of all decoded config data for ALL related CT's
		const _relatedCTConfigDataArray = allContentTypes.filter(function(i){
			if (router.query.group) {
				return router.query.group === i.group
			} else {
				return router.query.type === i.label
			}
		// eg: {label: "Posts", id: "posts", path: "content/posts", ...}
		})

		// Take _relatedCTConfigDataArray as a reference for the CT md files
		// Check the returned md files and display only those which content_type matches to the id
		// Get the CTs IDs to check for
		const _idFromCTsConfigData = _relatedCTConfigDataArray.map(ct => ct.id)

		// Returns a list of only the content directories ('path') from the config array
		const _articlesLocationsList = new CT(_relatedCTConfigDataArray).getPaths()

		// fetch all the files from the directories mentioned in `_articlesLocationsList`
		listMarkdownFiles(_articlesLocationsList, false, signal)
			.then(markdownFilesList => {
				// flattern the output with the list of md files from the directory
				const markdownFilesListFormatted = markdownFilesList.flat()

				// Get the content from the md file
				getMarkdownFileContent(markdownFilesListFormatted, false, signal)
					.then(markdownFilesContent => {
						// format md file content into the object
						const formattedMarkdownFilesContent = markdownFilesContent.map(content =>
							content && matter(content)
						)

						// ADD `path` property to the markdown content `articleContents`
						formattedMarkdownFilesContent.forEach((item, index) => {
							item.path = markdownFilesListFormatted[index].path
						})

						// ADD `name` property inside the `data` object
						formattedMarkdownFilesContent.forEach((item, index) => {
							// Delete the extension
							let fileName = markdownFilesListFormatted[index].name.split(`.`)
							// Delete the last item in an array (extension)
							fileName.pop()
							// Concatenate all the rest items in an array
							fileName = fileName.join()
							// Create a `name` property at the `data`
							item.data.name = fileName
						})

						// Check if the `id` from the ContentType yaml file matches the `content_type` in the md file
						const articleContents = []
						_idFromCTsConfigData.forEach(id => {
							formattedMarkdownFilesContent.forEach(markdownContent => {
								if (id === markdownContent.data.content_type) {
									articleContents.push(markdownContent)
								}
							})
						})

						setMarkdownContent(articleContents)
					})
					.catch(error => {
						console.log(error)
					})
			})
			.catch(error => {
				console.log(error)
			})
	}


	// Render errors for the user if the CT has missing REQUIRED fields
	function _renderContentTypesErrors(contentTypesErrors) {
		// TODO: create understandable error message `pop-up` based on the `allContentTypesErrors` for the user
		return (
			<div>
				<p>There are the following errors:</p> 
				<ul>
					{contentTypesErrors.map(error => {
						if (router.query.group === error.menu_item || router.query.type === error.menu_item) {
							return (
								<li key={Math.floor(Math.random() * Math.floor(2000))}>{JSON.stringify(error)}</li>
							)
						}
					})}
				</ul>
			</div>
		)
	}


	return (
		<>
			<Header
				title={router.query.group || router.query.type}
				subtitle="All related articles are listed on this page"
			/>
			<div>

				{/* Render errors */}
				{
					allContentTypesErrors.length > 0 && _renderContentTypesErrors(allContentTypesErrors)
				}

				{/* This creates an 'Add New' button/dropdown. It would show a dropdown of all CTs
								in the current group and take the user to a page for adding a new article (using editor.jsx page).
								If there's only one content-type, it wouldn't be a dropdown, just a button. */}
				{allContentTypes && <ArticleCreate data={allContentTypes} />}

				{/* This creates a list from ALL articles in the current CT, or if it's a group,
								it would list ALL articles for ALL CTs in the Group */}
				<ArticlesList data={markdownContent} />


				<Debug info="_articlesLocationsList">
					{_articlesLocationsList}
				</Debug>

				<Debug info="_relatedCTConfigDataArray">
					{_relatedCTConfigDataArray}
				</Debug>

			</div>


		</>
	)
}

ArticlesPage.propTypes = {
	allContentTypes: PT.arrayOf(PT.object).isRequired,
	allContentTypesErrors: PT.arrayOf(PT.arrayOf(PT.object)),
}
