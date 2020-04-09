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



export default function GroupsPage(props) {
	const router = useRouter()
	const { settings } = props

	return (
		<>
			{settings.groups.map(group => {
				if (group.label === router.query.group) {
					return (
						<React.Fragment key={group.label}>
							<Header
								title={group.label}
								subtitle={group.description}
							/>

							{group.content_types.map(type => {
								return (
									<p key={type.label}>{type.label}</p>
								)
							})}

							{/* Add new article button */}
							<ArticleCreate data={demo} />

							{/* List all articles in Group */}
							<ArticlesList data={demo} />

						</React.Fragment>
					)
				}
			})}

		</>
	)
}
