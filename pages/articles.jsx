// - List all articles related to queried group or content-type
//- -----------------------------------------------------------------

import { useRouter } from 'next/router'
import { Header, ArticleCreate, ArticlesList } from '../components'
import { SimpleDebug } from '../utils'

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
	let title

	//- ------------------------------------
	// Option 1: Returning all Data to the `_relatedTypesData` arrray
	let _relatedTypesData
	if (router.query.group) {
		title = router.query.group
		// Return array of all data for all related CT's
		_relatedTypesData = allContentTypes.filter(function(i){
			return router.query.group === i.group
		})
	}

	if (router.query.type) {
		title = router.query.type
		// Return array of all data for the CT
		_relatedTypesData = allContentTypes.filter(function(i){
			return router.query.type === i.label
		})
	}

	//- ------------------------------------

	// Option 2: Returning only the paths from related CT's to use
	// in GET request
	const _relatedTypesPaths = []
	let _GroupData
	if (router.query.group) {
		title = router.query.group
		// Return array of all data for all related CT's
		_GroupData = allContentTypes.filter(function(i){
			return router.query.group === i.group
		})
	}

	if (router.query.type) {
		title = router.query.type
		// Return array of all data for the CT
		_GroupData = allContentTypes.filter(function(i){
			return router.query.type === i.label
		})
	}

	// Return only a list of the content-paths from related CT's
	_GroupData.map(i => {
		if (i.path && !_relatedTypesPaths.includes(i.path)) {
			return _relatedTypesPaths.push(i.path)
		}
	})

	//- ------------------------------------

	return (
		<>
			<Header
				title={title}
				subtitle="All related articles are listed on this page"
			/>

			{/* This 'Add New' button would show a dropdown of all content
			types in the current group or if there's only one content-type,
			it wouldn't be a dropdown, just a button. */}
			<ArticleCreate data={demo} />

			{/* This list would be created from all available articles
			(md files) with the  current content-type, or if it's a group,
			it would list all articles for all content-types in the group */}
			<ArticlesList data={demo} />

			<SimpleDebug
				label="Option 1: Related Types Data">
				{_relatedTypesData}
			</SimpleDebug>

			<SimpleDebug
				label="Option 2: Related Types Paths">
				{_relatedTypesPaths}
			</SimpleDebug>

		</>
	)
}
