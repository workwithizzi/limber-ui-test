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


import { useRouter } from 'next/router'

import { Layout } from '../components'

// Temp data for testing
import data from "../db/limber.json"


export default function TypesPage() {
	const router = useRouter()

	return (
		<>
			{data.groups.map(page => {
				if (page.path === router.query.group) {
					return (
						<Layout
							key={page.path}
							title={page.label}
							subtitle="groups query page"
						>
							{page.description && <p>{page.description}</p>}
						</Layout>
					)
				}})}

		</>
	)
}
