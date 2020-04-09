// - Just testing out the idea of using a page query and
// map the list of groups to just return the data for
// the specific group. I know there's a better way to
// do this but didn't have time to figure it out.
// - The page query is in the Menu component.
//   <Link href={`/group?group=${group.path}`}>
//   	<a className="pure-menu-link">{group.label}</a>
//   </Link>

// - From here, we could map out the content-types for the specific
// group and use a page query to return just those types?
// - Or it might be better to use the dynamic page [id].js like
// I was doing with 'pages/tv.jsx'?
//- -----------------------------------------------------------------

import { useRouter } from 'next/router'
import { Header, ArticleCreate, ArticlesList } from '../components'

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
		{
			label: `Contact Page`,
			name: `contact-page`,
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
		},{
			title: `About Us`,
			content_type: `Default Page`,
			status: `Draft`,
			date: `03/20/20`,
			path: `#`,
		},{
			title: `Contact`,
			content_type: `Contact Page`,
			status: `Published`,
			date: `03/22/20`,
			path: `#`,
		},
	],
}



export default function ArticlesPage({repoSettings, allContentTypes}) {
	const router = useRouter()

	// Just using this for testing
	let title
	let subtitle
	if (router.query.group) {
		title = router.query.group
		subtitle = `This is the ${router.query.group} group.`
	} else if (router.query.type) {
		title = router.query.type
		subtitle = `This is the ${router.query.type} content-type.`
	}

	return (
		<>
			<Header
				title={title}
				subtitle={subtitle}
			/>
			{/* This 'Add New' button would show a dropdown of all content
			types in the current group or if there's only one content-type,
			it wouldn't be a dropdown, just a button. */}
			<ArticleCreate data={demo} />

			{/* This list would be created from all available articles
			(md files) with the  current content-type, or if it's a group,
			it would list all articles for all content-types in the group */}
			<ArticlesList data={demo} />
		</>
	)
}
