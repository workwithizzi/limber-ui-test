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
import { Layout, ArticleCreate, ArticlesList } from '../components'

// Temp data for testing
import settings from '../db/limber.yaml'
import demo from '../db/demo/pages.yaml'


export default function GroupsPage() {
	const router = useRouter()

	return (
		<>
			{settings.groups.map(page => {
				if (page.label === router.query.group) {
					return (
						<Layout
							key={page.label}
							title={page.label}
							subtitle={page.description}
						>
							{/* Add new article button */}
							<ArticleCreate data={demo} />

							{/* List all articles in Group */}
							<ArticlesList data={demo} />

						</Layout>
					)
				}})}

		</>
	)
}
